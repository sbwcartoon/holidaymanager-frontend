import {Country} from "@/lib/types/Country";
import {HttpError} from "@/lib/exception/HttpError";
import {PageResponse} from "@/lib/types/PageResponse";

export async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://date.nager.at/api/v3/AvailableCountries", {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw await HttpError.fromResponse(response);
  }

  return await response.json();
}

export async function getHolidays(year: number, countryCode: string, page: number = 1, size: number = 10, from: number = 1, to: number = 12): Promise<PageResponse> {
  const params = new URL("http://dummy");
  params.searchParams.set("page", String(page));
  params.searchParams.set("size", String(size));
  params.searchParams.set("from", String(from));
  params.searchParams.set("to", String(to));

  const response = await fetch(`http://localhost:8080/api/holidays/${year}/${countryCode}${params.search}`);

  if (!response.ok) {
    throw await HttpError.fromResponse(response);
  }

  return await response.json();
}
