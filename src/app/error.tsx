"use client";

import {useRouter} from "next/navigation";
import {CursoredButton} from "@/components/CursoredButton";

export default function Error({error, reset}: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="text-center mt-16">
      <h1 className="text-2xl font-bold mb-4">오류가 발생했어요! 😱</h1>
      <p className="mb-6">{error.message}</p>
      <div className="flex justify-center gap-2">
        <CursoredButton
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => reset()}
        >
          다시 시도
        </CursoredButton>
        <CursoredButton
          variant="outline"
          onClick={() => router.push("/")}
        >
          메인으로 이동
        </CursoredButton>
      </div>
    </div>
  );
}
