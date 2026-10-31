import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-marigold text-basalt hover:bg-marigold-deep focus-visible:outline-basalt",
  secondary:
    "bg-forest text-paper hover:bg-forest-deep focus-visible:outline-marigold",
  ghost:
    "bg-transparent px-1 text-forest underline-offset-4 hover:underline focus-visible:outline-forest",
};

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  asChild?: boolean;
};

export function Button({ variant = "primary", asChild = false, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-base font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
