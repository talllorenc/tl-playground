import { format, parseISO, isValid } from "date-fns";
import { ru } from "date-fns/locale";

type DateVariant = "day" | "month" | "year" | "dayMonth" | "monthYear" | "full";

const DATE_FORMATS: Record<DateVariant, string> = {
    day: "d",
    month: "LLLL",
    year: "yyyy",
    dayMonth: "d MMMM",
    monthYear: "LLLL yyyy",
    full: "d MMMM yyyy",
};

export function formatDate(
    date: string,
    variant: DateVariant = "full",
    fallback = "Дата не указана",
): string {
    if (!date) return fallback;

    const parsed = parseISO(date);
    if (!isValid(parsed)) return fallback;

    return format(parsed, DATE_FORMATS[variant], { locale: ru });
}
