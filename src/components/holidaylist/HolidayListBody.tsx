import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {HolidayItem} from "@/components/holidaylist/HolidayItem";
import HolidayListEmpty from "@/components/holidaylist/HolidayListEmpty";

interface Props {
  holidays: CountryHoliday[];
}

export default function HolidayListBody({holidays}: Props) {
  return (
    <ul className="bg-white px-4 py-2 border border-zinc-300 rounded-lg shadow divide-y">
      {holidays.length > 0 ? (
        <li className="grid grid-cols-5 gap-8 py-2.5 text-zinc-800 text-sm border-b border-zinc-300">
          <span className="font-medium">Date</span>
          <span className="font-medium">Local Name</span>
          <span className="font-medium">Name</span>
          <span className="font-medium">Counties</span>
          <span className="font-medium">Types</span>
        </li>
      ) : null}

      {holidays.length > 0 ? (holidays.map((holiday: CountryHoliday, i: number) => (
        <HolidayItem holiday={holiday} key={i}/>
      ))) : (
        <HolidayListEmpty>
          데이터가 존재하지 않습니다.<br/>↻ Resync 버튼을 누르면 데이터가 생길지도..?
        </HolidayListEmpty>
      )}
    </ul>
  );
}
