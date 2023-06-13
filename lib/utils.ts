import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const clx = (...classes: classNames.ArgumentArray) =>
  twMerge(classNames(classes));

export const pseudoClx = (value: object) => {
  const result = [];
  const entries = Object.entries(value);
  const entriesLength = entries.length;

  for (let i = 0; i < entriesLength; i++) {
    const [key, classes] = entries[i];
    const classList = classes.split(" ");
    const classListLength = classList.length;
    for (let j = 0; j < classListLength; j++) {
      result.push(`${key}:${classList[j]}`);
    }
  }
  return result.join(" ");
};

//   const pseudoClx = (value: object) => {
//   return Object.entries(value)
//     .flatMap(([key, classes]) => {
//       return classes.split(" ").map((cls: string) => `${key}:${cls}`);
//     })
//     .join(" ");
// };
