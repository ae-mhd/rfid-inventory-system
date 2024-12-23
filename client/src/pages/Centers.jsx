import { CustomDialog, DeletePopover, NewCenterForm, SideFilterDrawer } from "@/components"
import { useGet, } from "@/hooks/fetchData"

import { useFilters } from "@/hooks/useFilters"
import CustomTableData from "@/components/shared/custom/CustomTableData"
import { useState } from "react"
import { RiEditFill } from "react-icons/ri"

const Centers = () => {
    const [centerData, setCenterData] = useState()
    const [openCreateCenter, setOpenCreateCenter] = useState(false)
    const closeCreateCenter = () => {
        setOpenCreateCenter(prev => !prev)
        setCenterData(null)
    }
    // const { pagination, resetPagination } = usePagination()
    const { filters, handleFilterChange, resetFilter, setFilters } = useFilters();


    const { data: getCentersData, isPending: getCentersLoading, refetch } = useGet('/centers', ['centers'], filters)
    const Centers = getCentersData?.data?.data || []
    const CentersColumns = [

        {
            accessorKey: "name",
            header: "إسم المركز",
        },
        {
            accessorKey: "floors",
            header: ' الطوابق',
            cell: ({ row }) => (<dev className="flex flex-col gap-2">
                {row.getValue('floors').map((floor, index) => (
                    <span key={index}>- {floor.name}</span>))}
            </dev>)
        },
        {
            accessorKey: "floorCount",
            header: 'عدد الطوابق',

        },
        {
            accessorKey: "uuid",
            header: 'إجراء',
            cell: ({ row }) => {

                const original = row.original

                return <div className="flex-center gap-3">

                    <DeletePopover
                        deleteApi={'/centers/' + original?._id}
                        // filters={filters}
                        // updateData={() => getcenters(filters)}
                        successMessage='تمت إزالة المركز بنجاح'
                        deleteMessage='هل انت متأكد من حذف المركز '
                        queryKey='centers'
                    />

                    <RiEditFill
                        onClick={() => {
                            setCenterData(original)
                            setOpenCreateCenter(true)
                        }} className="size-6 cursor-pointer text-green-600" />
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
    // }, [filters, pagination.pageIndex, pagination.pageSize]);
    // console.log(filters)
    return (
        <>
            <h2 className='h2-bold text-primary-dark-light '>المراكز</h2>

            <SideFilterDrawer
                selectFilterProps={selectFilterProps}
                leftOptions={<div className='btn bg-primary text-white' onClick={() => setOpenCreateCenter(true)} >إضافة مركز</div>}
                filters={filters}
                resetFilter={resetFilter}
                setFilters={setFilters}
            // hasDatePiker
            />
            <CustomDialog
                content={<NewCenterForm
                    close={closeCreateCenter}
                    data={centerData}
                    refetch={refetch}
                />}
                header={centerData ? 'تعديل المركز' : 'إضافة مركز'}
                open={openCreateCenter}
                interactOutside={false}
                close={() => setOpenCreateCenter(false)}
            />
            <CustomTableData
                data={Centers}
                columns={CentersColumns}
                loading={getCentersLoading}
            />

        </>
    )
}

export default Centers

