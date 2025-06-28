import Link from "next/link";
import {CursoredButton} from "@/components/CursoredButton";

interface Props {
  totalPages: number;
  year: number;
  countryCode: string;
  page: number;
  size: number;
  from: number;
  to: number;
  types: string[];
}

export default function HolidayListPagination(
  {
    totalPages,
    year,
    countryCode,
    page,
    size,
    from,
    to,
    types,
  }: Props
) {
  const generateSearchParams = (page: number) => {
    return `page=${page}&size=${size}&from=${from}&to=${to}${types.map((type: string) => `&types=${type}`).join("")}`;
  }
  return (
    <nav className="flex justify-center py-5 space-x-1">
      {Array.from({length: totalPages}, (_, i) => (
        <Link
          href={`/holidays/${year}/${countryCode}?${generateSearchParams(i + 1)}`}
          key={i}>
          <CursoredButton
            className="text-zinc-600"
            size="sm"
            variant={page === i + 1 ? "secondary" : "ghost"}
          >{i + 1}</CursoredButton>
        </Link>
      ))}
    </nav>
  );
}
