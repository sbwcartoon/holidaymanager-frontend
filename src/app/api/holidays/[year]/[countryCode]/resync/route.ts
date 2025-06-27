import {NextRequest} from "next/server";

export async function POST(
  _: NextRequest,
  {params}: { params: { year: string; countryCode: string } },
) {
  const {year, countryCode} = params;
  return await fetch(`http://localhost:8080/api/holidays/${year}/${countryCode}/refresh`, {
    method: "POST",
  });
}
