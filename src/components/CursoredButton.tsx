"use client";

import type {ComponentPropsWithoutRef} from "react";
import {forwardRef} from "react";
import {Button} from "@/components/ui/button";

type ButtonProps = ComponentPropsWithoutRef<typeof Button>;

export const CursoredButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, ...props}, ref) => {
    return (
      <Button
        ref={ref}
        className={`cursor-pointer ${className ?? ""}`}
        {...props}
      />
    );
  }
);

CursoredButton.displayName = "CustomButton";
