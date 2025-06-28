import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function HolidayListEmpty({children}: Props) {
  return <p className="text-center py-16">{children})</p>;
}
