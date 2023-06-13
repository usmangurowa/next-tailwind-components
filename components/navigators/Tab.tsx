import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { clx } from "@/lib/utils";

interface TabProps extends Tabs.TabsProps {
  active?: string | number | boolean;
}

interface TabItemProps extends Tabs.TabsListProps {
  active?: string | number | boolean;
  indicator?: boolean;
  value?: string | number | boolean;
  orientation?: "vertical" | "horizontal";
  sliderClass?: string;
}

interface TabPanelProps extends Tabs.TabsContentProps {
  active?: string | number | boolean;
}

interface TabContextProps {
  active?: string | number | boolean;
  orientation?: "vertical" | "horizontal";
  value?: string | number | boolean;
}

const TabContext = React.createContext({
  active: "",
  orientation: "horizontal",
  value: "",
} as TabContextProps);

const Tab = ({
  defaultValue,
  className,
  children,
  onValueChange,
  value,
  orientation,
  ...props
}: TabProps & React.HTMLAttributes<HTMLDivElement>) => {
  const classes = clx(
    "w-full",
    {
      // "flex flex-row items-center": orientation === "horizontal",
      "flex flex-row": orientation === "vertical",
    },
    className
  );
  const [active, setActive] = React.useState(defaultValue || value);

  const onChange = React.useCallback((value: string) => {
    setActive(value);
    onValueChange && onValueChange(value);
  }, []);

  return (
    <Tabs.Root
      orientation={orientation}
      className={classes}
      onValueChange={onChange}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <TabContext.Provider value={{ active, orientation, value }}>
        {children}
      </TabContext.Provider>
    </Tabs.Root>
  );
};

const TabItems = ({
  children,
  className,
  indicator = true,
  sliderClass,
  ...props
}: TabItemProps & React.HTMLAttributes<HTMLDivElement>) => {
  const {
    active,
    orientation = "horizontal",
    value,
  } = React.useContext(TabContext);

  const classes = clx(
    "relative",
    {
      "flex !flex-col items-center": orientation === "vertical",
    },
    className
  );

  const listRef = React.useRef<HTMLDivElement>(null);

  const slider = React.useRef<HTMLDivElement>(null);

  const sliderClasses = clx(
    "absolute opacity-0 top-0 left-0 w-0 h-[2px] transition-all duration-300 ease-in-out  bg-paper-dark dark:bg-paper",
    {
      "w-0 h-[2px]": orientation === "horizontal",
      "w-[2px] h-0": orientation === "vertical",
    },
    sliderClass
  );

  React.useEffect(() => {
    const func = () =>
      slider.current?.classList.contains("opacity-0") &&
      slider.current?.classList.remove("opacity-0");
    if (indicator) {
      const activeTab = listRef.current?.querySelector(
        ".tab-item[aria-selected=true]"
      );
      if (activeTab) {
        const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
          activeTab as HTMLDivElement;
        const styles =
          orientation === "horizontal"
            ? `top: ${offsetHeight}px; width: ${offsetWidth}px; left: ${offsetLeft}px;`
            : `top: ${offsetTop}px; height: ${offsetHeight}px; left: ${offsetWidth}px;`;

        slider.current?.setAttribute("style", styles);
        slider.current?.addEventListener("transitionend", func);
      }
    }

    return () => {
      slider.current?.removeEventListener("transitionend", func);
    };
  }, [active, value, orientation]);

  return (
    <Tabs.List className={classes} ref={listRef} {...props}>
      {children}
      {indicator && <div ref={slider} className={sliderClasses} />}
    </Tabs.List>
  );
};

const TabItem = ({
  children,
  className,
  value,
  active,
  index,
  ...props
}: Tabs.TabsTriggerProps & {
  active?: string | number | boolean;
  index?: number;
}) => {
  const classes = clx("p-2 tab-item", className);

  return (
    <Tabs.Trigger className={classes} value={value} {...props}>
      {children}
    </Tabs.Trigger>
  );
};

const TabContent = ({ className, children, ...props }: TabPanelProps) => {
  const classes = clx("flex-grow", className);
  return (
    <Tabs.Content className={classes} {...props}>
      {children}
    </Tabs.Content>
  );
};

Tab.Item = TabItem;
Tab.Items = TabItems;
Tab.Content = TabContent;

export default Tab;
