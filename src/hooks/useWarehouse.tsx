import {createContext, FC, useContext, useState} from 'react';
import {CreateLocationMakeReq, EditLocationReq, Location} from "../type/Warehouse";
import axios from "axios";
import {BarcodeRes, CreateItemReq, ExpireDateRes, Item, UpdateItemReq} from "../type/item";
import {User} from "../type/auth";

type UpdateItemReq = {
    name: string;
    expireDate: string;
    locationId: number;
    alarmEnabled: boolean;
}

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<Location>;
    getLocations: () => Promise<Location[]>;
    getLocation: (id: Location["id"]) => Promise<Location>;
    updateLocation: (id: Location["id"], req: EditLocationReq) => Promise<Location[]>;
    deleteLocation: (id: Location["id"]) => Promise<void>;

    shotBarcode: (file: FormData) => Promise<BarcodeRes>;
    createItem: (req: CreateItemReq) => Promise<void>;
    shotExpire: (file: FormData) => Promise<ExpireDateRes>;
    getItems: () => Promise<Item[]>
    getItem: (id: Item["id"]) => Promise<Item>;
    updateItem : (id: Item["id"], req: UpdateItemReq) => Promise<void>;
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
            const formData = new FormData();
            formData.append("name", req.name);
            formData.append("description", req.description);
            formData.append("image", req.image);

            const res = await axios.post(
                "/api/box/locations",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.status !== 200) {
                console.log(res);
                throw new Error(res.statusText);
            }

            return res.data;
        } catch (error) {
            console.error("Error creating location:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

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

    const getLocation = async (id: Location["id"]) => {
        setIsLoading(true)
        try {
            const locations = await getLocations();
            const foundLocation = locations.find(loc => loc.id == id);
            return foundLocation
        } catch (error) {
            console.error("Error fetching location:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const updateLocation = async (id: Location["id"], req: EditLocationReq) => {
        setIsLoading(true);
        try {
            const res = await axios.patch(
                `/api/box/locations/${id}`,
                req,
                {withCredentials: true}
            );
            if (res.status !== 200) {
                console.log(res)
                throw new Error(res.statusText);
            }
            return res.data;
        } catch (error) {
            console.error("Error updating location:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const deleteLocation = async (id: Location["id"]) => {
        setIsLoading(true);
        try {
            const res = await axios.delete(
                `/api/box/locations/${id}`,
                {withCredentials: true}
            );
            if (res.status !== 204) {
                console.log(res)
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.error("Error deleting location:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const shotBarcode = async (file: FormData): Promise<BarcodeRes> => {
        for (const [k, v] of file.entries()) {
            console.log(k, v); // file File {name: "...", size: ...}
        }
        setIsLoading(true);
        try {
            const res = await axios.post(
                '/api/box/items/shot-barcode',
                file,
                {withCredentials: true}
            );
            return res.data
        } catch (error) {
            console.error('업로드 실패:', error);
            throw error;
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

    const updateItem = async (id: Item["id"], req: UpdateItemReq) => {
        setIsLoading(true);
        try {
            const res = await axios.patch(
                `/api/box/items/${id}`,
                req,
                {withCredentials: true}
            );
            if (res.status !== 200) {
                console.log(res)
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.error("Error updating item:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    const getItem = async (id: Item["id"]): Promise<Item> => {
        setIsLoading(true);
        try {
            const items = await getItems();
            const foundItem = items.find(item => item.id === id);
            if(!foundItem) {
                throw new Error("Item not found");
            }
            return foundItem
        } catch (error) {
            console.error("Error fetching item:", error);
            throw error; // Re-throw the error for further handling
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WarehouseContext.Provider value={{
            isLoading,
            createLocation,
            getLocations,
            getLocation,
            updateLocation,
            deleteLocation,

            shotBarcode,
            createItem,
            shotExpire,
            getItems,
            getItem,
            updateItem
        }}>
            {children}
        </WarehouseContext.Provider>
    )
}