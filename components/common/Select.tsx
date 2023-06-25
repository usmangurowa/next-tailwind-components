import React from "react";
import { roundness, padding_sizes } from "@/lib/constants";
import ClickAwayListener from "../others/ClickAwayListener";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import IconButton from "./IconButton";
import { clf, clsx } from "class-flex";

type OptionType = { label: string; value: string };

interface SelectProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    SelectClassProps {
  label?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  helperText?: string;

  multiple?: boolean;
  options: OptionType[];
  closeOnSelect?: boolean;
  renderOption?: (option: OptionType) => React.ReactNode;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    left?: string;
    right?: string;
    helperText?: string;
    menu?: string;
    options?: string;
  };
}

interface SelectClassProps {
  full?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  inputSize?: "sm" | "md" | "lg" | any;
  mode?: "outlined" | "contained" | "underlined";
  rounded?: keyof typeof roundness;
  active?: boolean;
  error?: boolean;
}

const select = clf(
  "dark:placeholder:text-white placeholder:text-dark flex-grow overflow-ellipsis overflow-x-hidden focus:outline-none bg-transparent",
  ({ inputSize }: SelectClassProps) => ({
    variants: {
      inputSize: {
        [inputSize]: padding_sizes[inputSize as keyof typeof padding_sizes],
      },
      error: {
        true: "text-danger",
      },
    },
  })
);

const container = clf(
  "w-full flex items-center justify-between overflow-hidden relative",
  ({ rounded }: SelectClassProps) => ({
    variants: {
      variant: {
        primary: {
          contained:
            "bg-gray-50 dark:bg-gray-900 border-none focus:border-transparent",
          outlined:
            "bg-transparent border-primary dark:border-primary-400 border-2",
          underlined:
            "border-b-primary bg-gray-50 dark:bg-gray-900 focus:border-b-primary dark:border-primary-400 border-2 dark:focus:border-primary-400 !rounded-b-none border-t-0 border-l-0 border-r-0",
        },
        secondary: {
          contained: "bg-gray-50 dark:bg-gray-900 border-gray-100",
          outlined:
            " bg-transparent border-secondary dark:border-secondary-400 border-2 focus:border-secondary dark:focus:border-secondary-400",
          underlined:
            "border-b-secondary bg-gray-50 dark:bg-gray-900 dark:border-secondary-400 focus:border-b-secondary dark:focus:border-secondary-400 border-2 !rounded-b-none  border-t-0 border-l-0 border-r-0",
        },
      },
      rounded: {
        [rounded as keyof typeof roundness]:
          roundness[rounded as keyof typeof roundness],
      },
    },
  })
);

const Select = ({
  className,
  rounded = "md",
  inputSize = "md",
  options,
  multiple = false,
  closeOnSelect = true,
  renderOption,
  label,
  classNames,
  full,
  mode = "contained",
  variant = "primary",
  helperText,
  error,
  ...props
}: SelectProps) => {
  const [focused, setFocused] = React.useState(false);
  const [selected, setSelected] = React.useState<
    OptionType | OptionType[] | null
  >(multiple ? [options[0]] : options[0]);

  const [inputValue, setInputValue] = React.useState("");

  const lists: OptionType[] = React.useMemo(() => {
    if (inputValue.trim()) {
      return options?.filter((opt) =>
        opt.value.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    return options;
  }, [options, inputValue]);

  const renderValues = React.useMemo(
    () =>
      multiple
        ? (selected as OptionType[])?.map((opt) => opt.value).join(", ")
        : (selected as OptionType)?.value,
    [selected, multiple]
  );

  const generateClass = React.useMemo(
    () =>
      select({
        inputSize,
      }),
    [variant, mode, full, inputSize, rounded, error]
  );

  const classes = React.useMemo(
    () => ({
      container: clsx(
        "relative group h-fit",
        { "w-full": full },
        classNames?.container
      ),
      inputContainer: container({
        variant: { [variant]: mode },
        rounded,
      }),
      input: clsx(
        generateClass,
        {
          hidden: !focused,
        },
        classNames?.input
      ),
      values: clsx(
        generateClass,
        "whitespace-nowrap overflow-hidden text-ellipsis",
        {
          hidden: focused,
        }
      ),
      menu: clsx(
        "space-y-1 rounded-md overflow-x-hidden overflow-y-auto  absolute left-0 top-[100%] w-full max-h-0 paper transition-all ease-in-out duration-100 z-50",
        {
          "max-h-40 p-2": focused,
          "mt-1": !helperText,
          "-mt-5": !!helperText,
        },
        classNames?.menu
      ),
      option: clsx(
        "p-2 cursor-pointer dark:hover:bg-dark hover:bg-gray-50 rounded flex items-center gap-x-2",
        classNames?.options
      ),
      label: clsx(
        "text-sm font-medium text-gray-700 dark:text-gray-300 ml-1",
        { hidden: !label, "text-danger": error },
        classNames?.label
      ),
      helperText: clsx(
        "text-sm font-medium text-gray-700 dark:text-gray-300 ml-1",
        { hidden: !helperText, "text-danger": error }
      ),
    }),
    [
      focused,
      inputSize,
      rounded,
      renderValues,
      selected,
      multiple,
      options,
      inputValue,
      classNames,
      full,
      variant,
      mode,
      generateClass,
      error,
    ]
  );

  const handleFocus = React.useCallback((val: boolean) => {
    setFocused(val);
  }, []);

  const handleChange = React.useCallback(
    (val: OptionType) => {
      if (multiple) {
        if ((selected as OptionType[])?.includes(val)) {
          setSelected((prev) =>
            (prev as OptionType[])?.filter((opt) => opt.value !== val.value)
          );
        } else {
          setSelected((prev) => [...(prev as OptionType[]), val]);
        }
      } else {
        setSelected(val);
      }
      setInputValue("");
      if (closeOnSelect) {
        setFocused(false);
      }
    },
    [multiple, selected, closeOnSelect]
  );

  const handleClose = React.useCallback(() => {
    setFocused(false);
    setInputValue("");
  }, []);

  const renderList = React.useMemo(() => {
    if (renderOption) {
      return lists?.map((opt) => (
        <li
          id={opt.value}
          key={opt.value}
          tabIndex={0}
          aria-label="drop-down"
          role="button"
          onClick={() => handleChange(opt)}
        >
          {renderOption(opt)}
        </li>
      ));
    }
    return lists?.map((opt) => (
      <li
        id={opt.value}
        tabIndex={0}
        aria-label="drop-down"
        role="button"
        onClick={() => handleChange(opt)}
        className={clsx(classes.option, {
          "bg-gray-50 dark:bg-dark": multiple
            ? (selected as OptionType[])?.includes(opt)
            : opt.value === (selected as OptionType)?.value,
        })}
        key={opt.value}
      >
        {opt.label}
      </li>
    ));
  }, [lists, selected, classes.option, renderOption, handleChange]);

  return (
    <ClickAwayListener className={classes.container} onClickAway={handleClose}>
      <label htmlFor={props.name} className={classes.label}>
        {label}
      </label>
      <div className={classes.inputContainer}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={renderValues || props.placeholder || "Select"}
          className={classes.input}
        />
        <div className={classes.values} onClick={() => handleFocus(true)}>
          {renderValues || props.placeholder || "Select"}
        </div>
        <IconButton
          mode="text"
          onClick={() => handleFocus(!focused)}
          className="h-full !text-dark dark:!text-white"
          size={inputSize}
        >
          <ChevronDownIcon
            className={clsx("w-5 h-7 transition-all ease-in-out duration-75", {
              "rotate-180": focused,
            })}
          />
        </IconButton>
      </div>
      <span className={classes.helperText}>{helperText}</span>
      <ul aria-label="menu" className={classes.menu}>
        {renderList}
        {inputValue && !lists?.length ? (
          <li className="p-2 text-center">
            {`No options found for "${inputValue}"`}
          </li>
        ) : null}
      </ul>
    </ClickAwayListener>
  );
};

export default React.memo(Select);
