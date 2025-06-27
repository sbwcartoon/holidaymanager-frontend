"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {YearSelect} from "@/components/dateselect/YearSelect";
import {FromMonthSelect} from "@/components/dateselect/FromMonthSelect";
import {ToMonthSelect} from "@/components/dateselect/ToMonthSelect";

interface Props {
  selectedYear: number;
  selectedMonthFrom: number;
  selectedMonthTo: number;
  countryCode: string;
}

export function DateSelect({selectedYear, selectedMonthFrom, selectedMonthTo, countryCode}: Props) {
  const router = useRouter();

  const [year, setYear] = useState<number>(selectedYear);
  const [from, setFrom] = useState<number>(selectedMonthFrom);
  const [to, setTo] = useState<number>(selectedMonthTo);

  const handleYearChange = (year: number) => {
    setYear(year);
    handleChange(year, from, to);
  };

  const handleFromChange = (from: number) => {
    setFrom(from);
    handleChange(year, from, to);
  };

  const handleToChange = (to: number) => {
    setTo(to);
    handleChange(year, from, to);
  };

  const handleChange = (year: number, from: number, to: number) => {
    const params = new URLSearchParams({
      from: String(from),
      to: String(to),
    });
    router.push(`/holidays/${year}/${countryCode}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <YearSelect year={year} onChange={handleYearChange}/>
      <FromMonthSelect from={from} onChange={handleFromChange}/>
      <ToMonthSelect to={to} onChange={handleToChange}/>
    </div>
  );
}
