import React from "react";

import { clx } from "@/lib/utils";

const roundness = {
  none: "rounded-none",
  rounded: "rounded",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

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
}

const Input = ({
  children,
  className,
  size = "md",
  mode = "solid",
  variant,
  rounded = "md",
  disabled,
  ...props
}: InputProps) => {
  //   const roundedClass = "rounded-" + rounded;

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
    "transition-all duration-150 ease-in-out ring-0 focus:outline-none outline-none",
    className
  );

  return <input className={classes} {...props} />;
};

export default React.memo(Input);

const temp = <span className="ring-0"></span>;
