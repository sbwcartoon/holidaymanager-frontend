import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
  from: number;
  onChange: (year: number) => void;
}

export function FromMonthSelect({from, onChange}: Props) {
  return (
    <Select
      value={String(from)}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="cursor-pointer w-[110px]">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {Array.from({length: 12}, (_, i) => i + 1).map((month: number) => (
          <SelectItem
            className="cursor-pointer"
            value={String(month)}
            key={month}
          >
            {month}월부터
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
