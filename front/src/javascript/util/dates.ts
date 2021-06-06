import { range } from "./array";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

export const YEARS = range(1900, new Date().getFullYear());
export const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
export const MONTH_DAYS = (month: number, year: number) => new Date(year, month, 0).getDate();
export const DATES_DIFF_YEARS = (year1: Date, year2: Date) =>
  new Date(year1.getTime() - year2.getTime()).getFullYear() - 1970;

export const biggestDateDiff = (date1: Date, date2: Date) => {
  const milisecsDiff = Math.abs(date1.getTime() - date2.getTime());
  if (milisecsDiff < 60000) return null;
  const minsDiff = milisecsDiff / 60000;
  if (minsDiff < 60) return { quantity: Math.round(minsDiff), type: "min" };
  const hoursDiff = minsDiff / 60;
  if (hoursDiff < 24) return { quantity: Math.round(hoursDiff), type: "hour" };
  const daysDiff = hoursDiff / 24;
  if (daysDiff < 30) return { quantity: Math.round(daysDiff), type: "day" };
  const monthsDiff = daysDiff / 30;
  if (monthsDiff < 12) return { quantity: Math.round(monthsDiff), type: "month" };
  return { quantity: Math.round(monthsDiff / 12), type: "year" };
};

export const dateDiffAsString = (date1: Date, date2: Date) => {
  if (!date1 || !date2) return null;
  console.log(date1, date2);
  return formatDistance(date2, date1, { addSuffix: true, locale: es });
};
