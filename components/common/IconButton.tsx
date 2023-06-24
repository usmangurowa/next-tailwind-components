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

interface IconButtonProps
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

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
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
        "p-2 text-sm": size === "sm",
        "p-3 text-base": size === "md",
        "p-4 text-lg": size === "lg",
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
    whitespace-nowrap truncate text-ellipsis relative w-fit h-fit
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
          <div className="absolute flex items-center justify-center w-full h-full text-inherit loader">
            <Spinner />
          </div>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default React.memo(IconButton);
