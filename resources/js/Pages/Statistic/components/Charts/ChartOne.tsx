import { Separator } from "@radix-ui/react-dropdown-menu";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartOneProps {
    daysInMonth: number[];
    omzetPerDaysInMonth: number[];
}

const ChartOne: React.FC<ChartOneProps> = ({
    daysInMonth,
    omzetPerDaysInMonth,
}) => {
    const state = {
        series: [
            {
                name: "Omzet",
                data: omzetPerDaysInMonth,
            },
        ],
    };

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
            animations: {
                enabled: false,
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
            max: 10,
            floating: false,
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

    return (
        <div className="col-span-12 px-5 pb-5 bg-white border rounded-sm shadow-md pt-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800 sm:px-7 xl:col-span-8">
            <div>
                <h4 className="pb-3 text-xl font-semibold text-black dark:text-white">
                    Omzet per Day
                </h4>
                <Separator className="py-[0.04rem] mb-5 bg-slate-200 dark:bg-slate-700" />
                <p className="text-xs font-medium text-slate-500">
                    Y: Milion (IDR)
                </p>
                <p className="text-xs font-medium text-slate-500">X: Days</p>
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
