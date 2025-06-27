import {NextRequest, NextResponse} from "next/server";

export async function DELETE(
  _: NextRequest,
  {params}: { params: { year: string, countryCode: string } },
) {
  return NextResponse.json({error: "데이터 삭제에 실패했습니다."}, {status: 500});
}
