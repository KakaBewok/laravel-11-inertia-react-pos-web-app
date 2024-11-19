import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartOneState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartOne = ({ data }: { data: number[] }) => {
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const options: ApexOptions = {
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
                show: true,
                tools: {
                    download: true,
                    zoomin: true,
                    zoomout: true,
                    selection: false,
                    zoom: false,
                    pan: false,
                    reset: false,
                },
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
            borderColor: "#737373",
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
            categories: [],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                style: {
                    colors: "#737373",
                },
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                show: true,
                style: {
                    colors: "#737373",
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            fillSeriesColor: true,
            style: {
                fontSize: "12px",
            },
        },
    };

    const getDaysInMonth = (month: number, year: number): number[] => {
        const days = new Date(year, month, 0).getDate();
        return Array.from({ length: days }, (_, i) => i + 1);
    };

    const daysInMonth = getDaysInMonth(month, year);

    const [state, setState] = useState<ChartOneState>({
        series: [
            {
                name: "Omzet",
                data: data,
            },
        ],
    });

    return (
        <div className="col-span-12 px-5 pb-5 bg-white border rounded-sm shadow-md pt-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 sm:px-7 xl:col-span-8">
            <div>
                <h4 className="text-xl font-semibold text-black dark:text-white pb-3">
                    Omzet per Month
                </h4>
            </div>
            <div className="flex justify-start gap-3 py-3">
                <select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                    className="px-2 py-1 w-1/3 dark:text-slate-300 dark:bg-slate-700"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", {
                                month: "long",
                            })}
                        </option>
                    ))}
                </select>
                <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="px-2 py-1 w-1/3 dark:text-slate-300 dark:bg-slate-700"
                >
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>
            <div id="chartOne" className="-ml-5">
                <ReactApexChart
                    options={{
                        ...options,
                        xaxis: {
                            ...options.xaxis,
                            categories: daysInMonth.map(String),
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
