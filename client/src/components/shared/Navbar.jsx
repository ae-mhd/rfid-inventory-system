import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom"
import { BsMoonStars } from "react-icons/bs";
import { CiSun } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { RxChevronDown } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5"
import { useThemeContext } from "@/context/ThemeContext";
import { Input } from "../ui/input";
import { CustomDropdown } from "..";
import { useAuthContext } from "@/context/authContext";
const Navbar = () => {

    const { theme, toggleTheme } = useThemeContext()
    const { logOut, user } = useAuthContext()
    const isDark = theme === 'dark'
    const items = [
        {

            label: <Link className="flex-center gap-2 text-primary-dark-light" to='/profile'>
                <span >تعديل الحساب</span>
                <CgProfile size={20} />
            </Link>,
        },
        {
            label: <Link onClick={logOut} className="flex-center gap-2 text-primary-dark-light" to='/login'>
                <span>تسجيل الخروج</span>
                <IoExitOutline className="text-red-500 " size={24} />
            </Link>,
            key: '1',
        },

    ];
    return (
        <div className="h-[60px] px-8 flex items-center justify-end md:justify-between bg-primary-dark-light text-primary-dark-light">
            <Link to='/search' className="max-md:hidden w-full max-w-[360px]">

                <div className=" w-full   flex-center gap-1 rounded-2xl px-2 bg-[#F1F4F9] dark:bg-[#323D4E]">
                    <FiSearch size={30} />
                    <Input className='no-focus bg-transparent border-none w-full ' />
                </div>
            </Link>
            <div className="flex items-center gap-3">
                <div onClick={toggleTheme} className="max-xs:hidden  h-8 w-16 bg-[#F1F4F9] dark:bg-[#323D4E] p-2 cursor-pointer  rounded-2xl flex items-center">
                    <div className={`size-6  flex-center rounded-full transition-all ${isDark ? '-translate-x-6' : 'translate-x-1'}`}>
                        {isDark ? <BsMoonStars /> : <CiSun size={24} />}
                    </div>
                </div>
                <IoMdNotifications className=" cursor-pointer size-6 min-w-6 mx-2" />
                {/* <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" className="size-10 rounded-full" alt="" />
                <CustomDropdown
                    triger={<div className="flex gap-3 items-center">

                        <span className="text-xl text-primary-dark-light ">{user.name}</span>
                        <RxChevronDown size={16} />
                    </div>}

                    items={items}
                /> */}


            </div>
        </div>
    )
}

export default Navbar

