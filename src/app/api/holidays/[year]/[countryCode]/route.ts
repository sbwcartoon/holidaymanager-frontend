import {NextRequest, NextResponse} from "next/server";
import {getAllHolidays, getHolidays, isSameHoliday, updateHolidays} from "@/lib/api";

export async function DELETE(
  _: NextRequest,
  {params}: { params: { year: string, countryCode: string } },
) {
  const year = Number(params.year);
  const countryCode = String(params.countryCode);

  const targets = await getHolidays(year, countryCode);
  const data = await getAllHolidays();
  const rest = data.filter(holiday =>
    !targets.some(target => isSameHoliday(target, holiday)));
  await updateHolidays(rest);
  return NextResponse.json({success: true});
}
