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
import BottomNav from "@/components/navigators/BottomNav";
import { getMainLayout } from "@/components/layouts/MainLayout";
import { useToast } from "@/components/common/Toast";

const data = [1, 2, 3, 4, 5, 6, 7];

const Index = () => {
  const { setTheme, theme } = useTheme();

  const switchTeam = () => setTheme(theme === "light" ? "dark" : "light");

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();
  // console.log(router.pathname);
  const [tab, setTab] = React.useState(router.query.tab as string);

  const toast = useToast();

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
      <div className="container min-h-screen space-y-5">
        <Sheet open={open} onClose={() => setOpen(false)}>
          <Sheet.Content className="w-full h-full">
            <ul>
              {data.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Sheet.Content>
        </Sheet>

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
          onClick={() =>
            toast({
              title: "Hello",
              description: "World",
              duration: 3000,
              status: "success",
            })
          }
        >
          shot toast
        </Button>
        <Button
          left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          rounded="lg"
          size="sm"
          className=""
          mode="outlined"
          onClick={() =>
            toast({
              title: "Hello World Error",
              description:
                "lorem ipsum dolroes sit amaesa vdasvjhbvr jhbj srbhwjr",
              duration: 3000,
              status: "error",
            })
          }
        >
          shot toast
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
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 laptop:grid-cols-4">
          {[...Array(30)].map((_, i) => (
            <div className="grid items-center w-full grid-cols-4" key={_}>
              <Skeleton avatar size="sm" className="row-span-2" />
              <Skeleton fullW text className="col-span-3" />
              <Skeleton text fullW className="col-span-3" />
              <Skeleton text fullW h="200px" className="col-span-4 my-2" />
            </div>
          ))}
        </div>
        <IconButton loading mode="outlined" onClick={switchTeam}>
          {theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </IconButton>
        <IconButton mode="text">
          <Cross1Icon color="#fff" />
        </IconButton>

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

Index.getLayout = getMainLayout;
export default Index;
