"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getRecent5Years} from "@/lib/dateutils";
import {useRouter} from "next/navigation";

interface Props {
  selectedYear: number;
  countryCode: string;
}

export function YearSelect({selectedYear, countryCode}: Props) {
  const router = useRouter();
  const yearOptions = getRecent5Years();

  const handleYearChange = (year: string) => {
    router.push(`/holidays/${year}/${countryCode}`);
  };

  return (
    <Select
      defaultValue={String(selectedYear)}
      onValueChange={handleYearChange}
    >
      <SelectTrigger className="cursor-pointer w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {yearOptions.map((yearOption: number) => (
          <SelectItem
            className="cursor-pointer"
            value={String(yearOption)}
            key={yearOption}
          >
            {yearOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
