import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import CardDataStats from "./components/CardDataStats";
import ChartOne from "./components/Charts/ChartOne";
import ChartTwo from "./components/Charts/ChartTwo";

interface StatisticPageProps {
    daysInMonth: number[];
    omzetPerDaysInMonth: number[];
    omzetPerDaysInWeek: number[];
    totalOmzetPerMonth: number;
    totalExpensePerMonth: number;
    totalOrderPerMonth: number;
    totalItemPerMonth: number;
}

const StatisticPage: React.FC<StatisticPageProps> = ({
    daysInMonth,
    omzetPerDaysInMonth,
    omzetPerDaysInWeek,
    totalOmzetPerMonth,
    totalExpensePerMonth,
    totalOrderPerMonth,
    totalItemPerMonth,
}) => {
    const monthYear = new Date().toLocaleString("default", {
        year: "numeric",
        month: "long",
    });

    const nominalFormater = (nominal: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(nominal);
    };

    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Dashboard" />
                <div className="px-5 py-3 mb-6 bg-white border rounded-sm shadow-md dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800">
                    <h1 className="text-xl font-bold">
                        Reports for {monthYear}
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardDataStats
                        title="Total omzet"
                        total={nominalFormater(totalOmzetPerMonth)}
                    >
                        <svg
                            className="fill-teal-600 dark:fill-white"
                            width="19"
                            height="19"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            id="bill"
                        >
                            <path d="M9.5,10.5H12a1,1,0,0,0,0-2H11V8A1,1,0,0,0,9,8v.55a2.5,2.5,0,0,0,.5,4.95h1a.5.5,0,0,1,0,1H8a1,1,0,0,0,0,2H9V17a1,1,0,0,0,2,0v-.55a2.5,2.5,0,0,0-.5-4.95h-1a.5.5,0,0,1,0-1ZM21,12H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Z"></path>
                        </svg>
                    </CardDataStats>
                    <CardDataStats
                        title="Total Expense"
                        total={nominalFormater(totalExpensePerMonth)}
                    >
                        <svg
                            className="fill-teal-600 dark:fill-white"
                            width="19"
                            height="19"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            id="money-withdrawal"
                        >
                            <path d="M22,2H2A1,1,0,0,0,1,3v8a1,1,0,0,0,1,1H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V12h3a1,1,0,0,0,1-1V3A1,1,0,0,0,22,2ZM7,20V18a2,2,0,0,1,2,2Zm10,0H15a2,2,0,0,1,2-2Zm0-4a4,4,0,0,0-4,4H11a4,4,0,0,0-4-4V8H17Zm4-6H19V7a1,1,0,0,0-1-1H6A1,1,0,0,0,5,7v3H3V4H21Zm-9,5a3,3,0,1,0-3-3A3,3,0,0,0,12,15Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,12,11Z"></path>
                        </svg>
                    </CardDataStats>
                    <CardDataStats
                        title="Total Order"
                        total={totalOrderPerMonth.toLocaleString()}
                    >
                        <svg
                            className="fill-teal-600 dark:fill-white"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                                fill=""
                            />
                            <path
                                d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                                fill=""
                            />
                        </svg>
                    </CardDataStats>
                    <CardDataStats
                        title="Total Item"
                        total={totalItemPerMonth.toLocaleString()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-teal-600 dark:fill-white"
                            width="22"
                            height="22"
                            viewBox="0 0 22 23"
                            id="package"
                        >
                            <path d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM10,4h4V7.13l-1.45-1a1,1,0,0,0-1.1,0L10,7.13ZM20,19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H8V9a1,1,0,0,0,.53.88,1,1,0,0,0,1-.05L12,8.2l2.45,1.63A1,1,0,0,0,16,9V4h3a1,1,0,0,1,1,1Z"></path>
                        </svg>
                    </CardDataStats>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
                    <ChartOne
                        daysInMonth={daysInMonth}
                        omzetPerDaysInMonth={omzetPerDaysInMonth}
                    />
                    <ChartTwo omzetPerDaysInWeek={omzetPerDaysInWeek} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default StatisticPage;
