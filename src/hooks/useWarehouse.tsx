import {createContext, useContext, useState} from 'react';
import {CreateLocationMakeReq, Location} from "../type/Warehouse";
import axios from "axios";
import {User} from "../type/auth";

// type CreateItemReq = {
//     memberId : User["id"];
//     locationId : Location["id"];
//     name: string;
//     imageUrl: string;
//     registerDate: string; // ISO date string
//     expireDate: string; // ISO date string
//     alarmEnabled: boolean;
// }

type BarcodeRes = {
    productName: string;
    imageUrl: string;
}

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<Location>;
    getLocations: () => Promise<Location[]>;
    shotBarcode: (file: FormData) => Promise<BarcodeRes>;
    // createItem: (req : CreateItemReq) => Promise<void>;
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

            return res.data
        } catch (error) {
            console.error('업로드 실패:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
// const createItem = async (req: CreateItemReq): Promise<void> => {
//     setIsLoading(true);
//     try {
//         const res = await axios.post(
//             `/api/box/items`,
//             req,
//             { withCredentials: true }
//         );
//         if (res.status !== 201) {
//             console.log(res)
//             throw new Error(res.statusText);
//         }
//     } catch (error) {
//         console.error("Error creating item:", error);
//         throw error; // Re-throw the error for further handling
//     } finally {
//         setIsLoading(false);
//     }
// }

return (
    <WarehouseContext.Provider value={{isLoading, createLocation, getLocations, shotBarcode}}>
        {children}
    </WarehouseContext.Provider>
)
}