import { NavLink } from "react-router-dom"
import { useSidebarContext } from "@/context/sidebarContext"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
export function SidebarItem({ item }) {
    const { link, icon, label, children } = item
    const hasChildren = children?.length > 0
    const { expanded } = useSidebarContext()
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            {children ?
                <div className="flex flex-col">
                    <Collapsible open={isOpen}
                        onOpenChange={setIsOpen}>
                        <CollapsibleTrigger >
                            <h3 className="relative h-10 flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all group text-primary-dark-light elemen-hover_dark-light  ">
                                {icon}
                                <span
                                    className={`overflow-hidden transition-all text-start text-base ${expanded ? "w-52 mr-3" : "w-0"}`}
                                >
                                    {label}
                                </span>
                                {children?.length > 0 && isOpen ? <ChevronUp className={`${!expanded && 'hidden'}`} /> : <ChevronDown className={`${!expanded && 'hidden'}`} />}
                            </h3>

                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-[#d8d5d354] dark:bg-[#323D4E] rounded-lg " >
                            {children && children.map((childrenItem, index) => {
                                return <SidebarItemContent
                                    hasChildren={hasChildren}
                                    key={index}
                                    isChild={children?.length > 0}
                                    expanded={expanded}
                                    link={childrenItem?.link}
                                    icon={childrenItem?.icon}
                                    label={childrenItem?.label}
                                />
                            })
                            }
                        </CollapsibleContent>
                    </Collapsible>
                </div> :
                <SidebarItemContent
                    expanded={expanded}
                    link={link}
                    icon={icon}
                    label={label}
                    isChild={children?.length > 0}
                    hasChildren={hasChildren}

                />

            }

        </>
    )
}

const SidebarItemContent = ({ link, icon, expanded, label, onClick, hasChildren, isChild }) => {

    return (<NavLink
        onClick={onClick ?? null}
        to={link}
        className={({ isActive }) => `relative h-10 last:mb-4 flex items-center py-2  px-3 my-1 text-primary-dark-light
         rounded-md cursor-pointer ${hasChildren ? expanded && 'ps-8' : ''}
         group elemen-hover_dark-light 
        ${isActive && `!text-white bg-primary hover:!bg-primary `} `}
    >
        {icon}
        <span
            className={` overflow-hidden transition-all text-start ${isChild && 'text-sm'} ${expanded ? "w-52 mr-3" : "w-0"}`}
        >
            {label}
        </span>



        {/* {alert && (
<div
    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
        }`}
/>
)} */}

        {!expanded && (
            <div
                className={`absolute right-full rounded-md px-2 py-1 mr-2
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
`}
            >
                {label}
            </div>
        )}
    </NavLink>
    )
}