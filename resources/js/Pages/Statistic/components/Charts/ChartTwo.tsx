import { Separator } from "@/Components/ui/separator";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const ChartTwo = ({ omzetPerDaysInWeek }: { omzetPerDaysInWeek: number[] }) => {
    const options: ApexOptions = {
        colors: ["#80CAEE", "#3C50E0"],
        chart: {
            fontFamily: "Satoshi, sans-serif",
            type: "bar",
            height: 335,
            stacked: true,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: false,
            },
        },
        responsive: [
            {
                breakpoint: 1536,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                            columnWidth: "25%",
                        },
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: "25%",
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "last",
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["M", "T", "W", "T", "F", "S", "S"],
            labels: {
                show: true,
                style: {
                    colors: "#737373",
                },
            },
            axisTicks: {
                show: false,
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
        legend: {
            position: "top",
            horizontalAlign: "left",
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            labels: {
                colors: "#737373",
            },
        },
        fill: {
            opacity: 1,
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

    const state = {
        series: [
            {
                name: "Omzet",
                data: omzetPerDaysInWeek,
            },
        ],
    };

    return (
        <div className="col-span-12 p-6 bg-white border rounded-sm shadow-slate-800 dark:border-slate-700 dark:bg-slate-900 xl:col-span-4">
            <div>
                <h4 className="pb-3 text-lg font-semibold text-black dark:text-white">
                    Omzet per Week
                </h4>
                <Separator className="py-[0.04rem] mb-5 bg-slate-200 dark:bg-slate-700" />
                <p className="text-xs font-medium text-slate-500">
                    Y: Milion (IDR)
                </p>
                <p className="text-xs font-medium text-slate-500">X: Days</p>
            </div>
            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartTwo;
