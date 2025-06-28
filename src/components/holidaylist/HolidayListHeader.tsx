import Link from "next/link";
import {CursoredButton} from "@/components/CursoredButton";
import {DeleteHolidaysButton} from "@/components/DeleteHolidaysButton";
import {ResyncHolidaysButton} from "@/components/ResyncHolidaysButton";
import {DateSelect} from "@/components/dateselect/DateSelect";
import {HolidayTypeToggles} from "@/components/HolidayTypeToggles";

interface Props {
  year: number;
  countryCode: string;
  from: number;
  to: number;
  types: string[];
}

export default function HolidayListHeader(
  {
    year,
    countryCode,
    from,
    to,
    types,
  }: Props
) {
  return (
    <div className="py-4 space-y-2.5">
      <div className="flex justify-between items-center">
        <Link href="/">
          <CursoredButton className="cursor-pointer" variant="default">← Home</CursoredButton>
        </Link>
        <div className="flex gap-6">
          <div className="flex gap-2">
            <DeleteHolidaysButton year={year} countryCode={countryCode}/>
            <ResyncHolidaysButton year={year} countryCode={countryCode}/>
          </div>
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
  );
}
