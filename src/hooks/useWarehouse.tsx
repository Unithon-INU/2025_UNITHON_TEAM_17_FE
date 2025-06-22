import {createContext, useContext, useState} from 'react';
import {CreateLocationMakeReq, Location} from "../type/Warehouse";
import axios from "axios";
import {User} from "../type/auth";

export type CreateItemReq = {
    memberId: User["id"];
    locationId: Location["id"];
    name: string;
    imageUrl: string;
    registerDate: string;
    expireDate: string;
    alarmEnabled: boolean;
}

export type BarcodeRes = {
    productName: string;
    imageUrl: string;
    sessionId: string;
}

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<Location>;
    getLocations: () => Promise<Location[]>;
    shotBarcode: (file: FormData) => Promise<BarcodeRes>;
    createItem: (req: CreateItemReq) => Promise<void>;
    shotExpire: (file: File, sessionId: string) => Promise<any>;
}

const WarehouseContext = createContext<WarehouseContextProps | undefined>(undefined);

export const useWarehouse = (): WarehouseContextProps => {
    const context = useContext(WarehouseContext);

    if (!context) {
        throw new Error("useWarehouse must be used within an WarehouseProvider");
    }

    return context
}

export const WarehouseProvider: React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);

    const createLocation = async (req: CreateLocationMakeReq): Promise<Location> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `/api/box/locations`,
                req,
                {withCredentials: true}
            );
            if (res.status !== 201) {
                console.log(res)
                throw new Error(res.statusText);
            }

            return res.data;
        } catch (error) {
            console.error("Error creating location:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const getLocations = async (): Promise<Location[]> => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `/api/box/locations`,
                {withCredentials: true}
            );
            if (res.status !== 200) {
                console.log(res)
                throw new Error(res.statusText);
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching locations:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const shotBarcode = async (file: FormData): Promise<BarcodeRes> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                '/api/box/items/shot-barcode',
                file,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            const {sessionId} = res.data;

            return {...res.data, sessionId}
        } catch (error) {
            console.error('업로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const shotExpire = async (file: File, sessionId: string): Promise<any> => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('imageFile', file);
            formData.append('sessionId', sessionId);

            const res = await axios.post(
                '/api/box/items/shot-expire',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );

            return res.data;
        } catch (error) {
            console.error('만료일자 추론 실패:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const createItem = async (req: CreateItemReq): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `/api/box/items`,
                req,
                {withCredentials: true}
            );
            if (res.status !== 201) {
                console.log(res)
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WarehouseContext.Provider value={{isLoading, createLocation, getLocations, shotBarcode, createItem, shotExpire}}>
            {children}
        </WarehouseContext.Provider>
    )
}