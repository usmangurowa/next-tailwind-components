import React from "react";
import { Spinner } from "../../loaders";
import { padding_sizes, roundness } from "@/lib/constants";
import { clf, clsx } from "class-flex";
import Link, { LinkProps } from "next/link";

interface VariantProps {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: keyof typeof padding_sizes;
  mode?: "outlined" | "contained" | "text";
  rounded?: keyof typeof roundness;
  full?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  animation?: "ripple" | "grow" | "none" | "shrink";
}
export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  href?: string;
  linkProps?: Omit<LinkProps, "href"> & { className?: string; href?: string };
  label?: string;
}

const btn = clf(
  "flex items-center justify-center gap-2 whitespace-nowrap relative h-fit",
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
      animation: {
        ripple: "",
        shrink: "transition-all duration-150 ease-in-out active:scale-[.99]",
      },
      rounded: {
        [rounded as string]: roundness[rounded as keyof typeof roundness],
      },
      size: {
        [size as keyof typeof padding_sizes]:
          padding_sizes[size as keyof typeof padding_sizes],
      },
      full: {
        true: "w-full",
      },
      uppercase: {
        true: "uppercase",
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

const btnChildClass =
  "flex items-center gap-2 overflow-hidden text-center truncate text-ellipsis whitespace-nowrap";

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
      uppercase = false,
      href,
      linkProps,
      label,
      animation = "shrink",
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
          uppercase,
          animation,
        }),
      [
        className,
        size,
        mode,
        rounded,
        loading,
        full,
        disabled,
        variant,
        uppercase,
        animation,
      ]
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
        {href ? (
          <Link
            href={href}
            {...linkProps}
            className={clsx(btnChildClass, linkProps?.className)}
          >
            {children || label}
          </Link>
        ) : (
          <span className={btnChildClass}>{children || label}</span>
        )}
        {right}
      </button>
    );
  }
);

Button.displayName = "Button";

export default React.memo(Button);
