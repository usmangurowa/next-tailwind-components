import { useRouter } from "next/router";
import React from "react";
import { clsx } from "class-flex";
import Link from "next/link";
import { HomeIcon, ArchiveIcon, DashboardIcon } from "@radix-ui/react-icons";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <ArchiveIcon />,
  },
  {
    name: "Demo",
    href: "/demo",
    icon: <DashboardIcon />,
  },
];

const BottomNav = () => {
  const router = useRouter();
  const navRef = React.useRef<HTMLUListElement>(null);
  const slider = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const func = () =>
      slider.current?.classList.contains("opacity-0") &&
      slider.current?.classList.remove("opacity-0");
    const activeRoute = navRef.current?.querySelector(
      ".nav-item[aria-selected=true]"
    );
    if (activeRoute) {
      const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
        activeRoute as HTMLUListElement;
      slider.current?.setAttribute(
        "style",
        `top: ${offsetTop}px; width: ${offsetWidth}px; left: ${offsetLeft}px; height: ${offsetHeight}px`
      );
      slider.current?.addEventListener("transitionend", func);
    }
    return () => {
      slider.current?.removeEventListener("transitionend", func);
    };
  }, [router.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed bottom-0 left-0 w-screen shadow-inner paper"
      >
        <ul className="container relative flex flex-row items-center py-3 space-x-3">
          {links.map((link, index) => (
            <li
              aria-selected={
                link.href !== "/" && router.pathname.startsWith(link.href)
                  ? true
                  : link.href === "/" && router.pathname === "/"
                  ? true
                  : false
              }
              key={index}
              className={clsx(
                `nav-item flex-1 text-center p-2 z-10 font-semibold transition-all duration-150 ease-in`,
                {
                  "text-white dark:text-dark":
                    link.href !== "/" && router.pathname.startsWith(link.href)
                      ? true
                      : link.href === "/" && router.pathname === "/"
                      ? true
                      : false,
                }
              )}
            >
              <Link
                className="flex items-center justify-center w-full gap-2 truncate text-inherit whitespace-nowrap"
                href={link.href}
              >
                {link.icon} <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <div
            className={
              "absolute opacity-0 bottom-0 rounded-full  left-0 w-0 h-[2px] transition-['left'] duration-300 ease-in-out bg-paper-dark dark:bg-paper !mx-0"
            }
            ref={slider}
          />
        </ul>
      </nav>
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: `${navRef.current?.style.height}px` }}
      />
    </>
  );
};

export default BottomNav;
