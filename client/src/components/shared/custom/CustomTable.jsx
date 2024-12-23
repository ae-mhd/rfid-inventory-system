import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,

} from "@tanstack/react-table"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesRight, FaAnglesLeft, FaSpinner } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { memo, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CustomSelect from "./CustomSelect";


const useSelectedRows = (table) => {
    const [selectedRowsData, setSelectedRowsData] = useState([]);

    useEffect(() => {
        const selectedRowIds = table.getState().selectedRowIds;
        const selectedData = table.data?.filter((row) => selectedRowIds.includes(row.id));
        setSelectedRowsData(selectedData);
    }, [table.getState().selectedRowIds]);

    return selectedRowsData;
};
const DataTable = ({
    columns,
    data,
    filters,
    setFilters,
    total,
    currentPage,
    lastPage,
    isLastPage,
    loading,
    setSelectedRows,
    height = '',
    hasPagination = true
}) => {

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [rowSelection, setRowSelection] = useState({})
    const table = useReactTable({
        data,
        columns,
        rowCount: total,
        // pageCount: total,
        initialState: {
            pagination: {
                pageIndex: currentPage,
                pageSize: 20,
                // pageCount: 10
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        // manualPagination: true,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })
    const perPage = table.getState().pagination.pageSize;

    useEffect(() => {
        setSelectedRows && setSelectedRows(table.getSelectedRowModel().rows.map((row) => row.original))
        // }, [table.getSelectedRowModel().rows])
    }, [JSON.stringify(table.getSelectedRowModel().rows)])
    return (
        <>
            <div className={`rounded-md ${height}  `}>
                <div className="relative w-full overflow-auto">

                    <Table
                        className='bg-primary-dark-light py-4 text-primary-dark-light'>
                        <TableHeader className='text-start bg-tertiary-dark-light font-medium text-lg '>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className='border-transparent' key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                style={{ width: header.getSize() }}
                                                className="first-of-type:rounded-tr-md last-of-type:rounded-tl-md"
                                                key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody >
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell style={{
                                                width: cell.column.getSize(),
                                                minWidth: cell.column.columnDef.size,
                                                maxWidth: cell.column.columnDef.size,
                                            }} className='text-base' key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) :

                                (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            {loading ? <FaSpinner className="animate-spin text-center m-auto size-8" /> : 'لا يوجد بيانات.'}
                                        </TableCell>
                                    </TableRow>
                                )

                            }
                        </TableBody>
                    </Table>
                </div>

                {!loading && hasPagination && <DataTablePagination
                    lastPage={lastPage}
                    isLastPage={isLastPage}
                    total={total}
                    currentPage={currentPage}
                    filters={filters}
                    setFilters={setFilters}
                    table={table}
                    perPage={perPage}
                />}



            </div>
        </>
    )
}
export default memo(DataTable)
export function DataTablePagination({
    table,
    filters,
    setFilters,
    currentPage,
    total,
    perPage,
    isLastPage,
    lastPage,

}) {
    return (
        <div className="flex items-center justify-between px-2">

            {/* =========Selected Rows ========*/}
            {/* <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div> */}
            <div className="flex-between  w-full mt-4 text-primary-dark-light">
                {/* =====Rows per page========== */}
                <div className="hidden md:flex flex-col lg:flex-row items-center gap-4 ">
                    <p className="text-sm font-medium">عدد الصفوف</p>


                    <Select
                        value={`${perPage}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                            setFilters && setFilters(prev => ({ ...prev, pagination: { per_page: Number(value), currentPage: 1 } }))
                        }}

                    >
                        <SelectTrigger className="h-8 no-focus w-[60px]">
                            <SelectValue placeholder={perPage} />
                        </SelectTrigger>
                        <SelectContent side="top" className='placeholder-bg shadow-md'>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem className='text-primary-dark-light' key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-center text-sm font-medium">
                    {/* <span className="text-base ">

                        الصفحة {table.getState().pagination.pageIndex + 1} من
                        <span className="mx-1">{table.getPageCount()}  ({total} عنصر) </span>
                    </span> */}
                    <span className="text-base ">

                        الصفحة {currentPage} من
                        <span className="mx-1">{table.getPageCount()}  ({total} عنصر) </span>
                    </span>
                </div>
                <div className="flex items-center gap-2 ">
                    <Button
                        variant="outline"
                        className=" h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            table.setPageIndex(0)
                            setFilters({
                                ...filters, pagination:
                                {
                                    per_page: perPage,
                                    currentPage: 1
                                }
                            })
                        }}
                        disabled={currentPage == 1}

                    // disabled={!table.getCanPreviousPage()}
                    >
                        <FaAnglesRight className="h-4 w-4" />

                        <span className="sr-only">Go to first page</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setFilters({
                                ...filters, pagination:
                                {
                                    per_page: perPage,
                                    currentPage: currentPage - 1
                                }
                            })
                            table.previousPage()
                        }}
                        // disabled={!table.getCanPreviousPage()}
                        disabled={currentPage == 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <FaChevronRight className="h-4 w-4" />

                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setFilters({
                                ...filters, pagination:
                                {
                                    per_page: perPage,
                                    currentPage: currentPage + 1
                                }
                            })
                            table.nextPage()
                        }}
                        // disabled={!table.getCanNextPage()}
                        disabled={isLastPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <FaChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className=" h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            table.setPageIndex(lastPage)
                            setFilters({
                                ...filters, pagination:
                                {
                                    per_page: perPage,
                                    currentPage: lastPage
                                }
                            })
                        }}
                        // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        // disabled={!table.getCanNextPage()}
                        disabled={isLastPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <FaAnglesLeft className="h-4 w-4" />

                    </Button>
                </div>
            </div>
        </div>
    )
}