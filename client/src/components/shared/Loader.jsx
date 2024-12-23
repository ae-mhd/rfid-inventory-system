import { cn } from '@/lib/utils'
import { ImSpinner6 } from 'react-icons/im'

const Loader = ({ className }) => {
    return (
        <ImSpinner6
            // className={`m-auto animate-spin ${color} size-${size}`}
            className={cn('m-auto animate-spin text-primary-dark-light size-10', className)}
        />
    )
}

export default Loader