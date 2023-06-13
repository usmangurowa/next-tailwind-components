import React from "react";
import { clx, pseudoClx } from "@/lib/utils";
import { roundness } from "@/lib/constants";
import ClickAwayListener from "../others/ClickAwayListener";
import FocusTrap from "focus-trap-react";
import { CheckCircledIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import IconButton from "./IconButton";

type OptionType = { label: string; value: string };

interface SelectProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg" | any;
  mode?: "outline" | "solid" | "text";
  rounded?: keyof typeof roundness;
  label?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
  multiple?: boolean;
  options: OptionType[];
  closeOnSelect?: boolean;
  renderOption?: (option: OptionType) => React.ReactNode;
}

const Select = ({
  className,
  rounded = "md",
  size = "md",
  options,
  multiple = false,
  closeOnSelect = true,
  renderOption,
  containerClassName,
  ...props
}: SelectProps) => {
  const [focused, setFocused] = React.useState(false);
  const [selected, setSelected] = React.useState<
    OptionType | OptionType[] | null
  >(multiple ? [options[0]] : options[0]);

  const [inputValue, setInputValue] = React.useState("");

  const selectRef = React.useRef<HTMLDivElement>(null);

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

  const classes = React.useMemo(
    () => ({
      container: clx("relative group", containerClassName),
      inputContainer: clx(
        "w-full flex items-center justify-between overflow-hidden dark:bg-paper-dark  bg-gray-50 relative transition-all duration-150 ease-in-out outline-none active:scale-[.99]",
        {
          [roundness[rounded as keyof typeof roundness]]: rounded,
        }
      ),
      input: clx(
        "flex-grow overflow-ellipsis overflow-x-hidden  w-10 truncate bg-transparent outline-none",
        {
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-3 text-base": size === "md",
          "px-6 py-4 text-lg": size === "lg",
          hidden: !focused,
          " dark:placeholder:text-white placeholder:text-dark": selected,
        }
      ),
      values: clx(
        "truncate flex-grow overflow-ellipsis overflow-x-hidden bg-transparent outline-none ",
        {
          " cursor-text": true,
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-3 text-base": size === "md",
          "px-6 py-4 text-lg": size === "lg",
          "text-gray-600": !renderValues,
          hidden: focused,
        }
      ),
      menu: clx("", {
        "space-y-1 rounded-md overflow-x-hidden overflow-y-auto absolute left-0 w-full max-h-0 paper transition-all ease-in-out duration-100 z-50":
          true,
        "max-h-40 p-2": focused,
        "top-10": size === "sm",
        "top-14": size === "md",
        "top-16": size === "lg",
      }),
      option: clx(
        "p-2 cursor-pointer dark:hover:bg-dark hover:bg-gray-50 rounded flex items-center gap-x-2",
        {}
      ),
    }),
    [
      focused,
      size,
      rounded,
      renderValues,
      selected,
      multiple,
      options,
      inputValue,
      containerClassName,
    ]
  );

  const handleFocus = React.useCallback(() => {
    setFocused(!focused);
  }, [focused]);

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
        className={
          classes.option +
          ` ${
            (
              multiple
                ? (selected as OptionType[])?.includes(opt)
                : opt.value === (selected as OptionType)?.value
            )
              ? "dark:bg-dark bg-gray-50"
              : ""
          }`
        }
        key={opt.value}
      >
        {opt.label}
      </li>
    ));
  }, [lists, selected, classes.option, renderOption]);

  return (
    <ClickAwayListener containerRef={selectRef} onClickAway={handleClose}>
      <div ref={selectRef} className={classes.container}>
        <div className={classes.inputContainer}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={renderValues || props.placeholder || "Select"}
            className={classes.input}
          />
          <div className={classes.values} onClick={() => setFocused(true)}>
            {renderValues || props.placeholder || "Select"}
          </div>
          <IconButton
            mode="text"
            onClick={handleFocus}
            className="h-full !text-dark dark:!text-white"
            size={size}
          >
            <ChevronDownIcon
              className={clx("w-5 h-7 transition-all ease-in-out duration-75", {
                "rotate-180": focused,
              })}
            />
          </IconButton>
        </div>
        <ul aria-label="menu" className={classes.menu}>
          {renderList}
          {inputValue && !lists?.length ? (
            <li className="p-2 text-center">
              No options found for "{inputValue}"
            </li>
          ) : null}
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default Select;
