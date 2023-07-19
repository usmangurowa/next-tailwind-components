import React from "react";

import { roundness, padding_sizes as input_sizes } from "@/lib/constants";

import { clf, clsx } from "class-flex";

type InputClassProps = {
  inputSize?: keyof typeof input_sizes;
  mode?: "contained" | "outlined" | "underlined";
  rounded?: keyof typeof roundness;
  error?: boolean;
  underlined?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  full?: boolean;
};

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputClassProps {
  loading?: boolean;
  label?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  helperText?: string;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    left?: string;
    right?: string;
    helperText?: string;
  };
}

const input = clf(
  "transition-all duration-150 ease-in-out outline-none placeholder:text-gray-600 without-ring",
  ({ rounded, inputSize }: InputClassProps) => ({
    variants: {
      variant: {
        primary: {
          contained:
            "bg-gray-50 dark:bg-gray-900 border-none focus:border-transparent",
          outlined:
            "bg-transparent border-primary dark:border-primary-400 border-2",
          underlined:
            "border-b-primary bg-gray-50 dark:bg-gray-900 focus:border-b-primary dark:border-primary-400 border-2 dark:focus:border-primary-400 !rounded-b-none  border-t-0 border-l-0 border-r-0",
        },
        secondary: {
          contained: "bg-gray-50 dark:bg-gray-900 border-gray-100",
          outlined:
            " bg-transparent border-secondary dark:border-secondary-400 border-2 focus:border-secondary dark:focus:border-secondary-400",
          underlined:
            "border-b-secondary bg-gray-50 dark:bg-gray-900 dark:border-secondary-400 focus:border-b-secondary dark:focus:border-secondary-400 border-2 !rounded-b-none  border-t-0 border-l-0 border-r-0",
        },
      },
      inputSize: {
        [inputSize as string]:
          input_sizes[inputSize as keyof typeof input_sizes],
      },
      disabled: {
        true: "bg-opacity-50",
        // false: "active:scale-[.999]",
      },
      error: {
        true: "border-red dark:border-red-400 border-2",
      },
      rounded: {
        [rounded as string]: roundness[rounded as keyof typeof roundness],
      },
      full: {
        true: "w-full",
      },
    },
  })
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      size = "md",
      mode = "contained",
      variant = "primary",
      rounded = "md",
      disabled = false,
      label,
      classNames,
      full,
      inputSize,
      style,
      error = false,
      helperText,
      ...props
    },
    ref
  ) => {
    const classes = React.useMemo(
      () => ({
        input: input({
          disabled,
          rounded,
          inputSize,
          mode,
          variant: {
            [variant]: mode,
          },
          error,
          className: classNames?.input,
        }),
        label: clsx(
          "text-sm font-medium text-gray-700 dark:text-gray-300 ml-1",
          classNames?.label,
          {
            "text-danger": error,
          }
        ),
        helperText: clsx(
          "text-sm font-medium text-gray-700 dark:text-gray-300 ml-1",
          classNames?.helperText,
          {
            "text-danger": error,
          }
        ),
        container: clsx(
          "flex flex-col w-fit space-y-1 bg-transparent",
          {
            "w-full": full,
          },
          classNames?.container
        ),
      }),
      [
        error,
        helperText,
        classNames,
        className,
        rounded,
        inputSize,
        mode,
        variant,
        label,
        helperText,
        full,
      ]
    );

    return (
      <div className={classes.container}>
        {label && <label className={classes.label}>{label}</label>}
        <input ref={ref} className={classes.input} {...props} />
        {helperText && <span className={classes.helperText}>{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);
