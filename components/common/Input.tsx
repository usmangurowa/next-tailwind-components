import React from "react";

import { clx } from "@/lib/utils";
import { roundness } from "@/lib/constants";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg" | any;
  mode?: "outline" | "solid" | "text";
  rounded?: keyof typeof roundness;
  label?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      size = "md",
      mode = "solid",
      variant,
      rounded = "md",
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const classes = clx(
      {
        [roundness[rounded]]: true,
        "px-3 py-2 text-sm": size === "sm",
        "px-4 py-3 text-base": size === "md",
        "px-6 py-4 text-lg": size === "lg",
        "active:scale-[.99]": !disabled,
        "opacity-50": disabled,
        "bg-gray-50 dark:bg-gray-900 border-gray-200": mode === "solid",
        "bg-transparent border-primary dark:border-primary-400 border-2":
          mode === "outline",
      },
      "transition-all duration-150 ease-in-out outline-none placeholder:text-gray-600",
      className
    );

    const labelClasses = clx(
      "text-sm font-medium text-gray-700 dark:text-gray-300 ml-1"
    );

    const helperTextClasses = clx();

    const containerClasses = clx("flex flex-col w-fit space-y-1");

    return (
      <div className={containerClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        <input ref={ref} className={classes} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);
