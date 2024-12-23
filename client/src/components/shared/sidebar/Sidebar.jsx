import { useSidebarContext } from "@/context/sidebarContext"
import { ChevronLast, ChevronFirst } from "lucide-react"
import Logo from '@/assets/images/logo-bk.png'
import { Link } from "react-router-dom"
import useWindowDimensions from "@/hooks/getWindowDimensions"
import { useEffect } from "react"


export default function Sidebar({ children }) {
    const { width } = useWindowDimensions()
    const { expanded, toggleSidebar, setExpanded } = useSidebarContext()
    const isMobile = width < 768
    useEffect(() => {
        isMobile && setExpanded(false)
    }, [width])
    return (
        <aside className="h-full max-h-screen  bg-primary-dark-light">
            <nav className="relative h-full flex flex-col  shadow-sm px-2">
                {!isMobile && <div className="py-4 pb-2 flex-center ">
                    <img
                        src={Logo}
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                            }`}
                        alt="logo"
                    />
                    <button
                        onClick={toggleSidebar}
                        className="absolute left-2 p-1.5 rounded-lg text-primary-dark-light"
                    >
                        {expanded ? <ChevronLast /> : <ChevronFirst />}
                    </button>
                </div>}
                <Link

                    to='/order/new'
                    className={`flex-center  p-2 rounded-md my-3 border border-blue-500 text-primary-dark-light`}
                >
                    <span>+</span>
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 mr-3" : "w-0 h-0"}`}>اضافة طلبية جديدة</span>


                </Link>

                <ul className="flex-1 h-full overflow-y-auto">{children}</ul>


                {/* <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
                          flex justify-between items-center
                          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                      `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div> */}
            </nav>
        </aside>
    )
}

