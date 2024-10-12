"use client";

import { Button } from "@/Components/ui/button";
import { useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

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
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
    const pageSizeOptions = ["5", "10", "20", "50"];
    const [pageSize, setPageSize] = useState<string>("10");

    const handlePageSizeChange = (newSize: string) => {
        setPageSize(newSize);
        table.setPageSize(Number(newSize));
    };

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
                            className="flex items-center gap-3 ml-auto dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                id="eye-slash"
                                className="fill-current"
                                width="21"
                                height="21"
                                fill="none"
                            >
                                <path
                                    fill="#131316"
                                    d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z"
                                ></path>
                            </svg>
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
                    selectedIds.length < 1 ? "mb-4" : ""
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
                                            ? "!bg-sky-200  dark:!bg-slate-700"
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
            <div className="flex items-center justify-between py-4">
                {/* rows per page */}
                <Select
                    onValueChange={handlePageSizeChange}
                    defaultValue={pageSize}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Rows per page" />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={size}>
                                Show {size} rows
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex items-center justify-end gap-5">
                    {/* pages info */}
                    <span className="hidden text-sm font-medium md:block">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    {/* actions */}
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="px-1 dark:bg-slate-50 dark:text-slate-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="angle-double-left"
                                className="fill-current"
                                width="24"
                                height="24"
                                fill="none"
                            >
                                <path
                                    fill="#1e293b"
                                    d="M11.46,8.29a1,1,0,0,0-1.42,0l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.16,12l2.3-2.29A1,1,0,0,0,11.46,8.29ZM14.66,12,17,9.71a1,1,0,0,0-1.42-1.42l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                                ></path>
                            </svg>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-1 dark:bg-slate-50 dark:text-slate-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="angle-left"
                                className="fill-current"
                                width="24"
                                height="24"
                                fill="none"
                            >
                                <path
                                    fill="#1e293b"
                                    d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"
                                ></path>
                            </svg>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-1 dark:bg-slate-50 dark:text-slate-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="angle-right"
                                className="fill-current"
                                width="24"
                                height="24"
                                fill="none"
                            >
                                <path
                                    fill="#1e293b"
                                    d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"
                                ></path>
                            </svg>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                            className="px-1 dark:bg-slate-50 dark:text-slate-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="angle-double-right"
                                className="fill-current"
                                width="24"
                                height="24"
                                fill="none"
                            >
                                <path
                                    fill="#1e293b"
                                    d="M8.46,8.29A1,1,0,1,0,7,9.71L9.34,12,7,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,0-1.42Zm8.5,3-3-3a1,1,0,0,0-1.42,1.42L14.84,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,17,11.29Z"
                                ></path>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
