// import { ApexOptions } from "apexcharts";
// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const options: ApexOptions = {
//     legend: {
//         show: false,
//         position: "top",
//         horizontalAlign: "left",
//     },
//     colors: ["#3C50E0", "#80CAEE"],
//     chart: {
//         fontFamily: "Satoshi, sans-serif",
//         height: 335,
//         type: "area",
//         dropShadow: {
//             enabled: true,
//             color: "#623CEA14",
//             top: 10,
//             blur: 4,
//             left: 0,
//             opacity: 0.1,
//         },

//         toolbar: {
//             show: false,
//         },
//     },
//     responsive: [
//         {
//             breakpoint: 1024,
//             options: {
//                 chart: {
//                     height: 300,
//                 },
//             },
//         },
//         {
//             breakpoint: 1366,
//             options: {
//                 chart: {
//                     height: 350,
//                 },
//             },
//         },
//     ],
//     stroke: {
//         width: [2, 2],
//         curve: "straight",
//     },
//     // labels: {
//     //   show: false,
//     //   position: "top",
//     // },
//     grid: {
//         xaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//         yaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//     },
//     dataLabels: {
//         enabled: false,
//     },
//     markers: {
//         size: 4,
//         colors: "#fff",
//         strokeColors: ["#3056D3", "#80CAEE"],
//         strokeWidth: 3,
//         strokeOpacity: 0.9,
//         strokeDashArray: 0,
//         fillOpacity: 1,
//         discrete: [],
//         hover: {
//             size: undefined,
//             sizeOffset: 5,
//         },
//     },
//     xaxis: {
//         type: "category",
//         categories: [
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//         ],
//         axisBorder: {
//             show: false,
//         },
//         axisTicks: {
//             show: false,
//         },
//     },
//     yaxis: {
//         title: {
//             style: {
//                 fontSize: "0px",
//             },
//         },
//         min: 0,
//         max: 100,
//     },
// };

// interface ChartOneState {
//     series: {
//         name: string;
//         data: number[];
//     }[];
// }

// const ChartOne: React.FC = () => {
//     const [state, setState] = useState<ChartOneState>({
//         series: [
//             {
//                 name: "Product One",
//                 data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
//             },

//             {
//                 name: "Product Two",
//                 data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
//             },
//         ],
//     });

//     const handleReset = () => {
//         setState((prevState) => ({
//             ...prevState,
//         }));
//     };
//     handleReset;

//     return (
//         <div className="col-span-12 px-5 pb-5 bg-white border rounded-sm shadow-md pt-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 sm:px-7 xl:col-span-8">
//             <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
//                 <div className="flex flex-wrap w-full gap-3 sm:gap-5">
//                     <div className="flex min-w-48">
//                         <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border border-teal-500 rounded-full max-w-4">
//                             <span className="block w-full h-2 bg-teal-500 rounded-full max-w-2"></span>
//                         </span>
//                         <div className="w-full">
//                             <p className="font-semibold text-teal-500">Omzet</p>
//                             <p className="text-sm font-medium">
//                                 12.04.2022 - 12.05.2022
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex justify-end w-full max-w-45">
//                     <div className="inline-flex items-center p-2 bg-teal-100 rounded-md dark:bg-slate-200">
//                         <button className="px-3 py-1 text-xs font-medium text-black bg-white rounded shadow-slate-300 hover:bg-white hover:shadow-slate-300 dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
//                             Day
//                         </button>
//                         <button className="px-3 py-1 text-xs font-medium text-black rounded hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
//                             Week
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <div id="chartOne" className="-ml-5">
//                     <ReactApexChart
//                         options={options}
//                         series={state.series}
//                         type="area"
//                         height={350}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChartOne;

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },
        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: "straight",
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        borderColor: true ? "#1e293b" : "#e2e8f0",
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
    },
    xaxis: {
        type: "category",
        categories: [], // Dinamiskan
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        min: 0,
        max: 100,
    },
};

interface ChartOneState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartOne = ({ data }: { data: number[] }) => {
    const [month, setMonth] = useState<number>(new Date().getMonth()); // Bulan saat ini
    const [year, setYear] = useState<number>(new Date().getFullYear()); // Tahun saat ini

    // Hitung jumlah hari dalam bulan
    const getDaysInMonth = (month: number, year: number): number[] => {
        const days = new Date(year, month, 0).getDate(); // Tambahkan 1 ke bulan
        return Array.from({ length: days }, (_, i) => i + 1); // [1, 2, ..., days]
    };

    const daysInMonth = getDaysInMonth(month, year);
    console.log(daysInMonth);

    const [state, setState] = useState<ChartOneState>({
        series: [
            {
                name: "Omzet",
                // data: Array.from({ length: daysInMonth.length }, () =>
                //     Math.floor(Math.random() * 100)
                // ), // Dummy data omzet
                data: data,
            },
        ],
    });

    return (
        <div className="col-span-12 px-5 pb-5 bg-white border rounded-sm shadow-md pt-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 sm:px-7 xl:col-span-8">
            <div className="flex justify-between">
                <select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                    className="px-2 py-1 border"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", {
                                month: "long",
                            })}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="px-2 py-1 border"
                />
            </div>
            <div id="chartOne" className="-ml-5">
                <ReactApexChart
                    options={{
                        ...options,
                        xaxis: {
                            ...options.xaxis,
                            categories: daysInMonth.map(String), // Tanggal
                        },
                    }}
                    series={state.series}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

export default ChartOne;
