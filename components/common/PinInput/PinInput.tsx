import React from "react";
import { clf, clsx } from "class-flex";

interface PinInputProps {
  size?: "sm" | "md" | "lg";
  length?: number;
  value?: string;
  rounded?: "full" | "md" | "lg";
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onBackspace?: (value: string) => void;
  disabled?: boolean;
  focus?: boolean;
  secret?: boolean;
  type?: string;
  inputMode?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  inputFocusStyle?: React.CSSProperties;
  inputHoverStyle?: React.CSSProperties;
  inputInvalidStyle?: React.CSSProperties;
  inputDisabledStyle?: React.CSSProperties;
  onCompleteStyle?: React.CSSProperties;

  className?: string;
  classNames?: {
    container?: string;
    input?: string;
    inputContainer?: string;
    pin?: string;
  };
}

const classes = {
  container: clf("flex flex-row items-center relative w-fit h-fit group"),
  pin: clf("border flex flex-row items-center justify-center", {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "md",
    },
  }),
  input: clf(
    "z-50 absolute transition-all duration-150 ease-in-out select-none top-0 left-0 w-full bg-transparent text-transparent h-full  outline-none focus:outline",
    {
      variants: {
        size: {
          sm: "h-8",
          md: "h-10",
          lg: "h-12",
        },
      },
    }
  ),
};

const PinInput = ({
  size = "md",
  length = 5,
  value,
  onChange,
  rounded,
}: PinInputProps) => {
  const _classes = React.useMemo(
    () => ({
      pin: classes.pin({ size, rounded }),
      container: classes.container({}),
      input: classes.input({}),
    }),
    [rounded, size]
  );
  return (
    <div className={_classes.container}>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={_classes.input}
      />
      <div className="flex flex-row space-x-2 tracking-wider w-fit h-fit">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={clsx(_classes.pin, {
              "border-gray-300": !value?.[i],
              "border-primary": value?.[i],
            })}
          >
            {value?.[i]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinInput;
