import {
    Popover,
    PopoverContent,
    PopoverTrigger,

} from "@/components/ui/popover"

const CustomPopover = ({ trigger, content, close, open }) => {
    return (
        <Popover modal={true} open={open} onOpenChange={close}>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent className='placeholder-bg shadow-md '>{content} </PopoverContent>
        </Popover>
    )
}

export default CustomPopover

// if (controled) {
//     return (
//         <Popover open={open} onOpenChange={close}>
//             <PopoverTrigger asChild>
//                 {trigger}

//             </PopoverTrigger>
//             <PopoverContent

//                 className="placeholder-bg shadow-md ">
//                 {content}
//             </PopoverContent>
//         </Popover>
//     )
// }
// return (
//     <Popover >
//         <PopoverTrigger asChild>
//             {trigger}

//         </PopoverTrigger>
//         <PopoverContent

//             className="placeholder-bg shadow-md ">
//             {content}
//         </PopoverContent>
//     </Popover>
// )