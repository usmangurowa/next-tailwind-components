import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Root,
  Image,
  Fallback,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarProps as AvatarProps_,
} from "@radix-ui/react-avatar";
import { clx } from "@/lib/utils";
import { roundness, sizes } from "@/lib/constants";

interface AvatarProps extends AvatarImageProps {
  fallback?: React.ReactNode;
  rounded?: keyof typeof roundness;
  size?: keyof typeof sizes;
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
  };
}

const Avatar = ({
  src,
  alt = "avatar",
  delayMs,
  fallback = "US",
  rounded = "md",
  size = "md",
  classNames,
}: AvatarProps & AvatarProps_ & AvatarFallbackProps) => {
  const classes = {
    root: clx(
      "inline-flex items-center justify-center align-middle overflow-hidden",
      {
        [roundness[rounded]]: rounded,
        [sizes[size]]: size,
      },
      classNames?.root
    ),
    image: clx("w-full h-full object-cover", classNames?.image),
    fallback: clx(
      "w-full h-full bg-primary-400 flex items-center justify-center",
      classNames?.fallback
    ),
  };
  return (
    <Root className={classes.root}>
      <Image src={src} className={classes.image} alt={alt} />
      <Fallback className={classes.fallback} delayMs={delayMs}>
        {fallback}
      </Fallback>
    </Root>
  );
};

export default Avatar;

const img =
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80";
