"use client";

import {CursoredButton} from "@/components/CursoredButton";
import {useRouter} from "next/navigation";

interface Props {
  year: number;
  countryCode: string;
}

export function DeleteHolidaysButton({year, countryCode}: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`${year}년도 데이터를 삭제할까요?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/holidays/${year}/${countryCode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("오류가 발생했습니다. 문제가 지속될 시 관리자에게 문의해주세요.");
      throw new Error("데이터 삭제 오류");
    }

    alert("삭제되었습니다.");
    router.refresh();
  };

  return (
    <CursoredButton
      variant="destructive"
      onClick={handleDelete}
    >✕ Delete</CursoredButton>
  );
}
