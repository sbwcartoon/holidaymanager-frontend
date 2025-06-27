import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {HolidayType} from "@/lib/types/HolidayType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAllTypes(): string[] {
  return Object.values(HolidayType).map((type: string) => type);
}
