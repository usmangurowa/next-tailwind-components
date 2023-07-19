import React from "react";
import {
  Root,
  Action,
  Description,
  Title,
  Toast as _Toast,
  ToastProps as _ToastProps,
  Provider,
  Viewport,
} from "@radix-ui/react-toast";
import { clf, clsx } from "class-flex";
import IconButton from "./IconButton";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useSetState } from "react-use";

interface ToastProps extends _ToastProps {
  title?: string;
  description?: string;
  onClose?: () => void;
  status?: "success" | "error" | "warning" | "info" | "primary";
}

const toastClass = clf(
  "flex items-center !pointer-events-auto  max-w-md w-fit max-h-20 h-20  before:rounded-full before:content-[' '] before:h-full before:w-2 group  relative justify-between gap-2 p-2 overflow-hidden rounded-md paper transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full data-[state=open]:tablet:slide-in-from-right-full",
  {
    variants: {
      status: {
        success: "before:bg-success [&_.toast-title]:text-success",
        error: "before:bg-error [&_.toast-title]:text-error",
        warning: "before:bg-warning [&_.toast-title]:text-warning",
        info: "before:bg-info [&_.toast-title]:text-info",
        primary: "before:bg-primary [&_.toast-title]:text-primary",
      },
    },
  }
);

const Toast = ({
  title,
  description,
  onClose,
  status = "primary",
  className,
  ...props
}: ToastProps) => (
  <Root
    {...props}
    className={toastClass({ status, className })}
    style={{ pointerEvents: "auto" }}
  >
    <div className="flex flex-col flex-1 h-full">
      <Title className="font-semibold toast-title font-rubik">{title}</Title>
      <Description className="text-sm toast-desc line-clamp-2 font-sora">
        {description}
      </Description>
    </div>
    <Action asChild altText="close" className="cursor-pointer">
      <IconButton onClick={onClose} className="h-fit" mode="text" size="sm">
        <Cross1Icon />
      </IconButton>
    </Action>
  </Root>
);

export default Toast;

interface ToastContextProps {
  toast: (config: Omit<ToastStateProps, "open">) => void;
}

interface ToastStateProps {
  title: string;
  description: string;
  duration?: number;
  status?: ToastProps["status"];
  position?: "top-left" | "bottom-left";
  open: boolean;
}

const initialState: ToastStateProps = {
  title: "",
  description: "",
  status: "primary",
  duration: 3000,
  position: "top-left",
  open: false,
};

const ToastContext = React.createContext<ToastContextProps>({
  toast: (data: Omit<Omit<ToastContextProps, "toast">, "open">) => data,
});

// items-end justify-center tablet:items-start tablet:justify-end

const toastClasses = {
  viewport: clf(
    "fixed inset-0 bottom-0 right-0 flex  px-4 py-6 pointer-events-none tablet:p-6  z-[999999]",
    {
      variants: {
        position: {
          "top-left": "items-start justify-end",
          "bottom-left": "items-end justify-center",
        },
      },
    }
  ),
};

let timer: NodeJS.Timeout;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ description, duration, open, title, status, position }, setState] =
    useSetState<ToastStateProps>(initialState);

  React.useEffect(() => {
    if (!open) {
      timer = setTimeout(() => setState(initialState), 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const toast = React.useCallback(
    (config: Omit<ToastStateProps, "open">) => {
      if (open) {
        setState({ open: false });
        console.log("opened");
        timer = setTimeout(() => setState({ ...config, open: true }), 500);
      } else {
        setState({ ...config, open: true });
      }
    },
    [open]
  );

  const values = React.useMemo(() => ({ toast }), []);

  return (
    <Provider duration={5000} swipeDirection="right">
      <ToastContext.Provider value={values}>
        {children}
        <Toast
          open={open}
          onClose={() => setState({ open: false })}
          onOpenChange={(open) => setState({ open })}
          title={title}
          description={description}
          status={status}
          duration={duration}
        />
      </ToastContext.Provider>
      <Viewport className={toastClasses.viewport({ position })} />
    </Provider>
  );
};

export const useToast = () => {
  const { toast } = React.useContext(ToastContext);
  return toast;
};
