"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductColumn = {
    id: number;
    name: string;
    price: string;
    unit: string;
    stock_quantity: string;
    category: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
    {
        accessorKey: "stock_quantity",
        header: "Stock",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
];
