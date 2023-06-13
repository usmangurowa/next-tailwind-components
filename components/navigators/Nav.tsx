import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import IconButton from "../common/IconButton";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { clx } from "@/lib/utils";
import { useRouter } from "next/router";
import useStore from "@/lib/hooks/use-store";
import Button from "../common/Button";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Demo",
    href: "/demo",
  },
];

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = React.useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme]
  );

  const [isSticky, setIsSticky] = React.useState(false);

  const {
    dispatch,
    state: { is_logged_in },
  } = useStore();

  const router = useRouter();

  const navRef = React.useRef<HTMLUListElement>(null);
  const slider = React.useRef<HTMLDivElement>(null);

  const sliderClasses = React.useMemo(
    () =>
      clx(
        `absolute opacity-0 bottom-0 left-0 w-0 h-[2px] transition-['left'] duration-300 ease-in-out bg-paper-dark dark:bg-paper !mx-0`
      ),
    []
  );

  //   React.useEffect(() => {
  //     const handleScroll = () => {
  //       const offset = window.scrollY;
  //       if (offset > 0) {
  //         setIsSticky(true);
  //       } else {
  //         setIsSticky(false);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [router.pathname]);

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
        `top: ${
          offsetTop + offsetHeight
        }px; width: ${offsetWidth}px; left: ${offsetLeft}px`
      );
      slider.current?.addEventListener("transitionend", func);
    }
    return () => {
      slider.current?.removeEventListener("transitionend", func);
    };
  }, [router.pathname]);
  return (
    <nav>
      <ul
        ref={navRef}
        className="container relative flex flex-row items-center space-x-3"
      >
        <li>
          <Link href="/" className="text-2xl font-bold">
            Next.js Starter
          </Link>
        </li>
        <li className="flex-grow" />
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
            className={clx(`nav-item p-2`, {})}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <li className="p-2">
          <IconButton onClick={toggleTheme}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </li>
        <li>
          <Button
            onClick={() =>
              dispatch({ type: is_logged_in ? "LOGOUT" : "LOGIN" })
            }
            size="sm"
          >
            {is_logged_in ? "Logout" : "Login"}
          </Button>
        </li>
        <div className={sliderClasses} ref={slider} />
      </ul>
    </nav>
  );
};

export default Nav;
