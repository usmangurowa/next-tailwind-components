import React from "react";
import IconButton from "../common/IconButton";
import { Cross1Icon } from "@radix-ui/react-icons";
import FocusTrap from "focus-trap-react";
import { clf, clsx } from "class-flex";
import { useEvent } from "react-use";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom" | "center";
  responsive?: boolean;
  transparent?: boolean;
  blurred?: boolean;
}

interface ModalContentProps extends Omit<ModalProps, "open"> {
  open?: boolean;
  withCloseButton?: boolean;
}

const modal = {
  container: clf(
    "flex h-screen w-screen fixed z-50 transition-all ease-in-out duration-300 overflow-hidden !m-0",
    {
      variants: {
        open: {
          true: {
            responsive: "laptop:scale-100 opacity-100 bottom-0",
            irresponsive:
              "flex opacity-100 scale-100 top-0 items-center justify-center",
          },
          false: {
            responsive: "laptop:bottom-0 opacity-0 laptop:scale-0 -bottom-full",
            irresponsive: "opacity-0 scale-0 top-0",
          },
        },
        responsive: {
          true: "laptop:items-center laptop:justify-center",
          false: "",
        },
        blurred: {
          true: "backdrop-blur-sm",
          false: "",
        },
        transparent: {
          true: "bg-transparent",
          false: "",
        },
      },
      defaultVariants: {
        open: "false",
        responsive: "false",
        blurred: "true",
        transparent: "false",
      },
    }
  ),
  content: clf("paper z-[999] relative overflow-auto", {
    variants: {
      responsive: {
        true: "w-full laptop:max-h-[80vh] laptop:max-w-3xl laptop:rounded-2xl rounded-t-2xl mt-auto laptop:m-0",
        false: "max-h-[80vh] laptop:max-w-3xl w-11/12 rounded-2xl",
      },
    },
  }),
};

const Modal = ({
  onClose,
  open,
  children,
  position = "center",
  responsive = false,
  transparent = false,
  blurred = true,
  className,
}: ModalProps) => {
  useEvent("keydown", (e) => {
    if (e.key === "Escape" || e.keyCode == 27) {
      onClose && onClose();
    }
  });

  const classes = React.useMemo(
    () =>
      modal.container({
        blurred,
        open: {
          [`${open}`]: responsive ? "responsive" : "irresponsive",
        },
        responsive,
        transparent,
        className,
      }),
    [open, responsive, transparent, className, blurred]
  );

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
  const classes = React.useMemo(
    () =>
      modal.content({
        responsive,

        className,
      }),
    [open, responsive, className]
  );
  return (
    <div className={classes} {...props}>
      <IconButton
        className={clsx("absolute m-2 top-0 right-0", {
          hidden: !withCloseButton,
        })}
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
