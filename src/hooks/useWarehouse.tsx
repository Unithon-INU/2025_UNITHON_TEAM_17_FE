import {createContext, useContext, useState} from 'react';
import {CreateLocationMakeReq, Location} from "../type/Warehouse";
import axios from "axios";

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<Location>;
    getLocations: () => Promise<Location[]>;
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
                { withCredentials: true }
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
                { withCredentials: true }
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

    return (
        <WarehouseContext.Provider value={{isLoading, createLocation, getLocations}}>
            {children}
        </WarehouseContext.Provider>
    )
}