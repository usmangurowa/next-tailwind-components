import React from "react";
import { Spinner } from "../loaders";
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

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  mode?: "outline" | "solid" | "text";
  rounded?: keyof typeof roundness;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const classes = clx(
      {
        [roundness[rounded]]: true,
        "px-3 py-2 text-sm": size === "sm",
        "px-4 py-3 text-base": size === "md",
        "px-6 py-4 text-lg": size === "lg",
        "active:scale-[.99]": !(loading || disabled),
        "opacity-50": disabled,
        "text-primary dark:text-primary-dark bg-transparent": mode === "text",
        "bg-primary hover:bg-primary-hover active:bg-primary-active dark:bg-primary-dark hover:dark:bg-primary-dark-hover active:dark:bg-primary-dark-active text-white":
          mode === "solid",
        "bg-transparent border-primary hover:bg-primary-hover/20 dark:border-primary-dark  text-primary dark:text-primary-dark border":
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
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute flex items-center justify-center w-full h-full loader">
            <Spinner />
          </div>
        )}
        {left}
        <span>{children}</span>
        {right}
      </button>
    );
  }
);

Button.displayName = "Button";

export default React.memo(Button);
