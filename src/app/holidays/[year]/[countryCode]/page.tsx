import {getCountries, getHolidays} from "@/lib/api";
import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {getAllTypes} from "@/lib/utils";
import HolidayListBody from "@/components/holidaylist/HolidayListBody";
import HolidayListEmpty from "@/components/holidaylist/HolidayListEmpty";
import HolidayListPagination from "@/components/holidaylist/HolidayListPagination";
import HolidayListHeader from "@/components/holidaylist/HolidayListHeader";

interface Props {
  params: {
    year: string;
    countryCode: string;
  };
  searchParams: {
    page?: number;
    size?: number;
    from?: number;
    to?: number;
    types?: string | string[];
  };
}

export default async function CountryHolidaysPage({params, searchParams}: Props) {
  const countryCode = (await params).countryCode;
  const year = Number((await params).year);

  const page: number = Number((await searchParams).page) || 1;
  const size: number = Number((await searchParams).size) || 10;
  const from: number = Number((await searchParams).from) || 1;
  const to: number = Number((await searchParams).to) || 12;
  const typesParam: string | string[] = (await searchParams).types ?? getAllTypes();
  const types: string[] = typeof typesParam === "string" ? [typesParam] : typesParam;

  const country = (await getCountries()).find((c) => c.countryCode === countryCode);
  const pageResponse = await getHolidays(year, countryCode, page, size, from, to, types);

  const holidays: CountryHoliday[] = pageResponse.content;
  const totalPages: number = pageResponse.totalPages;

  if (!country) {
    return <HolidayListEmpty>Invalid country code</HolidayListEmpty>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold py-5">{country.name} Holidays 🥰</h1>
      <HolidayListHeader
        year={year}
        countryCode={countryCode}
        from={from}
        to={to}
        types={types}
      />
      <HolidayListBody holidays={holidays}/>
      <HolidayListPagination
        totalPages={totalPages}
        year={year}
        countryCode={countryCode}
        page={page}
        size={size}
        from={from}
        to={to}
        types={types}
      />
    </>
  );
}
