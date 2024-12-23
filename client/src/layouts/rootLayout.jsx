// import { Navbar, Sidebar } from '@/components'
import { SidebarItem } from '@/components/shared/sidebar/SidebarItem';
import { SidebarProvider } from '@/context/sidebarContext';
import { Outlet } from 'react-router-dom'
import { FaChartPie } from "react-icons/fa";
import { Navbar, Sidebar } from '@/components';

const RootLayout = () => {
    const SidebarItems = [
        {
            label: 'المراكز',
            icon: <FaChartPie size={20} />,
            link: '/'
        },
        {
            label: 'الطوابق',
            icon: <FaChartPie size={20} />,
            link: '/floors'
        },
        {
            label: 'الاجنحة',
            icon: <FaChartPie size={20} />,
            link: '/wings'
        },



        // {
        //     label: 'المدفوعات',
        //     icon: <FaMoneyBill1Wave size={20} />,
        //     // link: '/payments',
        //     children: [
        //         {
        //             label: 'طلبات التسوية المالية',
        //             icon: <FaObjectGroup size={20} />,
        //             link: '/financial-settlement-requests',
        //         },
        //         {
        //             label: 'طلبات التسوية المالية المكتملة',
        //             icon: <FaObjectGroup size={20} />,
        //             link: '/completed-financial-settlement-requests',
        //         },
        //     ]

        // },

    ]
    return (
        <main className=' relative h-screen w-screen flex overflow-hidden '>
            <SidebarProvider>
                <Sidebar >
                    {SidebarItems.map((item, index) => <SidebarItem
                        item={item}
                        key={index}
                        link={item.link}
                        icon={item.icon}
                        text={item.label}
                        childrens={item.children}
                    />)}
                </Sidebar>
            </SidebarProvider>
            <div className='relative flex flex-col flex-1 overflow-hidden  '>
                <Navbar />
                <section className=' flex-1 flex flex-col overflow-auto max-h-screen custom-scrollbar bg-secondary-dark-light py-6 px-10' >
                    <Outlet />
                </section>
            </div>
        </main>
    )
}

export default RootLayout