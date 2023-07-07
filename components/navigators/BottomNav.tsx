import { useRouter } from "next/router";
import React from "react";
import { clsx } from "class-flex";
import Link from "next/link";
import { links } from "@/lib/constants";
import NavIndicator from "../others/NavIndicator";

const BottomNav = () => {
  const router = useRouter();
  const navRef = React.useRef<HTMLUListElement>(null);
  const slider = React.useRef<HTMLDivElement>(null);

  const checkActive = React.useCallback(
    (link: string) => {
      const pathname = router.pathname.replace("/", "");
      link = link?.replace("/", "");
      if (!link && !pathname) {
        return true;
      }
      if (link && pathname && pathname.startsWith(link)) {
        return true;
      }
      return false;
    },

    [router.pathname]
  );

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
              aria-selected={checkActive(link.href)}
              key={index}
              className={clsx(
                `nav-item flex-1 text-center p-2 z-10 font-semibold transition-all duration-150 ease-in`,
                {
                  "text-white dark:text-dark": checkActive(link.href),
                }
              )}
            >
              <Link
                className="flex items-center justify-center w-full gap-2 truncate text-inherit whitespace-nowrap"
                href={link.href}
              >
                <link.icon /> <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <NavIndicator>
            {(prop) => (
              <NavIndicator.Indicator
                {...prop}
                className={clsx(prop.className, "rounded-full")}
              />
            )}
          </NavIndicator>
        </ul>
      </nav>
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: `${navRef.current?.style.height}px` }}
      />
      <Nav>
        {/* <ListItem link="/" active={active}> */}
        {/* <div>hi</div> */}
      </Nav>
    </>
  );
};

export default BottomNav;

const Nav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const checkActive = React.useCallback(
    (link: string) => {
      const pathname = router.pathname.replace("/", "");
      link = link?.replace("/", "");

      if (!link && !pathname) {
        return true;
      }
      if (link && pathname && pathname.startsWith(link)) {
        return true;
      }
      return false;
    },

    [router.pathname]
  );

  return (
    <nav>
      <ul>
        {React.Children.map(children, (child: any) => {
          const childLink = child.props.link;
          return React.cloneElement(child as React.ReactElement<any>, {
            active: checkActive(childLink),
          });
        })}
      </ul>
    </nav>
  );
};

interface ListItemProps {
  active?: boolean;
  children: (val: any) => React.ReactNode;
  href?: string;
  target?: "_blank" | "self" | "_parent" | "_top";
}

const ListItem = ({
  active,
  children,
  href,
  target = "self",
}: ListItemProps) => {
  return (
    <li
      className={clsx(
        "nav-item flex-1 text-center p-2 z-10 font-semibold transition-all duration-150 ease-in"
      )}
    >
      <Link href={href || "#"} target={target}>
        {children({ active })}
      </Link>
    </li>
  );
};

const Render = () => {
  return (
    <>
      <ListItem>
        {(active) => {
          return <></>;
        }}
      </ListItem>
    </>
  );
};
