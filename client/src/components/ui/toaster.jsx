import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, title, description, variant, action, ...props }) {
        return (
          (<Toast key={id} {...props}

            className={`min-h-20 items-start border-2  border-e-[10px] ${variant === "destructive" ? "border-[#FF355B]" : "border-[#47D764]"} bg-white p-2 pt-2 pe-8`}

          >
            <div className="flex-center gap-3  mt-3">
              <div className=" col-span-1 place-self-center">
                {variant === "default" && (
                  <FaCheckCircle size={40} className="text-[#47D764]" />
                )}
                {variant === "destructive" && (
                  <IoMdCloseCircle size={40} className="text-[#FF355B]" />
                )}
              </div>
              <div className=" w-full">
                {title && (
                  <ToastTitle className="h3-bold mb-2 ">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className=" flex-center text-xl">
                    <div className="">

                      {description}
                    </div>
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>)
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
