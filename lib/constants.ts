import {
  HomeIcon,
  ArchiveIcon,
  DashboardIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";

export const roundness = {
  none: "rounded-none",
  rounded: "rounded",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export const padding_sizes = {
  xs: "px-1.5 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-6 py-4 text-lg",
};

export const icon_sizes = {
  xs: "p-1.5 text-xs",
  sm: "p-3 text-sm",
  md: "p-4 text-base",
  lg: "p-6 text-lg",
};

export const sizes = {
  none: "w-0 h-0 min-w-0 min-h-0",
  "3xs": "w-5 h-5 min-w-5 min-h-5",
  "2xs": "w-8 h-8 min-w-8 min-h-8",
  xs: "w-12 h-12 min-w-12 min-h-12",
  sm: "w-14 h-14 min-w-14 min-h-14",
  md: "w-16 h-16 min-w-16 min-h-16",
  lg: "w-20 h-20 min-w-20 min-h-20",
  xl: "w-24 h-24 min-w-24 min-h-24",
  "2xl": "w-32 h-32 min-w-32 min-h-32",
  "3xl": "w-40 h-40 min-w-40 min-h-40",
};

export const links = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: ArchiveIcon,
  },
  {
    name: "Rick & Morty",
    href: "/rickmorty",
    icon: ActivityLogIcon,
  },
  {
    name: "Components",
    href: "/components",
    icon: DashboardIcon,
  },
];

export const providers = [
  {
    name: "Google",
    id: "google",
    type: "oauth",
  },
  {
    name: "Github",
    id: "github",
    type: "oauth",
  },
];
