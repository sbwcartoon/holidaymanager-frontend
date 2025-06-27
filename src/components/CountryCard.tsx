"use client";

import {Card, CardContent} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {getCurrentYear} from "@/lib/dateutils";
import {Country} from "@/lib/types/Country";

export const CountryCard = ({countryCode, name}: Country) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition"
      onClick={() => router.push(`/holidays/${getCurrentYear()}/${countryCode}`)}
    >
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-muted-foreground text-sm">{countryCode}</p>
      </CardContent>
    </Card>
  );
};
