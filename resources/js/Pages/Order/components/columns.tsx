"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type OrderColumn = {
    id: string;
    customer_name: string;
    total_amount: number;
    total_paid: number;
    changes: number;
    status: "pending" | "cancelled" | "completed";
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Num.
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "customer_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Customer name
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: "total_amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Total amount
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_amount"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount);

            return formatted;
        },
    },
    {
        accessorKey: "total_paid",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Total paid
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_paid"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount);

            return formatted;
        },
    },
    {
        accessorKey: "changes",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Changes
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("changes"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount);

            return formatted;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Status
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status: string = row.getValue("status");
            return (
                <Badge
                    variant="default"
                    className={`${
                        status === "completed"
                            ? "bg-green-500 dark:text-white hover:bg-green-500 hover:text-white"
                            : status === "pending"
                            ? "bg-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white"
                            : "bg-red-500 dark:text-white hover:bg-red-500 hover:text-white"
                    } px-3 py-1 text-sm rounded-sm`}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <span className="font-bold text-slate-800 dark:text-slate-50">
                    Actions
                </span>
            );
        },
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
