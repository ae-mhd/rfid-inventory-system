import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";

const CustomDialog = ({ trigger, content, header, description = '', open, close, triggerClasses, headerClasses, interactOutside = true, width = '' }) => {
    return (
        <Dialog
            // width={2000}
            open={open}
            onOpenChange={close}
        // className='min-w-[1000px]'
        >
            <DialogTrigger className={triggerClasses}> {trigger}</DialogTrigger>
            <DialogContent
                className={cn('bg-primary-dark-light w-fit min-w-[400px] overflow-y-auto max-h-[85vh]', width)}
                onInteractOutside={(e) => {
                    !interactOutside && e.preventDefault();
                }}
            >
                <DialogHeader className='mb-6'>
                    <DialogTitle className={`text-3xl mx-auto text-primary-dark-light ${headerClasses}`}>
                        {header}
                    </DialogTitle>
                    <DialogDescription>{description} </DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}


export default CustomDialog