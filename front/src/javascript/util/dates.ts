import { range } from "./array";

export const YEARS = range(1900, new Date().getFullYear());
export const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export const MONTH_DAYS = (month: number, year: number) => new Date(year, month, 0).getDate();
export const DATES_DIFF_YEARS = (year1: Date, year2: Date) => new Date(year1.getTime() - year2.getTime()).getFullYear() - 1970;