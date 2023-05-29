import React from "react";
import classNames from "classnames";

import { ThreeDotsMiddle } from "react-svg-spinners";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  mode?: "outline" | "solid" | "text";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const roundness = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const Button = ({
  children,
  className,
  size = "md",
  mode = "solid",
  variant,
  rounded = "md",
  loading,
  left = null,
  right = null,
  disabled,
  ...props
}: ButtonProps) => {
  const classes = classNames(
    {
      [roundness[rounded]]: true,
      "px-3 py-2 text-sm": size === "sm",
      "px-4 py-3 text-base": size === "md",
      "px-6 py-4 text-lg": size === "lg",
      "active:scale-[.99]": !(loading || disabled),
      "opacity-50": disabled,
      "text-primary dark:text-primary-400 bg-transparent": mode === "text",
      "bg-primary hover:bg-primary-600 active:bg-primary-700 dark:bg-primary-400 hover:dark-bg-primary-300 active:dark:bg-primary text-white":
        mode === "solid",
      "bg-transparent border-primary hover:bg-primary-50 dark:border-primary-400  text-primary dark:text-primary-400 border":
        mode === "outline",
      "[&>.loader]:visible [&>*]:invisible": loading,
    },
    `transition-all duration-150 ease-in-out 
     flex items-center justify-center gap-2
    whitespace-nowrap truncate text-ellipsis relative
    `,
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <div className="loader absolute w-full h-full flex items-center justify-center">
          <ThreeDotsMiddle color={mode === "solid" ? "#fff" : "#4287f5"} />
        </div>
      )}
      {left}
      <span>{children}</span>
      {right}
    </button>
  );
};

export default React.memo(Button);

const tmp = <span className="scale-[.99]"></span>;
