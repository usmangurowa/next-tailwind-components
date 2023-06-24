import React from "react";

interface ClickAwayListenerProps {
  onClickAway?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ClickAwayListener = ({
  onClickAway,
  children,
  className,
}: ClickAwayListenerProps) => {
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const { target } = event;
      const containerNode = ref.current;
      if (containerNode && !containerNode.contains(target)) {
        onClickAway && onClickAway();
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClickAway, ref]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
