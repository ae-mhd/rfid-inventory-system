import { useState, useEffect } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,

} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSpinner } from 'react-icons/fa';

const CustomTableData = ({ columns, data, onSelectedRowsChange, pagination, loading, hasMultiSelect, columnVisibility = {}, }) => {

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [previousData, setPreviousData] = useState([]);
    // Keep track of previous data for fallback
    useEffect(() => {
        if (!loading && data?.length > 0) {
            setPreviousData(data);
        }
    }, [data, loading]);

    // Use previousData if loading is true
    const displayData = loading ? previousData : data;

    const table = useReactTable({
        data: displayData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        manualPagination: true,
        pageCount: pagination && pagination.pageCount,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
            pagination: pagination && {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
            columnVisibility
        },
        onPaginationChange: pagination && pagination.onPaginationChange,
    });

    useEffect(() => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        onSelectedRowsChange && hasMultiSelect && onSelectedRowsChange(selectedRows);
    }, [rowSelection, onSelectedRowsChange,]);

    // Ensure pageSize has a default value
    const pageSize = pagination?.pageSize || 20;
    const currentPage = pagination?.pageIndex + 1

    return (
        <div className='relative '>
            {/* {true && (
                <>
                    <FaSpinner className=" absolute top-1/2 left-1/2 z-[11]  animate-spin text-center size-8 text-primary-dark-light" />
                    <div className='absolute inset-0 dark:bg-white bg-black z-10 opacity-10   flex items-center justify-center rounded-lg'>
                    </div>
                </>
            )} */}
            <Table className='relative '>
                {loading && (
                    <>
                        <FaSpinner className=" absolute top-1/2 left-1/2 z-[11]  animate-spin text-center size-8 text-primary-dark-light" />
                        <div className='absolute inset-0 dark:bg-white bg-black z-10 opacity-15   flex items-center justify-center rounded-lg'>
                        </div>
                    </>
                )}
                <TableHeader className='bg-tertiary-dark-light text-primary-dark-light rounded-2xl'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                            {hasMultiSelect && <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={table.getIsAllPageRowsSelected()}
                                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                    aria-label="Select all"
                                />
                            </TableHead>}
                            {headerGroup.headers.map((header) => (
                                <TableHead className='whitespace-nowrap' key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className='bg-primary-dark-light text-primary-dark-light rounded-t-lg min-h-[300px]'>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {hasMultiSelect && <TableCell className="w-[50px]">
                                        <Checkbox
                                            checked={row.getIsSelected()}
                                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                                            aria-label="Select row"
                                        />
                                    </TableCell>}
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className='whitespace-nowrap' key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>

                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    لا يوجد بيانات.
                                </TableCell>
                                {/* {loading ?
                                    <TableCell colSpan={columns.length + 1} className="h-24 text-center"><FaSpinner className="animate-spin text-center m-auto size-8" /></TableCell>

                                    : <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                        لا يوجد بيانات.
                                    </TableCell>} */}

                            </TableRow>
                        )}
                </TableBody>
            </Table>
            {pagination && <div className="flex-between text-primary-dark-light space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">عدد الصفوف</p>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => pagination && pagination.onPaginationChange({ pageSize: Number(value), pageIndex: 0 })}
                    >
                        <SelectTrigger className="h-8 no-focus w-[60px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top" className='placeholder-bg shadow-md w-[60px] min-w-[60px]'>
                            {[10, 20, 30, 40, 50, 100, 200].map((size) => (
                                <SelectItem className='text-primary-dark-light ' key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className='border border-primary-dark-light'>
                                <Button
                                    className="bg-primary-dark-light p-1 hover:bg-primary hover:text-white "

                                    onClick={() => pagination.onPaginationChange({ pageIndex: pagination.pageIndex - 1 })}
                                    disabled={pagination.pageIndex === 0 || loading || !currentPage}
                                >
                                    <ChevronRightIcon className="w-4 h-4" />
                                    <span>السابق</span>
                                </Button>
                            </PaginationItem>

                            {renderPaginationItems(pagination.pageCount, pagination.pageIndex, pagination.onPaginationChange, loading)}

                            <PaginationItem className='border border-primary-dark-light'>
                                <Button
                                    className="bg-primary-dark-light p-1 hover:bg-primary hover:text-white "
                                    onClick={() => pagination.onPaginationChange({ pageIndex: pagination.pageIndex + 1 })}
                                    disabled={pagination.pageIndex === pagination.pageCount - 1 || loading || !currentPage}
                                >
                                    <span>التالي</span>
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            </div>}
        </div>
    );
};

const renderPaginationItems = (pageCount, pageIndex, onPaginationChange, isLoading) => {
    const totalPages = pageCount;

    const currentPage = pageIndex + 1;
    const items = [];

    const range = 1; // Number of pages to show before and after the current page
    const hasIndex = !!currentPage
    if (hasIndex) {
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - range && i <= currentPage + range)
            ) {
                items.push(
                    <PaginationItem key={i} className='p-0 border border-primary-dark-light  '>
                        <PaginationLink
                            className={` h-fit w-fit p-2 hover:bg-primary hover:text-white cursor-pointer ${pageIndex === i - 1 ? 'bg-primary-dark-light ' : ''}`}
                            onClick={() => {

                                onPaginationChange({ pageIndex: i - 1 })
                            }}
                            isactive={(pageIndex === i - 1).toString()}
                            disabled={isLoading}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
                items.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
            }
        }
    } else {
        items.push(<PaginationItem key={1} className='p-0 border border-primary-dark-light  '>
            <Button
                className={` cursor-not-allowed h-fit w-fit p-2  hover:text-white  }`}

                isactive={true.toString()}
                disabled={true}
            >
                1
            </Button>
        </PaginationItem>)
    }



    return items;
};

export default CustomTableData;