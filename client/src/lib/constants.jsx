import { DeletePopover } from "@/components";
import { RiEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { formatDateToArabic, formatedCurrency, } from "./utils";
import { BsPrinter } from "react-icons/bs";
import { TiFlash } from "react-icons/ti";

export const NODataIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 96 120"
        enableBackground="new 0 0 96 96"
        xmlSpace="preserve"
        className="w-16 h-16 fill-current text-primary-dark-light" // Tailwind CSS classes
    >
        <g>
            <polygon className="fill-current text-primary-dark-light" points="92.662,64.486 73.232,47 22.768,47 3.338,64.486 0.662,61.514 21.232,43 74.768,43 95.338,61.514" />
        </g>
        <g>
            <path className="fill-current text-primary-dark-light" d="M90,96H6c-3.309,0-6-2.691-6-6V61h32v2c0,4.963,4.037,9,9,9h14c4.963,0,9-4.037,9-9v-2h32v29C96,93.309,93.309,96,90,96z M4,65v25c0,1.103,0.897,2,2,2h84c1.103,0,2-0.897,2-2V65H67.847C66.882,71.223,61.488,76,55,76H41c-6.488,0-11.882-4.777-12.847-11H4z" />
        </g>
        <g>
            <rect x="23.981" y="20.5" transform="matrix(0.5369 0.8437 -0.8437 0.5369 33.1077 -15.3114)" className="fill-current text-primary-dark-light" width="13.038" height="4" />
        </g>
        <g>
            <rect x="64.5" y="15.981" transform="matrix(0.8437 0.5368 -0.5368 0.8437 22.4731 -32.1821)" className="fill-current text-primary-dark-light" width="4" height="13.038" />
        </g>
        <g>
            <rect x="46" y="14" className="fill-current text-primary-dark-light" width="4" height="13" />
        </g>
    </svg>
);


export const initialNewOrderValues = {
    items: [{ product_id: '', quantity: 1, subtotal: 0, product_name: '' }],
    firstname: '',
    lastname: '.',
    phone: '',
    address: '',
    from_state_id: '',
    from_city_id: '',
    to_state_id: '',
    to_city_id: '',
    to_subcity_id: '',
    stopdesk_id: undefined,
    is_stopdesk: false,
    // stopdesk_id: '',
    shipping_status_code: 'paid',
    store_shared_amount: 0,
    store_id: '',
    total_amount: 0,
    // shipping_type: 'paid_shipping',
    from_stopdesk_id: '',
    priority_status_code: false
}




export const ordersColumns = (filters, getOrders) => {
    return [

        {
            accessorKey: "track_id",
            header: "ID",
            cell: ({ row }) => {
                const original = row.original
                // console.log('original', original)
                return <Link to={`/orders/${original.id}`}>
                    <div >
                        <span>{original.track_id}</span>
                        <div className="flex gap-2 ">
                            {original.priority_status_code === "urgent" && <div className="size-6  bg-yellow-400 rounded-full flex-center"><TiFlash className="size-4 text-white" /> </div>}
                            {original.stopdesk_id && <div className="size-6  bg-purple-600 rounded-full flex-center "><span className="text-xs font-semibold text-white pt-1" >SD</span> </div>}
                        </div>
                    </div>
                </Link>
            }

        },

        {
            accessorKey: "items",
            header: 'المنتج',
            cell: ({ row }) => {
                const products = row.getValue("items")
                return <Link to={`/orders/${row.original.id}`} className="text-right font-medium">
                    {products.map((product, index) => <p key={index}>{products.length > 1 && '-'} {product['product_name']} </p>)}
                </Link>
            },
        },
        {
            accessorKey: "firstname",
            header: "اسم الزبون",
            cell: ({ row }) => {
                return <Link to={`/orders/${row.original.id}`}> {row.original.firstname} </Link>
            }
        },
        {
            accessorKey: "to_state_name",
            // header: "بلدية / ولاية	",
            header: 'الوجهة',
            cell: ({ row }) => <Link to={`/orders/${row.original.id}`}>
                <div className="flex flex-col gap-1">
                    <span>{row.original.to_state_name}</span>
                    <span>{row.original.to_city_name}, {row.original.to_subcity_name}</span>
                </div>
            </Link>

        },

        {
            accessorKey: "paid_amount",

            header: () => <div>السعر الكلي</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("paid_amount"))
                return <Link to={`/orders/${row.original.id}`}>{formatedCurrency(amount)} </Link>

            },

        },
        {
            accessorKey: "deliveryStatus",
            size: 200,

            enableResizing: true,
            header: 'الحالة',
            cell: ({ row }) => {
                const original = row.original
                const status = original.deliveryStatus
                return <Link to={`/orders/${original.id}`}

                    style={{ background: status?.background_color }}
                    className={`flex-center p-1 rounded-md text-white text-center `}>
                    <p >{status?.name_ar}</p>

                </Link>

            },
        },
        {
            accessorKey: "created_at",
            header: "تاريخ الانشاء",
            cell: ({ row }) => formatDateToArabic(new Date(row.getValue('created_at')))

        },
        {
            accessorKey: "uuid",
            sticky: true,
            header: 'إجراء',
            cell: ({ row }) => {
                const orderId = row.original.id
                const status = row.getValue('deliveryStatus')?.code

                return <div className="flex-center gap-3">
                    {
                        status === 'PREPARING' && (<>
                            <DeletePopover
                                deleteApi={'/orders/delete' + orderId}
                                filters={filters}
                                successMessage='تمت إزالة الطلبية بنجاح' deleteMessage='هل انت متأكد من حذف الطلبية'
                                updateData={() => getOrders(filters)}
                            />

                            <Link to={`/order/edit/${orderId}`}   >
                                <RiEditFill className="size-6 cursor-pointer text-green-600" />
                            </Link>
                        </>)
                    }
                    <Link to={`/voucher/${orderId}`}
                        target="_blank" rel="noopener noreferrer"
                    >
                        <BsPrinter className="size-6 text-primary-dark-light" />
                    </Link>

                </div>

            },
        },


    ]
}


export const pickupRequestsColumns = (filters, getData) => {

    const formatedTypes = pickupTypes.filter(type => type.value !== 'pickup_stock_products')


    return [
        {
            accessorKey: "number",
            header: 'الرقم',
            cell: ({ row }) => row.index + 1,
            size: 30,
        },
        {
            accessorKey: "store_name",
            header: 'المتجر',

        },
        {
            accessorKey: "type",
            header: "نوع الطلب",
            cell: ({ row }) => {
                const pickupType = formatedTypes.find(type => type.value === row.getValue('type'))
                return pickupType ? pickupType.label : 'غير معروف'
            }
        },
        {
            accessorKey: "is_confirmed",
            header: "تم الموافقة",
            cell: ({ row }) => row.getValue('is_confirmed') ? 'نعم' : 'لا'
        },
        {
            accessorKey: "created_at",
            header: "تاريخ الانشاء",
            cell: ({ row }) => formatDateToArabic(new Date(row.getValue('created_at')))

        },
        {
            accessorKey: "uuid",
            sticky: true,
            header: 'إجراء',
            size: 30,
            cell: ({ row }) => {
                const original = row.original

                const is_confirmed = original?.is_confirmed
                const requestId = original.id
                const isPickupOrdersRequest = row.getValue('type') === 'pickup_ready_orders'
                return <div className="flex-center gap-3">
                    <DeletePopover
                        deleteApi={'/order-pickup-requests/delete/' + requestId}
                        filters={filters}
                        row={row}
                        updateData={() => getData(filters)}
                    />
                    {isPickupOrdersRequest && !is_confirmed && <Link to={`/order-pickup-requests/edit/${requestId}`} >
                        <RiEditFill className="size-6 cursor-pointer text-green-600" />
                    </Link>}
                </div>

            },
        },

    ]
}







export const monthNames = [
    'جانفي',
    'فيفري',
    'مارس',
    'أفريل',
    'ماي',
    'جوان',
    'جويلية',
    'أوت',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
];


export const pickupTypes = [
    { label: "طلب تجميع طلبيات", value: "pickup_ready_orders" },
    { label: "طلب مخزون", value: "pickup_stock_products" },
    { label: "طلب إعادة الطلبيات", value: "pickup_return_orders" },
    { label: "طلبات التسوية المالية", value: "pickup_financial_settlement" },
];
export const getAllItems = {
    pagination: {
        per_page: 9999,
        current_page: 1
    }
}
export const initialFilter = {
    pagination: {
        per_page: 20,
        current_page: 1
    }
}

export const requestStaticInfo = {
    'pickup_ready_orders': {
        title: 'طلبات التجميع',
        listItemsTitle: 'الطلبيات المختارة',

    },
    'pickup_stock_products': {
        title: 'طلبات تسليم مخزون',
        listItemsTitle: 'المنتجات المختارة',
    },
    'pickup_return_orders': {
        title: "طلبات إرجاع الطلبيات",
    },
    'pickup_financial_settlement': {
        title: "طلبات التسوية المالية",
    },
}
export const completedRequestsStaticInfo = {
    'pickup_ready_orders': {
        title: 'طلبات التجميع المكتملة',

    },
    'pickup_stock_products': {
        title: 'طلبات تسليم مخزون المكتملة',
    },
    'pickup_return_orders': {
        title: "طلبات إرجاع الطلبيات المكتملة",
    },
    'pickup_financial_settlement': {
        title: "طلبات التسوية المالية المكتملة",
    },
}

export const responsiveOrderCarousel = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1600 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 1600, min: 1300 },
        items: 6
    },
    largeDesktop: {
        breakpoint: { max: 1300, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 620 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 620, min: 0 },
        items: 2
    }
};