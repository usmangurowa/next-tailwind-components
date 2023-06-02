import { twMerge } from "tailwind-merge";
import classNames from "classnames";

classNames();

export const clx = (...classes: classNames.ArgumentArray) =>
  twMerge(classNames(classes));
