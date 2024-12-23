import { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi';
import { TbTrashXFilled } from 'react-icons/tb';
import { CustomAutocomplete, CustomDateRangePicker, SearchInput } from '..';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
const SideFilterDrawer = ({ filters, setFilters, hasDatePiker, resetFilter, leftOptions, rightOptions, selectFilterProps, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => setIsOpen(!isOpen)
    const [selectedFilters, setSelectedFilters] = useState({});
    const searchInputFilter = selectFilterProps.find(
        (filter) => filter.type === 'searchInput'
    );

    useEffect(() => {
        setSelectedFilters(filters)
    }, [filters])
    return (
        <>
            <div className="flex-between flex-wrap mb-3">
                <div className="flex-center gap-4 text-primary-dark-light">
                    <div
                        onClick={toggleDrawer}

                        className="bg-transparent my-4">
                        <FiFilter className=" text-primary-dark-light size-8 cursor-pointer" />
                    </div>

                    {searchInputFilter && <div className='max-lg:hidden'>
                        <SearchInput
                            {...searchInputFilter}
                        />
                    </div>}
                    {rightOptions}
                    <TbTrashXFilled className="hidden md:block text-red-500 size-6 cursor-pointer" onClick={resetFilter} />
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
                                value={selectedFilters[item.name] && selectedFilters[item.name]}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, [item.name]: e.target.value })}
                                className="max-w-sm text-primary-dark-light placeholder-bg ring-transparent border-transparent"

                            />
                        )
                    } else if (item?.type === 'autocomplete') {
                        return (
                            <div key={i}
                                className="flex-start items-center max-sm:w-full min-w-36 gap-2 my-2 text-primary-dark-light">
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
                                        [item.name]: item?.isBoolean ? e.target.checked : e.target.checked === true ? 1 : 0
                                        // [item.name]: e.target.checked
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

export default SideFilterDrawer