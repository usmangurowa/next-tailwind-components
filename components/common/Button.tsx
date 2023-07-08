import React from "react";
import { Spinner } from "../loaders";
import { padding_sizes, roundness } from "@/lib/constants";
import { clf, clsx } from "class-flex";

interface VariantProps {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: keyof typeof padding_sizes;
  mode?: "outlined" | "contained" | "text";
  rounded?: keyof typeof roundness;
  full?: boolean;
  disabled?: boolean;
}
export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const btn = clf(
  "flex items-center justify-center gap-2 whitespace-nowrap relative h-fit transition-all duration-150 ease-in-out active:scale-[.99]",
  ({ rounded, size }: VariantProps) => ({
    variants: {
      mode: {},
      variant: {
        primary: {
          contained: `bg-primary hover:bg-primary-hover active:bg-primary-active dark:bg-primary-dark hover:dark:bg-primary-dark-hover active:dark:bg-primary-dark-active  text-white`,
          outlined: `bg-transparent border-2 border-primary hover:bg-primary-hover/20 dark:border-primary-dark  text-primary dark:text-primary-dark`,
          text: `bg-transparent text-primary dark:text-primary-dark`,
        },

        secondary: {
          contained: `bg-secondary hover:bg-secondary-hover active:bg-secondary-active dark:bg-secondary-dark hover:dark:bg-secondary-dark-hover active:dark:bg-secondary-dark-active text-white`,
          outlined: `bg-transparent border-2 border-secondary hover:bg-secondary-hover/20 dark:border-secondary-dark  text-secondary dark:text-secondary-dark`,
          text: `bg-transparent text-secondary dark:text-secondary-dark`,
        },
        tertiary: {
          contained: `bg-tertiary hover:bg-tertiary-hover active:bg-tertiary-active dark:bg-tertiary-dark hover:dark:bg-tertiary-dark-hover active:dark:bg-tertiary-dark-active text-white`,
          outlined: `bg-transparent border-2 border-tertiary hover:bg-tertiary-hover/20 dark:border-tertiary-dark  text-tertiary dark:text-tertiary-dark`,
          text: `bg-transparent text-tertiary dark:text-tertiary-dark`,
        },
      },
      rounded: {
        [rounded as string]: `rounded-${rounded}`,
      },
      size: {
        [size as keyof typeof padding_sizes]:
          padding_sizes[size as keyof typeof padding_sizes],
      },
      full: {
        true: "w-full",
      },
      loading: {
        true: "[&>.loader]:visible [&>*]:invisible",
      },
      disabled: {
        true: "opacity-50",
      },
    },
    responsive: {},
  })
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      size = "md",
      mode = "contained",
      variant = "primary",
      rounded = "md",
      loading = false,
      left = null,
      right = null,
      disabled,
      full = false,
      ...props
    },
    ref
  ) => {
    const classes = React.useMemo(
      () =>
        btn({
          mode,
          variant: {
            [variant]: mode,
          },
          rounded,
          size,
          full,
          loading,
          disabled,
          className,
        }),
      [className, size, mode, rounded, loading, full, disabled, variant]
    );

    return (
      <button
        ref={ref}
        className={classes}
        aria-disabled={disabled || loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute flex items-center justify-center w-full h-full loader">
            <Spinner />
          </div>
        )}
        {left}
        <span className="flex items-center gap-2 overflow-hidden text-center truncate text-ellipsis whitespace-nowrap">
          {children}
        </span>
        {right}
      </button>
    );
  }
);

Button.displayName = "Button";

export default React.memo(Button);
