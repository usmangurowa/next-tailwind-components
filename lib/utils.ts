import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { cva as CVA, VariantProps, CxOptions } from "cva";
import { GetServerSidePropsContext } from "next";
import axios from "../apis";
export const clx = (...classes: classNames.ArgumentArray) =>
  twMerge(classNames(classes));

interface CvaProps {
  className?: classNames.Argument;
  cva?: {
    variants?: object;
    defaultVariants?: object;
  };
  values?: object;
  config?: {
    id: string;
    replacer?: string;
  };
}

export const cvaPlus = ({ className, cva, values, config }: CvaProps) => {
  return twMerge(
    classNames(className),
    CVA(cva)(values).replaceAll(`{${config?.id}}`, config?.replacer || "")
  );
};

export const cvaPlaceholder = (
  cva: string,
  config?: { placeholder: string; value: string }
) => {
  if (!cva) return;
  if (!config) return cva;
  return cva.replaceAll(
    `{${config?.placeholder}}` || "{ID}",
    config?.value || ""
  );
};

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
// // };

export const getServerProps: any = async (
  context: GetServerSidePropsContext,
  endpoint: string
) => {
  try {
    const { data, status } = await axios.get(endpoint);
    if (status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        fallback: {
          [endpoint]: data || [],
        },
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
