import React, { ReactNode, useState } from "react";
import Header from "../Components/Header/index";
import Sidebar from "../Components/Sidebar/index";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-slate-800 dark:text-slate-300">
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main>
                        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
                            {/* {children} */}
                            children
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
