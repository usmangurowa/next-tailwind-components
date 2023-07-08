import React from "react";
import {
  DropdownMenu,
  Root,
  Content,
  SubContent,
  Trigger,
  SubTrigger,
  Arrow,
  Portal,
  Group,
  RadioGroup,
  Item,
  ItemIndicator,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
} from "@radix-ui/react-dropdown-menu";

import { clsx } from "class-flex";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@radix-ui/react-icons";

const MenuGroup = Group;

const MenuPortal = Portal;

const MenuSub = SubTrigger;

const MenuRadioGroup = RadioGroup;

// const Menu = React.forwardRef<
//   React.ElementRef<typeof Root> & any,
//   React.ComponentPropsWithoutRef<typeof any>
//     >(({ ...props }, ref) => <Root {...props} />);

const Menu = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Root>) => (
  <Root {...props}>{children}</Root>
);

Menu.displayName = Root.displayName;

const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={clsx(
      //   "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));

MenuTrigger.displayName = Trigger.displayName;

const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={clsx(
      //   "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="w-4 h-4 ml-auto" />
  </SubTrigger>
));
MenuSubTrigger.displayName = SubTrigger.displayName;

const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={clsx(
      //   "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
MenuSubContent.displayName = SubContent.displayName;

const MenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & {
    withArrow?: boolean;
  }
>(
  (
    {
      className,
      align = "start",
      alignOffset = -4,
      sideOffset = 8,
      withArrow = true,
      ...props
    },
    ref
  ) => (
    <Portal>
      <Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={clsx(
          "z-50 min-w-[12rem] overflow-hidden rounded-md p-1 paper data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {withArrow ? (
          <Arrow className="absolute w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-full text-paper dark:text-paper-dark" />
        ) : null}
        {props.children}
      </Content>
    </Portal>
  )
);

MenuContent.displayName = Content.displayName;

const MenuItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={clsx(
      "relative flex whitespace-nowrap dark:hover:bg-dark cursor-pointer hover:bg-gray-50 gap-4  w-full  select-none items-center rounded px-2 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      {
        "pl-8": inset,
      },
      className
    )}
    {...props}
  />
));
MenuItem.displayName = Item.displayName;

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={clsx(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <CheckIcon className="w-4 h-4" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));
MenuCheckboxItem.displayName = CheckboxItem.displayName;

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={clsx(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <CircleIcon className="w-2 h-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
MenuRadioItem.displayName = RadioItem.displayName;

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={clsx(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenuLabel.displayName = Label.displayName;

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={clsx("-mx-1 my-1 h-px bg-gray-500", className)}
    {...props}
  />
));
MenuSeparator.displayName = Separator.displayName;

const MenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clsx(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
MenuShortcut.displayname = "MenuShortcut";

Menu.Item = MenuItem;
Menu.Trigger = MenuTrigger;
Menu.Content = MenuContent;
Menu.Separator = MenuSeparator;
Menu.Label = MenuLabel;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Portal = MenuPortal;
Menu.SubContent = MenuSubContent;
Menu.SubTrigger = MenuSubTrigger;
Menu.Group = MenuGroup;

export {
  Menu,
  //   MenuMenu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuPortal,
  MenuSubContent,
  MenuSubTrigger,
  MenuGroup,
  MenuSub,
  MenuShortcut,
};
