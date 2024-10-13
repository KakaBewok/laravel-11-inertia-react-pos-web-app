"use client";

import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
    id: string;
    name: string;
    description: string;
    product_quantity: number;
};

export const columns: ColumnDef<CategoryColumn>[] = [
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
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Description
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: "product_quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="font-bold text-slate-800 dark:text-slate-50"
                >
                    Product Quantity
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
