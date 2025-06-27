import path from "path";
import {CountryHoliday} from "@/lib/types/CountryHoliday";
import {readFile, writeFile} from "node:fs/promises";
import {Country} from "@/lib/types/Country";

export async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://date.nager.at/api/v3/AvailableCountries");

  if (!response.ok) {
    throw new Error("nager.date fetch Error");
  }

  return await response.json();
}

const filePath = path.join(process.cwd(), "src", "data", "holiday-db.json");

export function getHolidays(year: number, countryCode: string) {
  return getHolidaysFromFilePath(year, countryCode, filePath);
}

export async function getAllHolidays(): Promise<CountryHoliday[]> {
  return await getDataFromFilePath(filePath);
}

async function getDataFromFilePath(filePath: string): Promise<CountryHoliday[]> {
  try {
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return data.map((holiday: CountryHoliday) => ({
      ...holiday,
      date: new Date(holiday.date)
    }));
  } catch (error) {
    console.error(`파일 읽기 오류: ${error}`);
    throw error;
  }
}

export async function getHolidaysFromFilePath(year: number, countryCode: string, filePath: string) {
  const holidays = await getDataFromFilePath(filePath);
  return holidays.filter((holiday: CountryHoliday) =>
    holiday.date.getFullYear() === year &&
    holiday.countryCode === countryCode) ?? [];
}

export async function updateHolidays(data: CountryHoliday[]) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`파일 쓰기 오류: ${error}`);
    throw error;
  }
}

export function isSameHoliday(holiday1: CountryHoliday, holiday2: CountryHoliday) {
  return holiday1.date.getTime() === holiday2.date.getTime() &&
    holiday1.countryCode === holiday2.countryCode &&
    holiday1.localName === holiday2.localName;
}
