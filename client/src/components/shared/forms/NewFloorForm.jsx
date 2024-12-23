import { Form, } from "@/components/ui/form"
import { NewFloorSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomFormField from "../custom/CustomFormField"
import { useGet, usePost, useUpdate } from "@/hooks/fetchData"
import { useEffect, } from "react"
import { Button } from "@/components/ui/button"
import { mapTransform } from "@/lib/utils"



const NewFloorForm = ({ data, close }) => {
    const { data: centersData, isLoading: centersLoading } = useGet('/centers', ['centers'], {
        limit: 'all'
    })
    const centers = centersData?.data?.data || []
    const cenetersList = mapTransform(centers)
    console.log('data', data)

    const { mutateAsync: createcenter, isPending: createcenterLoading } = usePost('/floors', ['floors'], 'تم اضافة الطابق بنجاح')
    const { mutateAsync: updatecenter, isPending: updatecenterLoading } = useUpdate(`/floors/${data?._id}`, ['floors'], 'تم تعديل الطابق بنجاح',)
    const form = useForm({
        resolver: zodResolver(NewFloorSchema),
        defaultValues: {
            name: '',
            center: '',
            // floorCount: '',
            code: ''
        },
    });
    // const center = centerData?.data

    const onSubmit = (values) => {
        // const formData = new FormData()

        // for (const property in values) {
        //     if (values[property]) {
        //         formData.append(property, values[property])
        //     }
        // }


        data ?
            updatecenter(values).then(() => {
                form.reset()
                close()
            }
            )
            : createcenter(values).then(() => {
                form.reset()
                close()
            }
            )

    }

    useEffect(() => {
        data && form.reset({ ...data, center: data?.center?._id })
    }, [data, centersLoading])

    console.log(form.getValues())

    // if (centerLoading) return <Loader />
    return (
        <Form {...form}>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div
                    className="w-full grid grid-cols-6 gap-3">
                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='name'
                            placeholder='اسم الطابق'
                            label='الطابق'
                            type="input"
                        />
                    </div>
                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='center'
                            placeholder=' إختر المركز'
                            label='المركز'
                            type="select"
                            loading={centersLoading}
                            items={cenetersList}
                        />
                    </div>

                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='floorNumber'
                            placeholder='رقم الطابق'
                            label='رقم الطابق'
                            type="input"
                            inputType='number'
                        />
                    </div>
                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='code'
                            placeholder='رمز الطابق'
                            label='رمز الطابق'
                            type="input"
                        />
                    </div>
                </div>
                <div className="flex-center mt-4 ">
                    <Button className='text-white h3-bold'
                        disabled={createcenterLoading || updatecenterLoading}
                        type="submit"> {data ? 'تعديل الطابق ' : 'إضافة طابق '} </Button>
                </div>

            </form>
        </Form>
    )
}

export default NewFloorForm