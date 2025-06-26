import {createContext, FC, useContext, useState} from 'react';
import {CreateLocationMakeReq, Location} from "../type/Warehouse";
import axios from "axios";
import {BarcodeRes, CreateItemReq, ExpireDateRes, Item} from "../type/item";

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<Location>;
    getLocations: () => Promise<Location[]>;
    shotBarcode: (file: FormData) => Promise<BarcodeRes>;
    createItem: (req: CreateItemReq) => Promise<void>;
    shotExpire: (file: FormData) => Promise<ExpireDateRes>;
    getItems: () => Promise<Item[]>
}

const WarehouseContext = createContext<WarehouseContextProps | undefined>(undefined);

export const useWarehouse = (): WarehouseContextProps => {
    const context = useContext(WarehouseContext);

    if (!context) {
        throw new Error("useWarehouse must be used within an WarehouseProvider");
    }

    return context
}

export const WarehouseProvider: FC = ({children}) => {
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
            return res.data
        } catch (error) {
            console.error('업로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const shotExpire = async (file: FormData): Promise<ExpireDateRes> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                '/api/box/items/shot-expire',
                file,
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
            if (res.status !== 200) {
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

    const getItems = async (): Promise<Item[]> => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `/api/box/items`,
                {withCredentials: true}
            );
            if (res.status !== 200) {
                console.log(res)
                throw new Error(res.statusText);
            }
            return res.data;
        } catch (error) {
            console.error("Error fetching items:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <WarehouseContext.Provider value={{isLoading, createLocation, getLocations, shotBarcode, createItem, shotExpire, getItems}}>
            {children}
        </WarehouseContext.Provider>
    )
}