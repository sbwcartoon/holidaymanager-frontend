import {getCountries, getHolidays} from "@/lib/api";
import {HolidayItem} from "@/components/HolidayItem";
import Link from "next/link";
import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {DeleteHolidaysButton} from "@/components/DeleteHolidaysButton";
import {ResyncHolidaysButton} from "@/components/ResyncHolidaysButton";
import {YearSelect} from "@/components/YearSelect";
import {CursoredButton} from "@/components/CursoredButton";

interface Props {
  params: {
    year: string,
    countryCode: string
  };
}

export default async function CountryHolidaysPage({params}: Props) {
  const countryCode = params.countryCode;
  const year = Number(params.year);

  const country = getCountries().find((c) => c.countryCode === countryCode);
  const holidays = await getHolidays(year, countryCode);

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
          <YearSelect
            selectedYear={year}
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
    </>
  );
}
