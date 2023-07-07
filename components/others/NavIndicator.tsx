import { useRouter } from "next/router";
import React from "react";
import { useWindowSize } from "react-use";

import { clsx } from "class-flex";

const sliderClass =
  "absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-in-out bg-paper-dark dark:bg-paper !mx-0"; // opacity-0

type NavIndicatorChildProps = {
  height?: number;
  left?: number;
  top?: number;
  width?: number;
  className?: string;
};

interface NavIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  activeQuery?: string;
  children: (prop: NavIndicatorChildProps) => React.ReactNode;
  Indicator?: React.ReactNode;
  extraKeys?: any[];
}

const NavIndicator = ({
  className,
  activeQuery = ".nav-item[aria-selected=true]",
  children,
  extraKeys,
  ...props
}: NavIndicatorProps) => {
  const slider = React.useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const router = useRouter();

  const [active, setActive] = React.useState<NavIndicatorChildProps>({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  });

  const calculateActivePos = React.useCallback(() => {
    const activePath = slider.current?.parentElement?.querySelector(
      activeQuery
    ) as HTMLUListElement;
    setActive({
      height: activePath?.offsetHeight || 0,
      left: activePath?.offsetLeft || 0,
      top: activePath?.offsetTop || 0,
      width: activePath?.offsetWidth || 0,
    });
  }, [width, router?.pathname, active]);

  React.useEffect(() => {
    const func = () =>
      slider.current?.classList.contains("opacity-0") &&
      slider.current?.classList.remove("opacity-0");

    calculateActivePos();
    slider.current?.addEventListener("transitionend", func);

    return () => {
      slider.current?.addEventListener("transitionend", func);
    };
  }, [router?.pathname, width, extraKeys]);

  return (
    <div
      {...props}
      className={clsx(
        className,
        "opacity-0 transition-all duration-100 ease-in-out"
      )}
      ref={slider}
    >
      {children({ ...active, className: sliderClass })}
    </div>
  );
};

const Indicator = ({
  height = 0,
  left = 0,
  top = 0,
  width = 0,
  className,
  children,
  style,
}: NavIndicatorChildProps & React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      top: `${top}px`,
      left: `${left}px`,
      height: `${height}px`,
      width: `${width}px`,
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
);

NavIndicator.Indicator = Indicator;

NavIndicator.displayName = "NavIndicator";

export default NavIndicator; //React.memo(NavIndicator);
