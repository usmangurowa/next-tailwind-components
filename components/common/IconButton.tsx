import React from "react";
import { Spinner } from "../loaders";
import { clf, clsx } from "class-flex";
import { icon_sizes, roundness } from "@/lib/constants";

interface VariantProps {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: keyof typeof icon_sizes;
  mode?: "outlined" | "contained" | "text";
  rounded?: keyof typeof roundness;
  disabled?: boolean;
}

interface IconButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps {}

const btn = clf(
  "flex items-center w-fit  justify-center gap-2 whitespace-nowrap relative h-fit transition-all duration-150 ease-in-out active:scale-[.99]",
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
        [size as keyof typeof icon_sizes]:
          icon_sizes[size as keyof typeof icon_sizes],
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

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      size = "md",
      mode = "contained",
      variant = "primary",
      rounded = "md",
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = React.useMemo(
      () =>
        btn({
          disabled,
          loading,
          variant: {
            [variant]: mode,
          },
          size,
          rounded,
          className,
        }),
      [loading, disabled, mode, size, rounded, className]
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
