"use client";

import { forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  cn(
    "inline-flex h-10 min-w-[140px] items-center justify-center whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60"
  ),
  {
    variants: {
      variant: {
        default: "bg-lime px-5 py-2.5 text-black hover:bg-lime/80",
        secondary: "bg-purple/80 px-5 py-2.5 text-white hover:bg-purple/90",
        outline:
          "border-2 border-black bg-white px-5 py-2.5 hover:bg-black hover:text-white focus:bg-black focus:text-white",
      },
      capsule: {
        default: "rounded-full px-[30px] pb-[9px] pt-[11px]",
        small: "h-[30px] min-w-[70px] rounded-full px-2.5 py-[5px]",
      },
      isLoading: {
        true: "pointer-events-none opacity-60",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      capsule,
      isLoading,
      disabled,
      icon,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, capsule, isLoading, disabled }),
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {icon && <i className={cn(`icon-${icon} me-2 block text-xl`)}></i>}
        {props.children}
        {isLoading && (
          <Loader2 size={16} className={cn("ms-1 block animate-spin")} />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
