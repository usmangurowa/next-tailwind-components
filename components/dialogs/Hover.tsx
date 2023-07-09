import React from "react";
import {
  Trigger,
  Root,
  Arrow,
  Content,
  Portal,
  HoverCardProps,
  HoverCardContentProps,
} from "@radix-ui/react-hover-card";
import { clsx } from "class-flex";

const Hover = (props: HoverCardProps) => <Root {...props} />;

const HoverContent = ({
  withArrow = true,
  children,
  className,
  ...props
}: HoverCardContentProps & { withArrow?: boolean }) => (
  <Portal>
    <Content
      {...props}
      className={clsx(
        "z-50 min-w-[12rem] overflow-hidden rounded-md p-1 paper data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
    >
      {children}

      {withArrow ? (
        <Arrow className="text-paper-mid dark:text-paper-dark !my-0 !mx-0" />
      ) : null}
    </Content>
  </Portal>
);

Hover.Root = Root;
Hover.Trigger = Trigger;
Hover.Content = HoverContent;

export default Hover;
export { Hover, Root, Trigger };
