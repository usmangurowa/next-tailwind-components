import { roundness, sizes } from "@/lib/constants";

import { clf, clsx } from "class-flex";

import React from "react";

interface SkeletonClassProps {
  size?: keyof typeof sizes;
  rounded?: keyof typeof roundness;
  avatar?: boolean;
  text?: boolean;
  full?: boolean;
  fullW?: boolean;
}

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonClassProps {
  w?: string;
  h?: string;
}

const skeleton = clf(
  "animate-pulse overflow-hidden",
  ({ rounded, size }: SkeletonClassProps) => ({
    variants: {
      rounded: {
        [rounded as string]: roundness[rounded as keyof typeof roundness],
      },
      size: {
        [size as string]: sizes[size as keyof typeof sizes],
      },
      avatar: {
        true: "rounded-full",
      },
      text: {
        true: "rounded-md w-20 h-4",
      },
      full: {
        true: "w-full h-full",
      },
      fullW: {
        true: "w-full",
      },
    },
  })
);

const Skeleton = ({
  className,
  size = "md",
  rounded = "md",
  avatar,
  text,
  w,
  h,
  full,
  fullW,
  style,
  ...props
}: SkeletonProps) => {
  const classes = React.useMemo(
    () => skeleton({ avatar, className, rounded, size, text, fullW, full }),
    [rounded, size, avatar, text, fullW, full, className]
  );
  return (
    <div
      className={classes}
      style={{
        ...(w && { width: w }),
        ...(h && { height: h }),
        ...style,
      }}
      {...props}
    >
      <div className="w-full h-full bg-gray-200 dark:bg-paper-dark" />
    </div>
  );
};

export default Skeleton;
