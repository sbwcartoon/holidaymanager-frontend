import {CountryHoliday} from "@/lib/types/CountryHoliday";

interface Props {
  holiday: CountryHoliday;
}

export const HolidayItem = ({holiday}: Props) => {
  const {date, localName, name, launchYear, counties, types} = holiday;

  return (
    <li className="grid grid-cols-6 gap-4 py-2.5 text-zinc-800 text-sm">
      <span className="font-bold">{date}</span>
      <span>{localName}</span>
      <span>{name}</span>
      <span>{launchYear ?? "-"}</span>
      <span>{counties.length > 0 ? counties.join(", ") : "-"}</span>
      <span>{types.join(", ")}</span>
    </li>
  )
};
