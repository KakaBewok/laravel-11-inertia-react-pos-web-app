"use client";

import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type ExpenseColumn = {
    id: string;
    name: string;
    amount: number;
    expense_date: string;
};

export const columns: ColumnDef<ExpenseColumn>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Name
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Amount
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount);

            return formatted;
        },
    },
    {
        accessorKey: "expense_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Expense date
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
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
