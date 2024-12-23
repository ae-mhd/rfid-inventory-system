import { CustomDialog, DeletePopover, NewWingForm, SideFilterDrawer } from "@/components"
import { useGet, } from "@/hooks/fetchData"

import { useFilters } from "@/hooks/useFilters"
import CustomTableData from "@/components/shared/custom/CustomTableData"
import { useEffect, useState } from "react"
import { RiEditFill } from "react-icons/ri"

const Wings = () => {
    const [wingData, setWingData] = useState()
    const [openCreateModel, setOpenCreateModel] = useState(false)
    const closeCreateWing = () => {
        setOpenCreateModel(prev => !prev)
        setWingData(null)
    }
    // const { pagination, resetPagination } = usePagination()
    const { filters, handleFilterChange, resetFilter, setFilters } = useFilters(null, {
        populate: 'floor',
    });


    const { data: getWingsData, isPending: getWingsLoading, refetch } = useGet('/wings', ['wings'], filters)
    const Wings = getWingsData?.data?.data || []
    const WingsColumns = [

        {
            accessorKey: "name",
            header: "إسم الجناح",
        },
        {
            accessorKey: "floor",
            header: 'الطابق',
            cell: ({ row }) => row.getValue('floor')?.name
        },
        {
            accessorKey: "code",
            header: 'رمز الجناح',
        },
        {
            accessorKey: "wingNumber",
            header: 'رقم الجناح',
        },
        {
            accessorKey: "officeCount",
            header: 'عدد المكاتب',
        },

        {
            accessorKey: "uuid",
            header: 'إجراء',
            cell: ({ row }) => {

                const original = row.original

                return <div className="flex-center gap-3">

                    <DeletePopover
                        deleteApi={'/wings/' + original?._id}
                        successMessage='تمت إزالة الجناح بنجاح'
                        deleteMessage='هل انت متأكد من حذف الجناح '
                        queryKey='wings'
                    />

                    <RiEditFill
                        onClick={() => {
                            setWingData(original)
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
    //     refetch();
    // }, [filters,]);
    // console.log(filters)
    return (
        <>
            <h2 className='h2-bold text-primary-dark-light '> الاجنحة</h2>

            <SideFilterDrawer
                selectFilterProps={selectFilterProps}
                leftOptions={<div className='btn bg-primary text-white' onClick={() => setOpenCreateModel(true)} >اضافة جناح</div>}
                filters={filters}
                resetFilter={resetFilter}
                setFilters={setFilters}
            // hasDatePiker
            />
            <CustomDialog
                content={<NewWingForm
                    close={closeCreateWing}
                    data={wingData}
                    refetch={refetch}
                />}
                header={wingData ? 'تعديل الجناح' : 'إضافة جناح'}
                open={openCreateModel}
                close={() => setOpenCreateModel(false)}
            />
            <CustomTableData
                data={Wings}
                columns={WingsColumns}
                loading={getWingsLoading}
            />

        </>
    )
}

export default Wings

