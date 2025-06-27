import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getRecent5Years} from "@/lib/dateutils";

interface Props {
  year: number;
  onChange: (year: number) => void;
}

export function YearSelect({year, onChange}: Props) {
  const yearOptions = getRecent5Years();

  return (
    <Select
      defaultValue={String(year)}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="cursor-pointer w-[110px]">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {yearOptions.map((yearOption: number) => (
          <SelectItem
            className="cursor-pointer"
            value={String(yearOption)}
            key={yearOption}
          >
            {yearOption}년
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
