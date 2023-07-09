import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import NavIndicator from "../others/NavIndicator";
import { clf, clsx } from "class-flex";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";

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
  const classes = clsx(
    "w-full",
    {
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
    <>
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
    </>
  );
};

const tabList = clf("relative transition-all", {
  variants: {
    orientation: {
      horizontal: "flex flex-row ",
      vertical: "flex flex-col items-center",
    },
  },
});

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

  return (
    <Tabs.List className={tabList({ orientation, className })} {...props}>
      {children}
      {indicator && (
        <NavIndicator
          activeQuery=".tab-item[aria-selected=true]"
          extraKeys={[active, value, orientation]}
        >
          {({ height, left, top, width, className }) => (
            <NavIndicator.Indicator
              className={clsx(className, {
                "w-0 h-[2px]": orientation === "horizontal",
                "w-[2px] h-0": orientation === "vertical",
              })}
              {...(orientation === "horizontal"
                ? { top: height, width, left, height: 3 }
                : { top, height, left: width, width: 3 })}
            />
          )}
        </NavIndicator>
      )}
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
  const classes = clsx("p-2 tab-item", className);

  return (
    <Tabs.Trigger className={classes} value={value} {...props}>
      {children}
    </Tabs.Trigger>
  );
};

const TabContent = ({ className, children, ...props }: TabPanelProps) => {
  const classes = clsx("flex-grow", className);
  return (
    <>
      <Tabs.Content className={classes} {...props}>
        {children}
      </Tabs.Content>
    </>
  );
};

Tab.Item = TabItem;
Tab.Items = TabItems;
Tab.Content = TabContent;

export default Tab;
