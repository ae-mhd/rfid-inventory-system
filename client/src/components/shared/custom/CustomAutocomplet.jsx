import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Loader } from "@/components";

const CustomAutocomplete = ({ items, placeholder, onChange, loading, disabled, field, value = '' }) => {
    const [open, setOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [selectedValue, setSelectedValue] = useState();

    const inputRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(0);
    useEffect(() => {
        // Set the input width whenever the component renders
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }
    }, [open])

    useEffect(() => {

        setSelectedLabel(items?.find((item) => item?.value == field?.value || item?.value == value)?.label || '');
        setSelectedValue(field ? field.value : value);
    }, [field, items, value])
    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger
                    className="bg-tertiary-dark-light text-primary-dark-light" asChild>
                    <Button
                        disabled={disabled || loading}

                        ref={inputRef}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="max-sm:w-full w-full justify-between"
                    >
                        {selectedLabel || placeholder}
                        <ChevronsUpDown className="me-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    // className="max-xs:w-[200px] max-sm:w-[300px] max-md:w-[200px] max-lg:w-[400px] xl:w-[600px] bg-tertiary-dark-light text-primary-dark-light p-0">
                    className="bg-tertiary-dark-light text-primary-dark-light p-0"
                    style={{
                        width: inputWidth,
                        pointerEvents: "auto"
                    }}
                >
                    <Command disabled={disabled}>
                        <CommandInput placeholder='إبحث...' />
                        <CommandList>
                            <CommandEmpty>لا يوجد بيانات.</CommandEmpty>
                            {loading ? (
                                <Loader />
                            ) : (
                                <CommandGroup>
                                    {items?.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.label.toLowerCase()} // Use label for filtering
                                            onSelect={() => {
                                                setSelectedLabel(item.label); // Set label for display
                                                setSelectedValue(item.value); // Store the actual value
                                                field && field.onChange(item.value)

                                                onChange(item.value.toString()); // Pass the value to onChange
                                                setOpen(false);
                                            }}

                                        >
                                            <Check
                                                className={cn(
                                                    "me-2 h-4 w-4",
                                                    selectedValue === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CustomAutocomplete;
