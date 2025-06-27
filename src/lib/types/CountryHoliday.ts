import {HolidayType} from "@/lib/types/HolidayType";

export interface CountryHoliday {
  countryCode: string;
  date: Date;
  localName: string;
  name: string;
  global: boolean;
  launchYear: string | null;
  counties: string[];
  types: HolidayType[];
}
