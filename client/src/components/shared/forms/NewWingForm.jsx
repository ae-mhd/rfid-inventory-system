import { Form, } from "@/components/ui/form"
import { NewWingSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomFormField from "../custom/CustomFormField"
import { useGet, usePost, useUpdate } from "@/hooks/fetchData"
import { useEffect, } from "react"
import { Button } from "@/components/ui/button"
import { mapTransform } from "@/lib/utils"



const NewWingForm = ({ data, close }) => {
    const { data: floorsData, isLoading: floorsLoading } = useGet('/floors', ['floors'], {
        limit: 'all'
    })
    const floors = floorsData?.data?.data || []
    const floorsList = mapTransform(floors)
    console.log('data', data)

    const { mutateAsync: createcenter, isPending: createcenterLoading } = usePost('/wings', ['wings'], 'تم اضافة الجناح بنجاح')
    const { mutateAsync: updatecenter, isPending: updatecenterLoading } = useUpdate(`/wings/${data?._id}`, ['wings'], 'تم تعديل الجناح بنجاح',)
    const form = useForm({
        resolver: zodResolver(NewWingSchema),
        defaultValues: {
            name: '',
            floor: '',
            wingCount: 1,
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
        data && form.reset({ ...data, floor: data?.floor?._id })
    }, [data, floorsLoading])

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
                            placeholder='اسم الجناح'
                            label='الجناح'
                            type="input"
                        />
                    </div>
                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='floor'
                            placeholder=' إختر الطابق'
                            label='الطابق'
                            type="select"
                            loading={floorsLoading}
                            items={floorsList}
                        />
                    </div>

                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='wingNumber'
                            placeholder='رقم الجناح'
                            label='رقم الجناح'
                            type="input"
                            inputType='number'
                        />
                    </div>
                    <div className=' col-span-6 md:col-span-3 mb-3'>
                        <CustomFormField
                            form={form}
                            name='code'
                            placeholder='رمز الجناح'
                            label='رمز الجناح'
                            type="input"
                        />
                    </div>
                </div>
                <div className="flex-center mt-4 ">
                    <Button className='text-white h3-bold'
                        disabled={createcenterLoading || updatecenterLoading}
                        type="submit"> {data ? 'تعديل الجناح ' : 'إضافة جناح '} </Button>
                </div>

            </form>
        </Form>
    )
}

export default NewWingForm