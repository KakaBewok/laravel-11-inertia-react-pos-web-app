import React, { ReactNode } from "react";

interface CardDataStatsProps {
    title: string;
    total: string;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
    title,
    total,
    children,
}) => {
    return (
        <div className="py-6 bg-white border rounded-sm shadow-md px-7 dark:shadow-slate-800 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-center rounded-full h-11 w-11 bg-slate-100 dark:bg-slate-800">
                {children}
            </div>

            <div className="flex items-end mt-4">
                <div>
                    <h4 className="text-2xl font-bold text-black dark:text-white">
                        {total}
                    </h4>
                    <span className="text-sm font-medium text-slate-500">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardDataStats;
