import Button from "@/components/common/Button";
import React from "react";
import { useTheme } from "next-themes";
import Input from "@/components/common/Input";
import { EyeClosedIcon, EyeOpenIcon, Cross1Icon } from "@radix-ui/react-icons";

import IconButton from "@/components/common/IconButton";
import Link from "next/link";

const Index = () => {
  const { setTheme, theme } = useTheme();

  const switchTeam = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <div className="flex flex-col gap-5 items-center justify-center ">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button
        left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
        loading
        rounded="lg"
        size="lg"
        className=""
        onClick={switchTeam}
      >
        Switch Theme
      </Button>
      <Button
        left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
        // loading
        disabled
        rounded="lg"
        size="lg"
        className=""
        onClick={switchTeam}
      >
        Switch Theme
      </Button>
      <Link href={"/demo"}>
        <Button
          // left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          rounded="lg"
          size="sm"
          className=""
          mode="outline"
          // onClick={switchTeam}
        >
          Demo
        </Button>
      </Link>
      <Button
        left={theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
        rounded="lg"
        size="sm"
        className=""
        mode="text"
        onClick={switchTeam}
      >
        Switch Theme
      </Button>
      <IconButton loading mode="outline" onClick={switchTeam}>
        {theme === "light" ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </IconButton>
      <IconButton mode="text">
        <Cross1Icon color="#fff" />
      </IconButton>
      <Input size="sm" type="text" placeholder="Enter your name" />
      <Input
        size="sm"
        type="text"
        placeholder="Enter your name"
        mode="outline"
      />
      <div className="w-full container grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-10 my-10">
        <div className="p-5 relative w-full h-fit rounded-2xl dark:bg-gray-900">
          <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>
        <div className="p-5 relative w-full h-fit rounded-2xl dark:bg-gray-900">
          <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>
        <div className="p-5 relative w-full h-fit rounded-2xl dark:bg-gray-900">
          <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>
        <div className="p-5 relative w-full h-fit rounded-2xl dark:bg-gray-900">
          <h1 className="text-2xl">Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
// [&>*]:invisible
