import {createContext, useContext, useState} from 'react';
import {Warehouse} from "../type/Warehouse";
import axios from "axios";

interface WarehouseContextProps {
    isLoading: boolean;
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

    const createLocation = async (name: string): Promise<Warehouse> => {
        setIsLoading(true);
        try {
            const res = await axios.post(`/api/warehouse`, {name})
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WarehouseProvider.Provider value={{isLoading}}>
            {children}
        </WarehouseProvider.Provider>
    )
}