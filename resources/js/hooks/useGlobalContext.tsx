import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextType {
    loading: boolean;
    setLoading: (arg: boolean) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <GlobalContext.Provider
            value={{ loading, setLoading, sidebarOpen, setSidebarOpen }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalContextProvider"
        );
    }
    return context;
};
