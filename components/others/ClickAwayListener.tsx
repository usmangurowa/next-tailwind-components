import React from "react";

interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: React.ReactNode;
  containerRef: any;
  className?: string;
}

const ClickAwayListener = ({
  onClickAway,
  children,
  containerRef,
  className,
}: ClickAwayListenerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const { target } = event;
      const containerNode = containerRef.current || ref.current;
      if (containerNode && !containerNode.contains(target)) {
        onClickAway();
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClickAway]);

  return containerRef.current ? (
    <>{children}</>
  ) : (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
