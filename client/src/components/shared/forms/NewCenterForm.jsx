import { Form, } from "@/components/ui/form"
import { NewCenterSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomFormField from "../custom/CustomFormField"
import { usePost, useUpdate } from "@/hooks/fetchData"
import { useEffect, } from "react"
import { Button } from "@/components/ui/button"



const NewCenterForm = ({ data, close }) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { mutateAsync: createcenter, isPending: createcenterLoading } = usePost('/centers', ['centers'], 'تم اضافة  المركز بنجاح')
    const { mutateAsync: updatecenter, isPending: updatecenterLoading } = useUpdate(`/centers/${data?._id}`, ['centers'], 'تم تعديل  المركز بنجاح', config)
    const form = useForm({
        resolver: zodResolver(NewCenterSchema),
        defaultValues: { name: '' },
    });
    // const center = centerData?.data

    const onSubmit = (values) => {
        console.log(values)
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
        data && form.reset(data)
    }, [data])



    // if (centerLoading) return <Loader />
    return (
        <Form {...form}>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-6">
                    <CustomFormField
                        form={form}
                        name='name'
                        placeholder='اسم المركز'
                        label="اسم المركز"
                        type="input"
                    />

                    <div className="flex-center mt-4 ">
                        <Button className='text-white h3-bold'
                            disabled={createcenterLoading || updatecenterLoading}
                            type="submit"> {data ? 'تعديل المركز ' : 'إضافة مركز '} </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewCenterForm