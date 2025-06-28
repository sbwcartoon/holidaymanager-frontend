import {CountryHoliday} from "@/lib/types/CountryHoliday";

interface Props {
  holiday: CountryHoliday;
}

export const HolidayItem = ({holiday}: Props) => {
  const {date, localName, name, counties, types} = holiday;

  return (
    <li className="grid grid-cols-5 gap-8 py-2.5 text-zinc-800 text-sm">
      <span className="flex items-center font-bold">{date}</span>
      <span className="flex items-center font-bold">{localName}</span>
      <span className="flex items-center">{name}</span>
      <span className="flex items-center text-muted-foreground text-xs italic">{counties.length > 0 ? counties.join(", ") : "Nationwide"}</span>
      <span className="flex items-center text-muted-foreground text-xs italic">{types.join(", ")}</span>
    </li>
  )
};
