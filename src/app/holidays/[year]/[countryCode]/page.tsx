import {getCountries, getHolidays} from "@/lib/api";
import {HolidayItem} from "@/components/HolidayItem";
import Link from "next/link";
import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {DeleteHolidaysButton} from "@/components/DeleteHolidaysButton";
import {ResyncHolidaysButton} from "@/components/ResyncHolidaysButton";
import {DateSelect} from "@/components/dateselect/DateSelect";
import {CursoredButton} from "@/components/CursoredButton";
import {getAllTypes} from "@/lib/utils";
import {HolidayTypeToggles} from "@/components/HolidayTypeToggles";

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
  const countryCode = params.countryCode;
  const year = Number(params.year);

  const page: number = Number(searchParams.page) || 1;
  const size: number = Number(searchParams.size) || 10;
  const from: number = Number(searchParams.from) || 1;
  const to: number = Number(searchParams.to) || 12;
  const typesParam: string | string[] = searchParams.types ?? getAllTypes();
  const types: string[] = typeof typesParam === "string" ? [typesParam] : typesParam;

  const country = (await getCountries()).find((c) => c.countryCode === countryCode);
  const pageResponse = await getHolidays(year, countryCode, page, size, from, to, types);

  const holidays: CountryHoliday[] = pageResponse.content;
  const totalPages: number = pageResponse.totalPages;

  if (!country) {
    return <p className="text-center py-16">Invalid country code</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold py-5">{country.name} Holidays 🥰</h1>

      <div className="py-4 space-y-2.5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <CursoredButton className="cursor-pointer" variant="secondary">Back to Home</CursoredButton>
          </Link>
          <div className="flex gap-2">
            <DeleteHolidaysButton year={year} countryCode={countryCode}/>
            <ResyncHolidaysButton year={year} countryCode={countryCode}/>
            <DateSelect
              selectedYear={year}
              selectedMonthFrom={from}
              selectedMonthTo={to}
              countryCode={countryCode}
              types={types}
            />
          </div>
        </div>
        <HolidayTypeToggles
          from={from}
          to={to}
          types={types}
        />
      </div>

      <ul className="bg-muted px-4 py-2 rounded-lg shadow divide-y">
        {holidays.length > 0 ? (holidays.map((holiday: CountryHoliday, i: number) => (
          <HolidayItem holiday={holiday} key={i}/>
        ))) : (
          <p className="text-center py-16">데이터가 존재하지 않습니다.<br/>Resync 버튼을 누르면 데이터가 생길지도..?</p>
        )}
      </ul>

      <nav className="flex justify-center py-5 space-x-1">
        {Array.from({length: totalPages}, (_, i) => (
          <Link href={`/holidays/${year}/${countryCode}?page=${i + 1}&size=${size}&from=${from}&to=${to}${types.map((type: string) => `&types=${type}`).join("")}`} key={i}>
            <CursoredButton
              className="text-zinc-600"
              size="sm"
              variant={page === i + 1 ? "secondary" : "ghost"}
            >{i + 1}</CursoredButton>
          </Link>
        ))}
      </nav>
    </>
  );
}
