import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ar } from "date-fns/locale";
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaAngleDoubleLeft, } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LuCalendarDays } from "react-icons/lu";
import dateFnsFormat from 'date-fns/format';
import { IoMdCloseCircle } from "react-icons/io";

const CustomDateRangePicker = ({ hasCreatedUpdateFilter, filters, setFilters }) => {
    const [creationStatus, setCreationStatus] = useState(hasCreatedUpdateFilter ? 'updated-at' : 'created-at');
    const [dateFilter, setDateFilter] = useState({});
    // const [isDateChanged, setIsDateChanged] = useState(false);
    const { start, end, updated_at_start, updated_at_end } = filters || {}

    // default calendar value
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const setPredefinedRange = (range) => {
        let startDate, endDate;

        switch (range) {
            case 'today':
                startDate = endDate = new Date();
                break;
            case 'yesterday':
                startDate = endDate = addDays(new Date(), -1);
                break;
            case 'thisWeek':
                startDate = startOfWeek(new Date());
                endDate = endOfWeek(new Date());
                break;
            case 'thisMonth':
                startDate = startOfMonth(new Date());
                endDate = endOfMonth(new Date());
                break;
            case 'thisYear':
                startDate = startOfYear(new Date());
                endDate = endOfYear(new Date());
                break;
            default:
                return;
        }

        setState([{ startDate, endDate, key: 'selection' }]);
    };

    const selectCreationStatusProps = () => {
        if (creationStatus === 'updated-at') {
            setDateFilter({
                updated_at_start: dateFnsFormat(state[0].startDate, 'yyyy-MM-dd'),
                updated_at_end: dateFnsFormat(state[0].endDate, 'yyyy-MM-dd'),
                start: null,
                end: null
            });
        } else {
            setDateFilter({
                start: dateFnsFormat(state[0].startDate, 'yyyy-MM-dd'),
                end: dateFnsFormat(state[0].endDate, 'yyyy-MM-dd'),
                updated_at_start: null,
                updated_at_end: null
            });
        }
    };

    const handleFilterDate = () => {
        setFilters(prev => ({
            ...prev,
            ...dateFilter
        }));
    };

    useEffect(() => {
        selectCreationStatusProps();
    }, [creationStatus, state]);

    useEffect(() => {
        setState([
            {
                startDate: (start && new Date(start)) || (updated_at_start && new Date(updated_at_start)) || new Date(),
                endDate: (end && new Date(end)) || (updated_at_end && new Date(updated_at_end)) || new Date(),
                key: "selection",
            },
        ])

    }, [filters]);
    return (
        <div>
            <Popover >
                <div className="flex-center">
                    {(filters?.start || filters?.updated_at_start) && <div
                        onClick={() => {
                            setFilters((prev) => {
                                const { start, end, updated_at_start, updated_at_end, ...reset } = prev
                                return reset
                            })
                        }}
                        className="border rounded-r-md rounded-l-none border-l-0 h-10 cursor-pointer"><IoMdCloseCircle className="text-red-600 font-extrabold size-8 p-1" /></div>}          <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="max-sm:hidden flex placeholder-bg text-primary-dark-light border p-2 rounded-none rounded-l-md"
                        >
                            {!!filters?.start || !!filters?.updated_at_start ? (
                                <>

                                    <div className="flex-center gap-3 ">
                                        <div >{formatDate(state[0].startDate)}</div>
                                        <FaAngleDoubleLeft className="text-primary-dark-light" />
                                        <div>{formatDate(state[0]?.endDate)}</div>
                                    </div>

                                </>
                            ) : (
                                <div className="flex-center gap-3 ">
                                    <div className=" ">تاريخ البداية</div>
                                    <FaAngleDoubleLeft className="text-primary-dark-light" />
                                    <div>تاريخ النهاية</div>
                                </div>
                            )}
                            <LuCalendarDays className=" h-4 w-4 mx-2" />
                        </Button>
                    </PopoverTrigger>

                </div>


                <PopoverContent
                    className="w-auto p-0 bg-white text-primary-dark-light"
                    align="start"
                >
                    {hasCreatedUpdateFilter && <div className="flex-center gap-2 pt-2 ">
                        <span className="text-center text-black"> الفلترة على حسب:</span>
                        <RadioGroup onValueChange={setCreationStatus} defaultValue="updated-at" className="flex text-black">
                            <div className="flex items-center gap-2 space-x-2">
                                <RadioGroupItem value="created-at" id="created" />
                                <Label htmlFor="created">الإنشاء</Label>
                            </div>
                            <div className="flex gap-2 items-center space-x-2">
                                <RadioGroupItem value="updated-at" id="updated" />
                                <Label htmlFor="updated">آخر تعديل</Label>
                            </div>
                        </RadioGroup>
                    </div>}

                    <div className="p-2">
                        <label className="block text-black mb-2">تحديد المدة:</label>
                        <select onChange={(e) => setPredefinedRange(e.target.value)} className="w-full mb-4 p-2 border text-black rounded">
                            <option className="hover:bg-blue-600 cursor-pointer" value="">اختر فترة</option>
                            <option value="today">اليوم</option>
                            <option value="yesterday">أمس</option>
                            <option value="thisWeek">هذا الأسبوع</option>
                            <option value="thisMonth">هذا الشهر</option>
                            <option value="thisYear">هذه السنة</option>
                        </select>
                    </div>

                    <DateRange
                        editableDateInputs={false}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        showSelectionPreview={true}
                        ranges={state}
                        locale={ar}
                        startDatePlaceholder="تاريخ البداية"
                        endDatePlaceholder="تاريخ النهاية"
                    />

                    <div>
                        <Button
                            className="btn w-full text-white text-xl font-light"
                            onClick={handleFilterDate}
                        >
                            تطبيق الفلتر
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CustomDateRangePicker;
