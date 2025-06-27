import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
  to: number;
  onChange: (year: number) => void;
}

export function ToMonthSelect({to, onChange}: Props) {
  return (
    <Select
      defaultValue={String(to)}
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
            {month}월까지
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
