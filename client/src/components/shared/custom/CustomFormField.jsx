import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomSelectForm from "./CustomSelectForm"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

import { memo } from "react"
import { CustomAutocomplete } from "@/components"
import { FaTimesCircle } from "react-icons/fa"
import MultipleSelector from "@/components/ui/multiple-selector"
const CustomFormField = ({ name, label, placeholder, form, onChange, type = 'input', inputType, items, loading, disabled, noDataSelectLabel }) => {

    const Controller = ({ field }) => {
        switch (type) {
            case 'select':
                return <CustomSelectForm onChange={(e) => onChange && onChange(e)}
                    items={items}
                    placeholder={placeholder}
                    field={field}
                    loading={loading}
                    noDataLabel={noDataSelectLabel} />

            case 'autocomplete':
                return <CustomAutocomplete onChange={(e) => onChange && onChange(e)}
                    items={items}
                    placeholder={placeholder}
                    field={field}
                    loading={loading}
                    disabled={disabled}
                    noDataLabel={noDataSelectLabel} />
            case 'multiSelect':
                return <MultipleSelector
                    {...field}
                    defaultOptions={items}
                    placeholder={placeholder}
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-primary-dark-light">
                            لا يوجد بيانات.
                        </p>
                    }
                    hidePlaceholderWhenSelected
                    badgeClassName="bg-blue-700 text-white hover:bg-blue-800"
                    className="placeholder-bg text-primary-dark-light border-none"
                    hideClearAllButton
                />
            case 'checkbox':
                return (
                    <div className="flex items-center w-fit  ">
                        <Checkbox
                            id={label}
                            onChange={onChange}
                            checked={field.value}
                            onCheckedChange={(e) => {
                                field.onChange(e)
                                onChange && onChange(e)
                            }}
                            disabled={loading || disabled}
                        />
                        <label
                            htmlFor={label}
                            className="text-sm mx-3 w-36 font-medium text-primary-dark-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {label}
                        </label>
                    </div>
                )
            case 'textarea':
                return (
                    <Textarea
                        onChange={field.onChange}
                        disabled={loading || disabled}
                        className='placeholder-bg text-primary-dark-light  border-none'
                        placeholder={placeholder}
                        {...field}
                    />
                )

            default:
                return <Input
                    disabled={loading || disabled}
                    className='placeholder-bg text-primary-dark-light border-none'
                    placeholder={placeholder}
                    {...field}
                    type={inputType}
                />
        }
    }
    // this consition special for items array in new orders, cant reset product and its has quentity 
    const nameIncludesItem = name.includes('item')
    return (
        <FormField
            control={form.control}
            name={name}
            render={
                ({ field }) => {
                    // console.log('field', field)
                    // console.log({ ...form.getValues() })
                    return (
                        <FormItem className='space-y-4' >
                            {label && type !== 'checkbox' &&
                                <span className="flex items-center gap-2">
                                    <FormLabel className='text-primary-dark-light  text-lg'>{label}</FormLabel>
                                    {!!form.getValues(name) && type !== 'input' && !nameIncludesItem && <FaTimesCircle onClick={() => form.reset({ ...form.getValues(), [name]: '' })} className=" cursor-pointer text-red-500" />}

                                </span>
                            }
                            <FormControl >
                                <Controller field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )
                }
            }
        />
    )
}

export default memo(CustomFormField)