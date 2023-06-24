import Button from "@/components/common/Button";
import React from "react";
import { useTheme } from "next-themes";
import Input from "@/components/common/Input";
import { EyeClosedIcon, EyeOpenIcon, Cross1Icon } from "@radix-ui/react-icons";

import IconButton from "@/components/common/IconButton";
import Link from "next/link";
import Skeleton from "@/components/common/Skeleton";
import Sheet from "@/components/dialogs/Sheet";
import Modal from "@/components/dialogs/Modal";
import Tab from "@/components/navigators/Tab";
import { useRouter } from "next/router";
import Overlay from "@/components/dialogs/Overlay";

const data = [1, 2, 3, 4, 5, 6, 7];

const Index = () => {
  const { setTheme, theme } = useTheme();

  const switchTeam = () => setTheme(theme === "light" ? "dark" : "light");

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();
  // console.log(router.pathname);
  const [tab, setTab] = React.useState(router.query.tab as string);

  const switchTab = React.useCallback(
    (tab: string) => {
      router.push(
        {
          pathname: "/",
          query: { tab },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router.query.tab]
  );

  const activeTab = React.useMemo(() => {
    return (router.query.tab as string) || "home";
  }, [router.query.tab]);

  return (
    <>
      <div className="container min-h-screen gap-5 space-x-5 space-y-5 ">
        <Sheet open={open} onClose={() => setOpen(false)}>
          <Sheet.Content className="w-full h-full">
            <ul>
              {data.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Sheet.Content>
        </Sheet>

        <Link href="/blog">Go to blog</Link>
        <h1 className="text-4xl font-bold">Hello World</h1>
        <Button
          left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          // rounded="lg"
          // size="sm"
          className=""
          onClick={() => setModalOpen(!open)}
        >
          Open Modal
        </Button>
        <Button
          left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          rounded="lg"
          size="sm"
          className=""
          mode="outlined"
          onClick={() => setOpen(!open)}
        >
          Open Sheet
        </Button>
        <div className="p-10 rounded-md paper">
          <h1 className="text-4xl font-bold">Hello World</h1>
        </div>
        <Button
          left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          rounded="lg"
          size="sm"
          className="bg-secondary"
          variant="secondary"
          mode="text"
          onClick={switchTeam}
        >
          Switch Theme
        </Button>
        <Skeleton avatar size={10} className="w-10 h-10" />
        <IconButton loading mode="outline" onClick={switchTeam}>
          {theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </IconButton>
        <IconButton mode="text">
          <Cross1Icon color="#fff" />
        </IconButton>
        <Input size="sm" type="text" placeholder="Enter your name" />
        <Input size="md" type="text" placeholder="Enter your name" />
        <Input size="lg" type="text" placeholder="Enter your name" />
        <Input
          size="sm"
          type="text"
          placeholder="Enter your name"
          mode="outline"
        />
        <div className="container grid w-full grid-cols-1 gap-10 my-10 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          <div className="relative w-full p-5 paper h-fit rounded-2xl dark:bg-gray-900">
            <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="relative w-full p-5 paper h-fit rounded-2xl dark:bg-gray-900">
            <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="relative w-full p-5 paper h-fit rounded-2xl dark:bg-gray-900">
            <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="relative w-full p-5 paper h-fit rounded-2xl dark:bg-gray-900">
            <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
// [&>*]:invisible
