import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string({
        required_error: "هذا الحقل مطلوب",
    }).min(1, { message: "هذا الحقل مطلوب" }),
    page_name: z.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    email: z.string({ required_error: "هذا الحقل مطلوب", }).email({ message: 'إميل غير صالح' }),
    page_activity: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    phone_2: z.string().optional(),
    order_number: z.string().optional(),
    password: z.string({ required_error: "هذا الحقل مطلوب", }).min(10, { message: "يجب أن تتكون كلمة المرور الخاصة بك من 10 أحرف على الأقل" }),

});
export const LoginSchema = z.object({
    email: z.string().min(1, { message: "يجب إدخال بريد إلكتروني أو رقم هاتف" }),
    password: z.string().min(1, { message: "الرقم السري مطلوب" })
    // .min(8, { message: 'Password must be at least 8 charachters' }),
})
export const VerificationSchema = z.object({
    code: z.string().min(1, { message: "يجب إدخال رمز التحقق" }),
    // .min(8, { message: 'Password must be at least 8 charachters' }),
})
export const NewStoreSchema = z.object({
    name: z.string().min(1, { message: "اسم المتجر مطلوب" }),
    description: z.string().optional().nullish(),
    phone: z.string().optional().nullish(),
    coordinates: z.string().optional().nullish(),
    website: z.string().optional(),
    // website: z.string().optional().url({ message: "يرجى إدخال عنوان ويب صالح، مثل: https://www.website.com" }),
    categories: z.array(z.object({ label: z.string(), value: z.string() })).optional(),

})
export const NewCenterSchema = z.object({
    name: z.string().min(1, { message: "اسم المركز مطلوب" }),
})
export const NewFloorSchema = z.object({
    name: z.string().min(1, { message: "اسم المركز مطلوب" }),
    center: z.string().min(1, { message: " المركز مطلوب" }),
    floorNumber: z.coerce.number().min(0, { message: 'رقم الطابق مطلوب' }),
    code: z.string().min(1, { message: " الرمز مطلوب" }),

})
export const NewWingSchema = z.object({
    name: z.string().min(1, { message: "اسم المركز مطلوب" }),
    floor: z.string().min(1, { message: " المركز مطلوب" }),
    wingNumber: z.coerce.number().min(0, { message: 'رقم الطابق مطلوب' }),
    code: z.string().min(1, { message: " الرمز مطلوب" }),

})



export const NewOrderSchema = z.object({
    items: z.array(z.object({
        product_id: z.string({ required_error: 'يجب إختيار منتج واحد على الاقل' }).min(1, { message: "يجب إختيار منتج واحد على الاقل" }),
        product_name: z.string({ required_error: 'يجب إختيار م��تج واحد على الاقل' }).min(1, { message: "يجب إختيار منتج واحد على الاقل" }),
        quantity: z.coerce.number({ required_error: 'الكمية يجب أن تكون على الاقل منتج واحد' }).min(1, 'الكمية يجب أن تكون على الاقل منتج واحد'),
        subtotal: z.coerce.number({ required_error: 'هذا الحقل مطلوب' }).min(1, 'هذا الحقل مطلوب'),
    })).min(1, { message: "يجب إضافة منتج واحد على الاقل" }),
    firstname: z.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    lastname: z.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    phone: z.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    address: z.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    from_state_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    from_city_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    to_state_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    to_city_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    to_subcity_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    is_stopdesk: z.boolean(),
    priority_status_code: z.boolean(),
    stopdesk_id: z.coerce.string().optional(),
    // is_freeshipping: z.boolean(),
    store_id: z.coerce.string({ required_error: "هذا الحقل مطلوب", }).min(1, { message: "هذا الحقل مطلوب" }),
    total_amount: z.coerce.number(),
    // ===============================//
    shipping_status_code: z.enum(["paid", "free", "shared"], {
        required_error: "يجب عليك إختيار طريقة الشحن",
    }),
    store_shared_amount: z.coerce.number().optional()


}).refine(data => {
    if (data.is_stopdesk && !data.stopdesk_id) {
        return false;
    }
    return true;
}, {
    message: "هذا الحقل مطلوب",
    path: ['stopdesk_id',],
}).refine(data => {
    if (data.shipping_type === 'shared_shipping' && (data.shared_shepping_amount === undefined || data.shared_shepping_amount <= 0)) {
        return false;
    }
    return true;
}, {
    message: "يجب  أن يكون  مبلغ الشحن المشترك أكبر من 0 دل",
    path: ['shared_shepping_amount']
});

