import React from "react";
import { motion } from "framer-motion";
import IconButton from "../common/IconButton";
import { Cross1Icon } from "@radix-ui/react-icons";
import { clx } from "@/lib/utils";

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
}

interface SheetContentProps extends Omit<SheetProps, "open"> {
  open?: boolean;
  withCloseButton?: boolean;
}

const Sheet = ({ onClose, open, children, position = "left" }: SheetProps) => {
  const classes = clx(
    "fixed z-50 h-screen w-screen flex flex-col  backdrop-blur-sm transition-all ease-in-out duration-300 w-full overflow-hidden",
    {
      "left-0": open && position === "left",
      "-left-[100%]": !open && position === "left",
      "right-0": open && position === "right",
      "-right-[100%]": !open && position === "right",
      "top-0": open && position === "top",
      "-top-[100%]": !open && position === "top",
      "bottom-0": open && position === "bottom",
      "-bottom-[100%]": !open && position === "bottom",
    }
  );

  return (
    <div className={classes}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          open,
          position,
          onClose,
        });
      })}
      <div
        className="absolute top-0 left-0 w-full h-full z-[99]"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Sheet;

const SheetContent = ({
  children,
  className,
  open,
  position = "left",
  withCloseButton = true,
  onClose,
  ...props
}: SheetContentProps) => {
  const classes = clx(
    "paper shadow-none z-[999] relative",
    {
      "ml-auto": position === "right",
      "mr-auto": position === "left",
      "mt-auto": position === "bottom",
      "mb-auto": position === "top",
      "h-full w-1/2": position === "left" || position === "right",
      "h-1/2 w-full": position === "top" || position === "bottom",
    },
    className
  );

  const closeButtonClasses = clx("absolute m-2", {
    hidden: !withCloseButton,
    "top-0 right-0": position === "left" || position === "bottom",
    "top-0 left-0": position === "right",
    "bottom-0 left-0": position === "top",
  });

  return (
    <div className={classes}>
      <IconButton
        className={closeButtonClasses}
        onClick={onClose}
        size="sm"
        mode="text"
      >
        <Cross1Icon />
      </IconButton>
      {children}
    </div>
  );
};

Sheet.Content = SheetContent;
