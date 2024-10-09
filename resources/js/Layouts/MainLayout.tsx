import { GlobalContextProvider } from "@/hooks/useGlobalContext";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <GlobalContextProvider>
            <div className="main-layout">
                <div className="py-2">
                    <Toaster />
                </div>
                {children}
            </div>
        </GlobalContextProvider>
    );
};

export default MainLayout;
