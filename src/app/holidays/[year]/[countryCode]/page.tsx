import {getCountries, getHolidays} from "@/lib/api";
import {HolidayItem} from "@/components/HolidayItem";
import Link from "next/link";
import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {DeleteHolidaysButton} from "@/components/DeleteHolidaysButton";
import {ResyncHolidaysButton} from "@/components/ResyncHolidaysButton";
import {DateSelect} from "@/components/dateselect/DateSelect";
import {CursoredButton} from "@/components/CursoredButton";

interface Props {
  params: {
    year: string;
    countryCode: string;
  };
  searchParams: {
    page?: string;
    size?: string;
    from?: string;
    to?: string;
  };
}

export default async function CountryHolidaysPage({params, searchParams}: Props) {
  const countryCode = params.countryCode;
  const year = Number(params.year);

  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 10;
  const from = Number(searchParams.from) || 1;
  const to = Number(searchParams.to) || 12;

  const country = (await getCountries()).find((c) => c.countryCode === countryCode);
  const pageResponse = await getHolidays(year, countryCode, page, size, from, to);

  const holidays: CountryHoliday[] = pageResponse.content;
  const totalPages: number = pageResponse.totalPages;

  if (!country) {
    return <p className="text-center py-16">Invalid country code</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold py-5">{country.name} Holidays 🥰</h1>

      <div className="flex justify-between items-center py-3">
        <Link href="/">
          <CursoredButton className="cursor-pointer" variant="secondary">Back to Home</CursoredButton>
        </Link>
        <div className="flex gap-2">
          {holidays.length > 0 ? <DeleteHolidaysButton year={year} countryCode={countryCode}/> : null}
          <ResyncHolidaysButton year={year} countryCode={countryCode}/>
          <DateSelect
            selectedYear={year}
            selectedMonthFrom={from}
            selectedMonthTo={to}
            countryCode={countryCode}
          />
        </div>
      </div>

      <ul className="bg-muted p-4 rounded-lg shadow divide-y">
        {holidays.length > 0 ? (holidays.map((holiday: CountryHoliday, i: number) => (
          <HolidayItem holiday={holiday} key={i}/>
        ))) : (
          <p className="text-center py-16">데이터가 존재하지 않습니다.<br/>Resync 버튼을 누르면 데이터가 생길지도..?</p>
        )}
      </ul>

      <nav className="flex justify-center py-5 space-x-1">
        {Array.from({length: totalPages}, (_, i) => (
          <Link href={`/holidays/${year}/${countryCode}?page=${i + 1}&size=${size}&from=${from}&to=${to}`} key={i}>
            <CursoredButton
              size="sm"
              variant={page === i + 1 ? "secondary" : "ghost"}
            >{i + 1}</CursoredButton>
          </Link>
        ))}
      </nav>
    </>
  );
}
