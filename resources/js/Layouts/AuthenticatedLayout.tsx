import Loading from "@/Components/Loading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import React, { ReactNode } from "react";
import Header from "../Components/Header/index";
import Sidebar from "../Components/Sidebar/index";

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { loading } = useGlobalContext();

    return (
        <div
            className="text-slate-800 bg-gradient-to-tl from-blue-200 via-purple-100 to-green-100
         dark:text-slate-300 dark:bg-gradient-to-tl dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
        >
            {loading && <Loading />}
            <div className="flex h-screen overflow-hidden">
                <Sidebar />

                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                    <Header />
                    <main>
                        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;
