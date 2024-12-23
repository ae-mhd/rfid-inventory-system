import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const CustomDropdown = ({ triger, items, label }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="no-focus">{triger}</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-primary-dark-light shadow-md dark:border-[1px]'>
                {label && <><DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator /></>}
                {items.map((item, index) => (<DropdownMenuItem key={index}>
                    {item.label}

                </DropdownMenuItem>))}
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default CustomDropdown