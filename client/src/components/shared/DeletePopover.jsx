import { useState } from 'react'
import { Button } from '../ui/button'
import { FaTrashCan } from 'react-icons/fa6'
import { CgSpinnerTwo } from 'react-icons/cg'
import { CustomPopover } from '..'
import { useDelete } from '@/hooks/fetchData'
import { toast } from '../ui/use-toast'

const DeletePopover = ({ updateData, idProp, successMessage = 'تم الحذف بنجاح', deleteMessage = 'تأكيد عملية الحذف', deleteApi, queryKey, onClick, size = 'size-4' }) => {
    const [openDelete, setOpenDelete] = useState(false)
    const { mutateAsync: deleteData, isPending: deleteDataLoading } = useDelete(deleteApi, [queryKey], successMessage)
    return <CustomPopover
        open={openDelete}
        close={setOpenDelete}
        trigger={
            <FaTrashCan
                onClick={() => setOpenDelete(true)}
                className={`${size} cursor-pointer text-red-600`} />
        }
        content={<div className="flex flex-col">
            <p className="text-lg text-primary-dark-light text-center">
                {deleteMessage}
            </p>
            <div className="flex-between w-full   mt-2">
                <Button
                    onClick={() => {
                        // apply on click if there is no api for delete
                        !deleteApi && onClick && onClick()

                        deleteApi && deleteData(idProp && idProp)
                            .then(() => {
                                updateData && updateData()
                                // apply on click after calling delete api and succeed 
                                onClick && onClick()
                            }).catch((e) => toast({
                                variant: 'destructive',
                                description: e.response.data.message,
                            }))
                    }}
                    disabled={deleteDataLoading}
                    className='btn text-base font-semibold text-white bg-red-600 hover:bg-red-500 flex-center gap-2'
                >
                    {deleteDataLoading ? <CgSpinnerTwo className="animate-spin text-white size-4" /> :
                        <>
                            <FaTrashCan

                                className={`size-4 cursor-pointer `}
                            />
                            <span>نعم </span></>
                    }

                </Button>
                <Button variant='ghost' className='border-gray-500 w-16  bg-transparent cursor-pointer text-primary-dark-light rounded-md  border-2 text-base'
                    onClick={() => {
                        setOpenDelete(false)

                    }}>تراجع  </Button>
            </div>
        </div>}
    />



}

export default DeletePopover