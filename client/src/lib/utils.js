import { pdf } from "@react-pdf/renderer";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { monthNames } from "@/lib/constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const mapTransform = (data) => data?.map((item) => ({
  label: item.name,
  value: item._id
}))
export const uuidMapTransform = (data) => data?.map((item) => ({
  label: item.name,
  value: item.uuid
}))
export const formatedCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + 'د.ل';
}

export const svgToDataURL = (svgElement) => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
};








export const generatePdfDocument = async (document, documentName = 'file.pdf') => {
  const blob = await pdf((
    document
  )).toBlob();
  saveAs(blob, documentName);
};


export function getStatusInArabic(statusCode) {
  switch (statusCode) {
    case 'CREATED':
      return 'تم الإنشاء';
    case 'PICK_UP_REQUESTED':
      return 'طلب الاستلام';
    case 'IN_PROCESS':
      return 'تحت المعالجة';
    case 'WAITING_TRANSIT':
      return 'بانتظار النقل';
    case 'IN_TRANSIT_TO_BE_SHIPPED':
      return 'في النقل ليتم شحنها';
    case 'IN_TRANSIT_TO_BE_RETURNED':
      return 'في النقل ليتم إعادتها';
    case 'PENDING':
      return 'معلق';
    case 'OUT_OF_STOCK':
      return 'نفدت الكمية';
    case 'READY_TO_SHIP':
      return 'جاهز للشحن';
    case 'ASSIGNED':
      return 'مخصص';
    case 'SHIPPED':
      return 'مشحونة';
    case 'ALERTED':
      return 'تم التنبيه';
    case 'DELIVERED':
      return 'تم التوصيل';
    case 'POSTPONED':
      return 'مؤجل';
    case 'ABORTED':
      return 'تم إيقافها';
    case 'READY_TO_RETURN':
      return 'جاهز للإرجاع';
    case 'TAKEN_BY_STORE':
      return 'تم استلامها من قبل المتجر';
    case 'NOT_RECEIVED':
      return 'لم تُستلم';
    case 'PREPARING':
      return 'جارٍ التحضير';
    default:
      return 'الحالة غير معروفة'; // Default case if status is unknown
  }
}


const arabicMonths = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];
export function formatDateToArabic(date) {
  // Format the day and year
  const dayYearFormat = format(date, 'dd yyyy');

  // Get the month as a number (0-11)
  const monthIndex = format(date, 'M') - 1;

  // Format the time
  const timeFormat = format(date, 'hh:mm aa');

  // Convert AM/PM to Arabic (optional)
  const arabicTime = timeFormat.replace('AM', 'ص').replace('PM', 'م');

  // Combine everything together
  return `${dayYearFormat.split(' ')[0]} ${arabicMonths[monthIndex]} ${dayYearFormat.split(' ')[1]}، ${arabicTime}`;
}

// format to display date 
export const formatDate = (date, hastime = false) => {
  const day = date.getDate();

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toTimeString().split(' ')[0];

  return hastime ? `${day} ${month} ${year} ${time}` : `${day} ${month} ${year} `;
};

export function formatNumber(num) {
  num = typeof num === 'string' ? parseFloat(num) : num; // Parse num to number if it's a string
  return num % 1 === 0 ? num?.toFixed(0) : num?.toFixed(2);
}