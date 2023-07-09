import { clsx } from "class-flex";
import Image, { ImageProps } from "next/image";
import React from "react";
import Skeleton from "../common/Skeleton";
import { useSetState } from "react-use";

type CardImageProps = React.HTMLAttributes<HTMLDivElement> & ImageProps;

const classes = "transition-all duration-300 ease-in-out";

const CardImage = ({ src, alt, className }: CardImageProps) => {
  const [{ error, loaded }, setState] = useSetState({
    loaded: false,
    error: false,
  });

  const handleLoadComplete = React.useCallback(
    () => setState((prev) => ({ loaded: true, error: false })),
    [loaded, src, error]
  );
  const handleError = React.useCallback(
    () => setState((prev) => ({ error: true, loaded: false })),
    [loaded, src, error]
  );

  return (
    <div className={clsx("relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={handleLoadComplete}
        onError={handleError}
        className={clsx(classes, {
          "opacity-0": !loaded,
          hidden: error,
        })}
      />
      <Skeleton
        className={clsx("w-full h-full", {
          hidden: loaded,
        })}
      />
    </div>
  );
};

export default CardImage;
