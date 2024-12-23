import { CustomDialog, DeletePopover, NewFloorForm, SideFilterDrawer } from "@/components"
import { useGet, } from "@/hooks/fetchData"

import { useFilters } from "@/hooks/useFilters"
import CustomTableData from "@/components/shared/custom/CustomTableData"
import { useState } from "react"
import { RiEditFill } from "react-icons/ri"

const Floors = () => {
    const [floorData, setFloorData] = useState()
    const [openCreateModel, setOpenCreateModel] = useState(false)
    const closeCreateFloor = () => {
        setOpenCreateModel(prev => !prev)
        setFloorData(null)
    }
    // const { pagination, resetPagination } = usePagination()
    const { filters, handleFilterChange, resetFilter, setFilters } = useFilters(null, {
        populate: 'center',
    });


    const { data: getFloorsData, isPending: getFloorsLoading, refetch } = useGet('/floors', ['floors'], filters)
    const Floors = getFloorsData?.data?.data || []
    const FloorsColumns = [

        {
            accessorKey: "name",
            header: "إسم الطابق",
        },
        {
            accessorKey: "center",
            header: 'المركز',
            cell: ({ row }) => row.getValue('center')?.name
        },
        {
            accessorKey: "code",
            header: 'رمز الطابق',
        },
        {
            accessorKey: "floorNumber",
            header: 'رقم الطابق',
        },
        {
            accessorKey: "wingCount",
            header: 'عدد الاجنحة',
        },

        {
            accessorKey: "uuid",
            header: 'إجراء',
            cell: ({ row }) => {

                const original = row.original

                return <div className="flex-center gap-3">

                    <DeletePopover
                        deleteApi={'/floors/' + original?._id}
                        successMessage='تمت إزالة المركز بنجاح'
                        deleteMessage='هل انت متأكد من حذف المركز '
                        queryKey='floors'
                    />

                    <RiEditFill
                        onClick={() => {
                            setFloorData(original)
                            setOpenCreateModel(true)
                        }}
                        className="size-6 cursor-pointer text-green-600" />
                </div>

            },
        },

    ]

    const selectFilterProps = [
        {
            onChange: handleFilterChange,
            // defaultValue: filters.search,
            name: 'search',
            placeholder: 'بحث ...',
            type: 'searchInput'
        },
        // {
        //     name: 'state_id',
        //     items: states,
        //     placeholder: 'المحافظة',
        //     loading: statesLoading,
        //     type: 'autocomplete'
        // },

    ]
    // useEffect(() => {
    //     refetch({
    //         params: { search: filters?.search },

    //     });
    // }, [filters, pagination.pageIndex, pagination.pageSize]);
    // console.log(filters)
    return (
        <>
            <h2 className='h2-bold text-primary-dark-light '> الطوابق</h2>

            <SideFilterDrawer
                selectFilterProps={selectFilterProps}
                leftOptions={<div className='btn bg-primary text-white' onClick={() => setOpenCreateModel(true)} >اضافة طابق</div>}
                filters={filters}
                resetFilter={resetFilter}
                setFilters={setFilters}
            // hasDatePiker
            />
            <CustomDialog
                content={<NewFloorForm
                    close={closeCreateFloor}
                    data={floorData}
                    refetch={refetch}
                />}
                header={floorData ? 'تعديل الطابق' : 'إضافة طابق'}
                open={openCreateModel}
                close={() => setOpenCreateModel(false)}
            />
            <CustomTableData
                data={Floors}
                columns={FloorsColumns}
                loading={getFloorsLoading}
            />

        </>
    )
}

export default Floors

