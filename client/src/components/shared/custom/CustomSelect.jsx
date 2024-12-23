
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CustomSelect = ({ items, placeholder = '', name = '', form, props }) => {
    return (
        <Select opts={{
            direction: "rtl",
        }} {...props} onValueChange={(v) => {
            form && form.setValue(name, v)
        }}>
            <SelectTrigger className='placeholder-bg text-primary-dark-light border-none' >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='placeholder-bg shadow-md '>
                {items?.map((item, index) => (<SelectItem className='placeholder-bg text-primary-dark-light elemen-hover_dark-light' key={index} value={item.value}>{item.label}</SelectItem>))}
            </SelectContent>
        </Select>
    )
}
export default CustomSelect