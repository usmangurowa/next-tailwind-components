import { clx } from "@/lib/utils";

import React from "react";

const roundness = {
  none: "rounded-none",
  rounded: "rounded",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: string;
  h?: string;
  size?: number;
  rounded?: keyof typeof roundness;
  avatar?: boolean;
  text?: boolean;
}

const Skeleton = ({
  className,
  size,
  rounded,
  avatar,
  text,
  ...props
}: SkeletonProps) => {
  const sizeClass = size ? `w-${size} h-${size}` : "w-40 h-40";
  const classes = clx(
    "animate-pulse overflow-hidden",
    {
      [roundness[rounded || "md"]]: true,
      [sizeClass]: true,
      "rounded-full w-10 h-10": avatar,
      "rounded-md w-20 h-4": text,
    },
    className
  );
  return (
    <div className={classes} {...props}>
      <div className="w-full h-full bg-paper-dark" />
    </div>
  );
};

export default Skeleton;
