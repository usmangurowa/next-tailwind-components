import React from "react";
import { clx } from "@/lib/utils";
import FocusTrap from "focus-trap-react";

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  transparent?: boolean;
}

interface OverlayContentProps extends Omit<OverlayProps, "open"> {
  open?: boolean;
  withCloseButton?: boolean;
}

const Overlay = ({
  onClose,
  open,
  children,
  position = "left",
  transparent = false,
}: OverlayProps) => {
  const classes = clx(
    "fixed flex items-center justify-center z-50 h-screen w-screen flex flex-col  backdrop-blur-sm transition-all ease-in-out duration-300 w-full overflow-hidden !m-0 ",
    {
      "left-0 top-0": open && position === "left",
      "-left-[100%]": !open && position === "left",
      "right-0": open && position === "right",
      "-right-[100%]": !open && position === "right",
      "top-0": open && position === "top",
      "-top-[100%]": !open && position === "top",
      "bottom-0": open && position === "bottom",
      "-bottom-[100%]": !open && position === "bottom",
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
        {/* {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement<any>, {
            open,
            position,
            onClose,
          });
        })} */}
        {children}
        <div
          className="absolute top-0 left-0 w-full h-full "
          onClick={onClose}
        ></div>
      </div>
    </FocusTrap>
  );
};

export default Overlay;

const OverlayContent = ({
  children,
  className,
  open,
  position = "left",
  withCloseButton = true,
  onClose,
  ...props
}: OverlayContentProps) => {
  const classes = clx("paper z-[999] relative !m-0", className);
  // const classes = clx(
  //   "paper shadow-none z-[999] relative !m-0",
  //   {
  //     "ml-auto": position === "right",
  //     "mr-auto": position === "left",
  //     "mt-auto": position === "bottom",
  //     "mb-auto": position === "top",
  //     "h-full laptop:w-1/4 tablet:w-1/2 w-4/5":
  //       position === "left" || position === "right",
  //     "h-1/2 w-full": position === "top" || position === "bottom",
  //   },
  //   className
  // );

  return (
    // <div className={classes} {...props}>
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Overlay.Content = OverlayContent;
