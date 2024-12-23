import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NODataIcon } from "@/lib/constants"
import { cn } from "@/lib/utils"

const CustomSelectForm = ({ onChange, items, placeholder = '', noDataLabel = 'لايوجد بيانات ', field, loading, disabled, classes }) => {

    return (

        <Select

            onValueChange={(e) => {
                field && field.onChange(e)
                onChange && onChange(e)
            }}
            disabled={loading || disabled}
            defaultValue={field?.value?.toString()}>
            <SelectTrigger className={cn(`placeholder-bg text-primary-dark-light border-none w-full sm:min-w-32 max-sm:max-w-36`, classes)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='placeholder-bg shadow-md '>
                {items?.length > 0 ?
                    items?.map((item, index) => {

                        return (<SelectItem
                            className='placeholder-bg text-primary-dark-light elemen-hover_dark-light'
                            key={index}
                            value={item.value?.toString()}
                        >{item.label}</SelectItem>)
                    })
                    : <div className='flex-center flex-col'>
                        <NODataIcon />
                        <p className='paragraph-regular text-primary-dark-light'>{noDataLabel} </p>
                    </div>
                }
            </SelectContent>
        </Select>


    )
}
export default CustomSelectForm


