import {NextRequest, NextResponse} from "next/server";
import path from "path";
import {getAllHolidays, getHolidaysFromFilePath, isSameHoliday, updateHolidays} from "@/lib/api";

export async function POST(
  _: NextRequest,
  {params}: { params: { year: string; countryCode: string } },
) {
  const year = Number(params.year);
  const countryCode = String(params.countryCode);

  await resyncHolidays(year, countryCode);
  return NextResponse.json({success: true});
}

async function getHolidaysBackup(year: number, countryCode: string) {
  const backupFilePath = path.join(process.cwd(), "src", "data", "holiday-db-backup.json");
  return await getHolidaysFromFilePath(year, countryCode, backupFilePath);
}

async function resyncHolidays(year: number, countryCode: string) {
  const data = await getAllHolidays();
  const backup = await getHolidaysBackup(year, countryCode);
  const rest = backup.filter(holiday =>
    !data.some(target => isSameHoliday(target, holiday)))
  await updateHolidays([...data, ...rest]);
}
