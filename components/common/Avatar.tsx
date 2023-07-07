import React from "react";

import { roundness, sizes } from "@/lib/constants";

import Image, { ImageProps } from "next/image";
import { clf, clsx } from "class-flex";

interface AvatarProps extends Omit<ImageProps, "src"> {
  fallback?: React.ReactNode;
  rounded?: keyof typeof roundness;
  size?: keyof typeof sizes;
  quality?: number;
  src?: string;
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
  };
}

const root = clf(
  "inline-flex items-center justify-center align-middle overflow-hidden self-start relative",
  ({
    size,
    rounded,
  }: {
    size: keyof typeof sizes;
    rounded: keyof typeof roundness;
  }) => ({
    variants: {
      size: {
        [size]: sizes[size],
      },
      rounded: {
        [rounded]: roundness[rounded],
      },
    },
  })
);

const fallbackClass = clf(
  "w-full h-full bg-primary-400 flex items-center justify-center",
  ({ size }: { size: keyof typeof sizes }) => ({
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
      },
    },
  })
);

const Avatar = ({
  src = "",
  alt = "avatar",
  fallback = "US",
  rounded = "md",
  size = "md",
  quality = 100,
  classNames,
}: AvatarProps) => {
  const classes = {
    root: clsx(root({ size, rounded }), classNames?.root),
    image: clsx("w-full h-full object-cover", classNames?.image),
    fallback: clsx(fallbackClass({ size }), classNames?.fallback),
  };
  return (
    <div className={classes.root}>
      {src && (
        <Image
          loading="lazy"
          quality={quality}
          fill
          src={src}
          className={classes.image}
          alt={alt}
        />
      )}
      <div className={classes.fallback}>{fallback}</div>
    </div>
  );
};

export default Avatar;
