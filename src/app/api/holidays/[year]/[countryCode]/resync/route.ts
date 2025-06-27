import {NextRequest, NextResponse} from "next/server";

export async function POST(
  _: NextRequest,
  {params}: { params: { year: string; countryCode: string } },
) {
  return NextResponse.json({error: "재동기화에 실패했습니다."}, {status: 500});
}
