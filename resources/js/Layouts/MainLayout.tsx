import { GlobalContextProvider } from "@/hooks/useGlobalContext";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <GlobalContextProvider>
            <div className="main-layout">
                <ToastContainer autoClose={3100} />
                {children}
            </div>
        </GlobalContextProvider>
    );
};

export default MainLayout;
