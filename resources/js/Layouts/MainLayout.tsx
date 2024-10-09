import { GlobalContextProvider } from "@/hooks/useGlobalContext";
import React, { ReactNode } from "react"; // Adjust the import path accordingly

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <GlobalContextProvider>
            <div className="main-layout">{children}</div>
        </GlobalContextProvider>
    );
};

export default MainLayout;
