import { CustomSelectForm } from "@/components"

const SelectFilter = ({ items, onChange, name, loading, placeholder, label }) => {

    return <div className="flex-start  items-center gap-2 text-primary-dark-light border border-primary-dark-light rounded-md ps-1">
        <span className="font-semibold"> {label}:</span>
        <div className="flex-1">

            <CustomSelectForm
                onChange={(e) => onChange(name, e)}
                items={items}
                placeholder={placeholder}
                loading={loading}
                classes='w-full'
            />
        </div>
    </div>
}

export default SelectFilter