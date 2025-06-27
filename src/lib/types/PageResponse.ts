import {CountryHoliday} from "@/lib/types/CountryHoliday";

export interface PageResponse {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  content: CountryHoliday[];
}
