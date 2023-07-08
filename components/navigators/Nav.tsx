import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import IconButton from "../common/IconButton";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/router";
import useStore from "@/lib/hooks/use-store";
import Button from "../common/Button";
import { links } from "@/lib/constants";
import NavIndicator from "../others/NavIndicator";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "../common/Avatar";
import { Menu } from "../common/Menu";

import dynamic from "next/dynamic";
import { getInitials } from "@/lib/utils";
import Switch from "@usmangurowa/react-switch";
import { clsx } from "class-flex";

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = React.useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme]
  );

  const { data: session, status, update } = useSession();

  const {
    dispatch,
    state: { is_logged_in },
  } = useStore();

  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      dispatch({ type: "LOGIN", payload: true });
    } else {
      dispatch({ type: "LOGOUT", payload: true });
    }
  }, [session]);

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

  return (
    <nav>
      <ul
        className={
          "container relative flex flex-row items-center py-2 space-x-3"
        }
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
            className={clsx(`nav-item p-2 hidden laptop:block`, {})}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <Switch case={`${is_logged_in}`}>
          <Switch.Case when="true">
            <li>
              <Menu modal={false}>
                <Menu.Trigger asChild>
                  <Button
                    mode="outlined"
                    rounded="full"
                    className="max-w-xs gap-1 border hover:bg-transparent"
                    size="xs"
                    right={
                      <Avatar
                        src={session?.user?.image || ""}
                        alt="Avatar"
                        size="2xs"
                        rounded="full"
                        fallback={getInitials(session?.user?.name || "")}
                      />
                    }
                  >
                    <span className="text-xs font-semibold">
                      {session?.user?.name}
                    </span>
                  </Button>
                </Menu.Trigger>
                <Menu.Content arrowPadding={5} sideOffset={5}>
                  <Menu.Item
                    onClick={() => signOut()}
                    className="whitespace-nowrap"
                  >
                    Logout
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item className="justify-between" onClick={toggleTheme}>
                    <Switch case={theme}>
                      <Switch.Case when="light">
                        <>
                          <span>Dark Mode</span> <MoonIcon />
                        </>
                      </Switch.Case>
                      <Switch.Case when="dark">
                        <>
                          <span>Light Mode</span> <SunIcon />
                        </>
                      </Switch.Case>
                    </Switch>
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </li>
          </Switch.Case>
          <Switch.Case when="false">
            <li>
              <Button mode="text" onClick={() => signIn()} size="sm">
                Login
              </Button>
            </li>
          </Switch.Case>
        </Switch>

        <NavIndicator extraKeys={[session]}>
          {({ height = 0, left, top = 0, width, className }) => (
            <div
              className={className}
              style={{
                left: `${left}px`,
                width: `${width}px`,
                top: `${top + height}px`,
              }}
            />
          )}
        </NavIndicator>
      </ul>
    </nav>
  );
};

// export default Nav;
export default dynamic(() => Promise.resolve(Nav), { ssr: false });
