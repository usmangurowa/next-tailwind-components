import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import IconButton from "../common/IconButton";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { clx } from "@/lib/utils";
import { useRouter } from "next/router";
import useStore from "@/lib/hooks/use-store";
import Button from "../common/Button";
import { links } from "@/lib/constants";
import NavIndicator from "../others/NavIndicator";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "../common/Avatar";
import { Menu } from "../common/Menu";
import { RemoveScroll } from "react-remove-scroll";
// import {} from '@radix-ui/react-icons'

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import dynamic from "next/dynamic";
import { getInitials } from "@/lib/index";

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = React.useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme]
  );

  const { data: session, status, update } = useSession();

  // console.log(session);

  const {
    dispatch,
    state: { is_logged_in },
  } = useStore();

  const router = useRouter();

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
    <nav className={RemoveScroll.classNames.fullWidth}>
      <ul
        className={
          "container relative flex flex-row items-center py-2 space-x-3 "
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
            className={clx(`nav-item p-2`, {})}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
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
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal className="relative">
            <DropdownMenu.Content
              arrowPadding={5}
              className="z-50 min-w-[12rem] overflow-hidden rounded-md paper p-1 data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={5}
            >
              <DropdownMenu.Arrow className="absolute w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 rounded-full text-paper dark:text-paper-dark" />
              <DropdownMenu.Item className="DropdownMenuItem">
                New Tab <div className="RightSlot">⌘+T</div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <li className="p-2">
          <Menu>
            <Menu.Trigger>
              <IconButton onClick={toggleTheme} size="xs">
                {theme === "light" ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </Menu.Trigger>
            <RemoveScroll enabled={false} removeScrollBar={true}>
              <Menu.Portal>
                <Menu.Content>
                  <Menu.Item onClick={() => setTheme("dark")}>Dark</Menu.Item>
                  <Menu.Item onClick={() => setTheme("light")}>Light</Menu.Item>
                </Menu.Content>
              </Menu.Portal>
            </RemoveScroll>
          </Menu>
        </li>
        <li>
          <Button onClick={() => (session ? signOut() : signIn())} size="sm">
            {session ? "Logout" : "Login"}
          </Button>
        </li>
        <NavIndicator>
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
