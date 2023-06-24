import React from "react";

import { clf } from "class-flex";

const grids = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: keyof typeof grids;
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const grid = clf("grid", ({ cols }: { cols?: keyof typeof grids }) => ({
  variants: {
    cols: {
      [cols as keyof typeof grids]: grids[cols as keyof typeof grids],
    },
  },
}));

const Grid = ({ className, children, cols = 2 }: GridProps) => {
  const classes = React.useMemo(
    () => grid({ cols, className }),
    [className, cols]
  );

  console.log(classes);
  return <div className={classes}>{children}</div>;
};

export default Grid;

const GridItem = ({ children, className }: GridItemProps) => {
  return <div>{children}</div>;
};
