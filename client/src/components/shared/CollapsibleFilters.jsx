import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LuFilterX } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import { CustomAutocomplete } from "..";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Button } from "../ui/button";
import CustomDateRangePicker from "./custom/CustomDateRangePicker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TbTrashXFilled } from "react-icons/tb";


const CollapsibleFilters = ({ selectFilterProps, resetFilter, leftOptions, rightOptions, children }) => {
    const [collapsible, setCollapsible] = useState(false);

    return (
        <Collapsible open={collapsible} onOpenChange={setCollapsible} className="my-8">
            <div className="flex-between py-4">
                <div className="flex-center gap-4 text-primary-dark-light">
                    <CollapsibleTrigger>
                        {collapsible ? (
                            <div onClick={resetFilter} className="bg-transparent">
                                <LuFilterX className="text-red-600 size-8 cursor-pointer" />
                            </div>
                        ) : (
                            <div className="bg-transparent">
                                <FiFilter className="text-primary-dark-light size-8 cursor-pointer" />
                            </div>
                        )}
                    </CollapsibleTrigger>
                    <div>
                        {rightOptions}
                    </div>
                </div>
                {leftOptions}

            </div>

            <CollapsibleContent className="px-4 rounded-md flex gap-4 flex-wrap">

                {children}
                {selectFilterProps.map((item, i) => (
                    <div key={i} className="flex-start items-center max-sm:w-full min-w-36 gap-2 my-2 text-primary-dark-light">
                        <CustomAutocomplete
                            {...item}
                        />
                    </div>
                ))}

            </CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleFilters

export const SideFilterDrawer = ({ isOpen, toggleDrawer, filters, setFilters, hasDatePiker, resetFilter, leftOptions, rightOptions, selectFilterProps, children }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    useEffect(() => {
        setSelectedFilters(filters)
    }, [filters])
    return (
        <>
            <div className="flex-between">
                <div className="flex-center gap-4 text-primary-dark-light">
                    <div onClick={toggleDrawer} className="bg-transparent my-4">
                        <FiFilter className=" text-primary-dark-light size-8 cursor-pointer" />
                    </div>
                    {rightOptions}
                    <TbTrashXFilled className="text-red-500 size-6 cursor-pointer" onClick={resetFilter} />
                </div>
                <div className="flex-center gap-3">
                    {hasDatePiker && <CustomDateRangePicker setFilters={setFilters} filters={filters} hasCreatedUpdateFilter />}
                    {leftOptions}
                </div>
            </div>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                zIndex={49}
                className='w-fit space-y-4 md:!w-80 h-full bg-primary-dark-light p-4 overflow-y-auto'

            >
                <h3 className='text-primary-dark-light h3-bold text-center '>إختر الفلتر المناسب</h3>
                <div className="flex-between ">
                    <Button
                        onClick={() => setFilters((prev) => ({ ...prev, ...selectedFilters }))}
                        variant='ghost' className='bg-green-400 hover:opacity-80 text-white text-base w-28'>تطبيق</Button>
                    <Button variant='ghost' className='bg-red-400 hover:opacity-80 text-white text-base w-28 ' onClick={resetFilter}>حذف</Button>
                </div>

                {children}
                {selectFilterProps?.map((item, i) => {
                    if (item?.type === 'input') {
                        return (
                            <Input
                                key={i}
                                placeholder={item?.placeholder}
                                value={selectedFilters[item.name]}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, [item.name]: e })}
                                className="max-w-sm text-primary-dark-light placeholder-bg ring-transparent border-transparent"
                            />
                        )
                    } else if (item?.type === 'autocomplete') {
                        return (
                            <div key={i} onClick={() => console.log('first')} className="flex-start items-center max-sm:w-full min-w-36 gap-2 my-2 text-primary-dark-light">
                                <CustomAutocomplete
                                    value={selectedFilters[item.name]}
                                    onChange={(e) => setSelectedFilters({ ...selectedFilters, [item.name]: e })}
                                    {...item}
                                />
                            </div>
                        )
                    } else if (item?.type === 'checkbox') {
                        return (
                            <div key={i} className="flex items-center gap-2">
                                <Input
                                    type="checkbox"
                                    id={item.name}
                                    checked={selectedFilters[item.name] || false}
                                    onChange={(e) => setSelectedFilters({
                                        ...selectedFilters,
                                        [item.name]: e.target.checked
                                    })}
                                    className="w-4 h-4 text-primary-dark-light"
                                />
                                <Label htmlFor={item.name} className="text-primary-dark-light">
                                    {item.label}
                                </Label>
                            </div>
                        )
                    }
                })}
            </Drawer>
        </>


    )
}