import React from "react";
import IconButton from "../common/IconButton";
import { Cross1Icon } from "@radix-ui/react-icons";
import { clx } from "@/lib/utils";
import FocusTrap from "focus-trap-react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom" | "center";

  responsive?: boolean;
  transparent?: boolean;
}

interface ModalContentProps extends Omit<ModalProps, "open"> {
  open?: boolean;
  withCloseButton?: boolean;
}

const Modal = ({
  onClose,
  open,
  children,
  position = "center",
  responsive = false,
  transparent = false,
}: ModalProps) => {
  const classes = clx(
    "flex h-screen w-screen fixed z-50 transition-all ease-in-out duration-300 overflow-hidden !m-0",
    {
      "items-center justify-center opacity-0 scale-0 top-0":
        !responsive && position === "center",
      "flex opacity-1  scale-1 top-0":
        open && !responsive && position === "center",
      "laptop:scale-1 opacity-1 bottom-0": open && responsive,
      "laptop:bottom-0 opacity:0 laptop:scale-0 -bottom-[100%]":
        !open && responsive,
      "laptop:items-center laptop:justify-center": responsive,
      "bg-transparent": transparent,
      "backdrop-blur-sm": !transparent && open,
    }
  );

  React.useEffect(() => {
    const onEscaped = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose && onClose();
      }
    };

    document.addEventListener("keydown", onEscaped);

    return () => {
      document.removeEventListener("keydown", onEscaped);
    };
  }, [onClose]);

  return (
    <FocusTrap active={open}>
      <div className={classes}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement<any>, {
            open,
            position,
            onClose,
            responsive,
          });
        })}

        <div
          className="absolute top-0 left-0 w-full h-full z-[99]"
          onClick={onClose}
        ></div>
      </div>
    </FocusTrap>
  );
};

export default Modal;

const ModalContent = ({
  children,
  className,
  open,
  position = "center",
  withCloseButton = true,
  responsive,
  onClose,
  ...props
}: ModalContentProps) => {
  const classes = clx(
    "paper z-[999] relative overflow-auto",
    {
      "w-full laptop:h-[80vh] laptop:w-1/2 laptop:rounded-2xl rounded-t-2xl mt-auto laptop:m-0":
        responsive,
      "h-[80vh] laptop:w-1/2 w-4/5 rounded-2xl": !responsive,
      "": position === "center",
    },
    className
  );

  const closeButtonClasses = clx("absolute m-2 top-0 right-0", {
    hidden: !withCloseButton,
  });

  return (
    <div className={classes} {...props}>
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

Modal.Content = ModalContent;
