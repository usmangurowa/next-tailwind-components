import React from "react";
import FocusTrap from "focus-trap-react";
import { clf, clsx } from "class-flex";
import { useEvent } from "react-use";

interface OverlayClassProps {
  open?: boolean;
  transparent?: boolean;
  blurred?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}

interface OverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    OverlayClassProps {
  onClose?: () => void;
}

interface OverlayContentProps extends Omit<OverlayProps, "open"> {}

const overlay = clf(
  "fixed z-50 h-screen w-full flex flex-col transition-all ease-in-out duration-500 overflow-hidden !m-0",
  {
    variants: {
      open: {
        true: {
          left: "top-0 left-0",
          right: "top-0 right-0",
          top: "top-0",
          bottom: "bottom-0 ",
        },
        false: {
          left: "top-0 -left-full",
          right: "top-0 -right-full",
          top: "-top-full",
          bottom: "-bottom-full",
        },
      },
      transparent: {
        true: "bg-transparent",
      },
      opacity: {
        0: "opacity-0",
        1: "opacity-10",
        2: "opacity-20",
        3: "opacity-30",
        4: "opacity-40",
        5: "opacity-50",
        6: "opacity-60",
        7: "opacity-70",
        8: "opacity-80",
        9: "opacity-90",
        10: "opacity-100",
      },
      blurred: {
        true: "backdrop-blur-sm",
      },
    },
  }
);

const Overlay = ({
  onClose,
  open = false,
  children,
  position = "left",
  transparent = false,
  className,
}: OverlayProps) => {
  const classes = React.useMemo(
    () =>
      overlay({
        open: {
          [`${open}`]: position,
        },
        className,
        transparent,
      }),
    [open, transparent, position]
  );

  useEvent("keydown", (e) => {
    if (e.key === "Escape" || e.keyCode == 27) {
      onClose && onClose();
    }
  });

  return (
    <FocusTrap active={open}>
      <div className={classes}>
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
  ...props
}: OverlayContentProps) => {
  const classes = React.useMemo(
    () => clsx("paper z-[999] relative !m-0", className),
    [className]
  );
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Overlay.Content = OverlayContent;
