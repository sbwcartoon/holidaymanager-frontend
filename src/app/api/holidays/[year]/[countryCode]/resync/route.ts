import {NextRequest} from "next/server";

const API_HOST_URL = process.env.API_HOST_URL;

export async function POST(
  _: NextRequest,
  {params}: { params: Promise<{ year: string, countryCode: string }> }
) {
  const {year, countryCode} = await params;
  return await fetch(`${API_HOST_URL}/api/holidays/${year}/${countryCode}/refresh`, {
    method: "POST",
  });
}
