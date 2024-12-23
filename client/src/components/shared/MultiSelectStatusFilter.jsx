import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { MultiSelect } from "../ui/multi-select";

const MultiSelectStatusFilter = ({ options, filters, name, placeholder, icon, containerBg, onChange }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    // const onFilter = () => {
    //     console.log({ ...filters, [name]: selectedValues })

    // }
    return (
        <div className={`flex items-center  max-sm:w-full ${containerBg}  rounded-md   ps-1`}>


            <MultiSelect
                options={options}
                onValueChange={(v) => {
                    setSelectedValues(v)
                    onChange(v)
                }}
                defaultValue={selectedValues}
                placeholder={placeholder}
                variant="inverted"
                animation={2}
                maxCount={2}
                // onSubmit={onFilter}
                className=' placeholder-bg'
            />
        </div>
    )
}

export default MultiSelectStatusFilter