import {createContext, useContext, useState} from 'react';
import {Warehouse} from "../type/Warehouse";
import axios from "axios";
import {User} from "../type/auth";

export type CreateLocationMakeReq = {
    name: string
}

export type CreateLocationMakeRes = {
    id: number;
    name: string;
    memberId: User["id"];
}

interface WarehouseContextProps {
    isLoading: boolean;
    createLocation: (req: CreateLocationMakeReq) => Promise<CreateLocationMakeRes>;
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

    const createLocation = async (req: CreateLocationMakeReq): Promise<CreateLocationMakeRes> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `/aapi/box/locations`,
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

    return (
        <WarehouseContext.Provider value={{isLoading, createLocation}}>
            {children}
        </WarehouseContext.Provider>
    )
}