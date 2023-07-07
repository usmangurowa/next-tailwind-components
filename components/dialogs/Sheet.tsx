import React from "react";
import IconButton from "../common/IconButton";
import { Cross1Icon } from "@radix-ui/react-icons";
import FocusTrap from "focus-trap-react";
import { clf } from "class-flex";

interface SheetClassProps {
  open: boolean;
  position?: "left" | "right" | "top" | "bottom";
  transparent?: boolean;
  blurred?: boolean;
  opacity?: number;
}
interface SheetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SheetClassProps {
  onClose?: () => void;
}

interface SheetContentProps extends Omit<SheetProps, "open"> {
  open?: boolean;
  withCloseButton?: boolean;
}

const sheet = {
  container: clf(
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
  ),
  content: clf("paper shadow-none z-[999] relative !m-0", {
    variants: {
      position: {
        left: "mr-auto h-full laptop:w-1/4 tablet:w-1/2 w-4/5",
        right: "ml-auto h-full laptop:w-1/4 tablet:w-1/2 w-4/5",
        top: "mb-auto h-1/2 w-full",
        bottom: "mt-auto h-1/2 w-full",
      },
    },
  }),
};

const closeIcon = clf("absolute m-2", {
  variants: {
    position: {
      left: "top-0 right-0",
      right: "top-0 left-0",
      top: "bottom-0 left-0",
      bottom: "top-0 right-0",
    },
    withCloseButton: {
      true: "block",
      false: "hidden",
    },
  },
});

const Sheet = ({
  onClose,
  open = false,
  children,
  position = "left",
  blurred,
  opacity,
  transparent,
  className,
}: SheetProps) => {
  const classes = React.useMemo(
    () =>
      sheet.container({
        blurred,
        opacity,
        open: {
          [`${open}`]: position,
        },
        transparent,
        className,
      }),
    [open, position, blurred, opacity, transparent, className]
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
  const classes = React.useMemo(
    () => sheet.content({ position, className }),
    [position, className]
  );

  const closeButtonClasses = React.useMemo(
    () => closeIcon({ position, withCloseButton }),
    [position, withCloseButton]
  );

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

Sheet.Content = SheetContent;
