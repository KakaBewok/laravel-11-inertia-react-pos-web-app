"use client";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

interface DataWithId {
    id: string;
}

interface DataTableProps<TData extends DataWithId, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey: string;
    onDelete: (ids: string[]) => void;
}

export function DataTable<TData extends DataWithId, TValue>({
    columns,
    data,
    searchKey,
    onDelete,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    let selectedIds = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original.id);

    const handleDeleteSelectedRows = () => {
        onDelete(selectedIds);
    };

    return (
        <div>
            {/* search & visibility column*/}
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Search"
                    value={
                        (table
                            .getColumn(searchKey)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchKey)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm border dark:border-slate-600 border-slate-300"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                        >
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* select all button */}
            <Button
                variant="outline"
                onClick={() =>
                    table.toggleAllPageRowsSelected(
                        !table.getIsAllPageRowsSelected()
                    )
                }
                className={`flex items-center gap-1 ${
                    selectedIds.length < 1 ? "my-4" : ""
                } dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 hover:bg-slate-50`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="check"
                    className="fill-current"
                    width="21"
                    height="21"
                    fill="none"
                >
                    <path
                        fill="#131316"
                        d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
                    ></path>
                </svg>
                {table.getIsAllPageRowsSelected()
                    ? "Deselect all"
                    : "Select all"}
            </Button>
            {selectedIds.length > 0 && (
                <div className="flex items-center justify-between w-full py-4">
                    {/* delete selected button */}
                    <Button
                        variant="destructive"
                        className="flex items-center justify-between gap-2 dark:bg-red-500"
                        onClick={handleDeleteSelectedRows}
                    >
                        <svg
                            className="-mt-1 fill-current"
                            width="19"
                            height="19"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            id="box"
                        >
                            <path
                                fill="#F7F7FA"
                                d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
                            ></path>
                        </svg>
                        Delete selected
                    </Button>
                    {/* number of selected rows */}
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                </div>
            )}
            {/* main table */}
            <div className="border rounded-md">
                <Table className="border dark:border-slate-600 border-slate-300">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b dark:border-slate-600 border-slate-200"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    onClick={() =>
                                        row.toggleSelected(!row.getIsSelected())
                                    }
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={`${
                                        row.getIsSelected()
                                            ? "!bg-gray-600 text-slate-100 dark:!bg-slate-700"
                                            : ""
                                    } border-b dark:border-slate-600  border-slate-300`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            <div className="flex items-center justify-end py-4 space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="dark:bg-slate-50 dark:text-slate-800"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="dark:bg-slate-50 dark:text-slate-800"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
