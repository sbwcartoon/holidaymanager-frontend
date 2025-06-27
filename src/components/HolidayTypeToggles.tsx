"use client";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {getAllTypes} from "@/lib/utils";
import {useRouter} from "next/navigation";

interface Props {
  from: number;
  to: number;
  types: string[];
}

export function HolidayTypeToggles({from, to, types}: Props) {
  const router = useRouter();

  const handleChange = (newTypes: string[]) => {
    const params = new URLSearchParams();
    params.set("from", String(from));
    params.set("to", String(to));
    newTypes.forEach((type) => params.append("types", type))

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex justify-end items-center space-x-1">
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={types}
        onValueChange={handleChange}
      >
        {getAllTypes().map((type: string) =>
          <ToggleGroupItem
            size="sm"
            className="w-[100px] cursor-pointer text-xs text-muted-foreground"
            value={type}
            key={type}
          >
            {type}
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
}
