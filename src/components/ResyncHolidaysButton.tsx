"use client";

import {useRouter} from "next/navigation";
import {CursoredButton} from "@/components/CursoredButton";
import {HttpError} from "@/lib/exception/HttpError";

interface Props {
  year: number;
  countryCode: string;
}

export function ResyncHolidaysButton({year, countryCode}: Props) {
  const router = useRouter();

  const handleResync = async () => {
    const confirmed = confirm(`${year}년도 데이터를 다시 설정할까요?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/holidays/${year}/${countryCode}/resync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("오류가 발생했습니다. 문제가 지속될 시 관리자에게 문의해주세요.");
      throw await HttpError.fromResponse(response);
    }

    alert("다시 설정되었습니다.");
    router.refresh();
  };

  return (
    <CursoredButton
      variant="default"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      onClick={handleResync}
    >↻ Resync</CursoredButton>
  );
}
