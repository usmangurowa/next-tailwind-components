import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface VariantConfig<V extends object = object> {
  variants?: {
    [K in keyof V]?: {
      [key: string]:
        | string
        | {
            [key: string]: string;
          };
    };
  };
  defaultVariants?: {
    [K in keyof V]?:
      | string
      | {
          [key: string]: string;
        };
  };

  responsive?: {
    [key: string]: string;
  };

  className?: string;
  class?: string;
}

type ConfigFunction<V extends object = object> = (prop: V) => VariantConfig<V>;

interface PropsType<V extends object = object> {
  [key: string]: string | number | boolean | object | null | undefined;
}

const falsyToString = <T extends unknown>(value: T) =>
  typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;

const clf = <V extends object = object>(
  base: string,
  config?: VariantConfig<V> | ConfigFunction<V>
) => {
  // if config is a function, call it with the prop
  const resolvedConfig = typeof config === "function" ? config : () => config;

  // return a function that takes a prop and returns a strieng of classnames
  return (prop: PropsType | V) => {
    //   destructure the values from the resolvedConfig
    const resolved = resolvedConfig(prop as any);
    if (!resolved) return base;
    const {
      defaultVariants = {},
      variants = {},
      class: _class = "",
      className = "",
      responsive = {},
    } = resolved;

    if (variants === null) return `${base} ${className} ${_class}`;

    // if there are no variants, return the base class
    //   if (!variants) return base;
    // map over the variants and return the classnames
    const classes = Object.keys(variants).map((v) => {
      // get the variant prop and default variant prop
      const variantProp = prop?.[v as keyof typeof prop];
      const defaultVariantProp =
        defaultVariants?.[v as keyof typeof defaultVariants];

      // if the variant prop or defaultVariantProp is null, return an empty string
      if (variantProp === null && defaultVariantProp === null) return "";

      // if the variant prop is an object, get the variant and value
      if (
        typeof variantProp === "object" ||
        typeof defaultVariantProp === "object"
      ) {
        const variantKey = variantProp || (defaultVariantProp as any);
        const [[variant, value]] = Object.entries(
          variantProp || defaultVariantProp
        );

        return variants?.[v as keyof typeof variants]?.[variant]?.[
          value as keyof typeof variantProp
        ];
      }

      // get the variant key from the variant prop or defaultVariantProp
      const variantKey = (falsyToString(variantProp) ||
        falsyToString(defaultVariantProp)) as keyof typeof variants;

      // return the variant value from the variant key
      return variants[v as keyof typeof variants][variantKey] || "";
    });

    // map over the responsive object and return the classnames
    const responsiveClasses = Object.keys(responsive).map(
      (v: keyof typeof responsive) => {
        // get the responsive prop
        return responsive?.[v]
          ?.split(" ")
          ?.map((c: string) => (v && c ? `${v + ""}:${c}` : ""));
      }
    );

    // flatten the array
    return twMerge(clsx(base, classes, responsiveClasses, className, _class));
  };
};

export { clf, clsx, twMerge };
