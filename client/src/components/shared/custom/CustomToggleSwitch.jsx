import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const CustomToggleSwitch = ({ onChange, label, defaultValue = false }) => {
    const [isChecked, setIsChecked] = useState(defaultValue)

    const handleCheckboxChange = () => {
        setIsChecked(prev => !prev)
        onChange && onChange(!isChecked)
    }
    return <div className='flex-center'>
        <div className='flex w-fit cursor-pointer select-none items-center placeholder-bg h-fit p-2 rounded-md'>
            <p className='text-primary-dark-light text-base mx-3'>{label}: </p>

            <div className='relative' onClick={handleCheckboxChange}>
                <Input
                    type='checkbox'
                    checked={isChecked}
                    // onChange={handleCheckboxChange}
                    className='sr-only'
                />
                <div className=' h-7 w-20 rounded-full bg-[#c6cddb5e]'></div>
                <div
                    className={cn('dot absolute left-1 top-1 flex size-fit items-center justify-center rounded-full flex-center bg-white transition-all', isChecked ? 'translate-x-1' : 'translate-x-12')}
                >
                    {
                        isChecked ?
                            <FaCheckCircle className='text-green-500 size-5 bg' />
                            : <FaTimesCircle className='text-red-500 size-5 bg' />

                    }
                </div>
            </div>
        </div>
    </div>
}

export default CustomToggleSwitch