import React, { ReactNode } from "react";

interface CardDataStatsProps {
    title: string;
    total: string;
    rate: string;
    levelUp?: boolean;
    levelDown?: boolean;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
    title,
    total,
    rate,
    levelUp,
    levelDown,
    children,
}) => {
    return (
        <div className="py-6 bg-white border rounded-sm shadow-md px-7 dark:shadow-slate-800 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-center rounded-full h-11 w-11 bg-slate-100 dark:bg-slate-800">
                {children}
            </div>

            <div className="flex items-end justify-between mt-4">
                <div>
                    <h4 className="text-2xl font-bold text-black dark:text-white">
                        {total}
                    </h4>
                    <span className="text-sm font-medium text-slate-500">
                        {title}
                    </span>
                </div>

                <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                        levelUp && "text-green-500"
                    } ${levelDown && "text-red-500"} `}
                >
                    {rate}

                    {levelUp && (
                        <svg
                            className="fill-current"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                                fill=""
                            />
                        </svg>
                    )}
                    {levelDown && (
                        <svg
                            className="fill-current"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                                fill=""
                            />
                        </svg>
                    )}
                </span>
            </div>
        </div>
    );
};

export default CardDataStats;
