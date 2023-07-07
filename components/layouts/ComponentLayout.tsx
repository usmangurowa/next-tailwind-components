import React from "react";
import Switch from "@usmangurowa/react-switch";
import Tab from "../navigators/Tab";
import { useRouter } from "next/router";

const tabs = [
  "input",
  "select",
  "button",
  "avatar",
  "tab",
  "grid",
  "modal",
  "sheet",
];

const ComponentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const tab = router.query.component;

  const handleChangeTab = React.useCallback(
    (pathname: string) => {
      router.push(`/components/${pathname}`);
    },
    [router.pathname]
  );

  // if (!router.isReady) return null

  return (
    <Tab
      value={tab as string}
      onValueChange={handleChangeTab}
      orientation="vertical"
      defaultValue={tabs[0]}
      className="grid gap-10 tablet:grid-cols-1 laptop:grid-cols-12"
    >
      <aside className="hidden border-r border-gray-500 laptop:flex laptop:col-span-2">
        <Tab.Items orientation="vertical" className="w-full">
          {tabs.map((tab) => (
            <Tab.Item
              key={tab}
              value={tab}
              className="w-full px-5 py-2 text-left capitalize"
            >
              {tab}
            </Tab.Item>
          ))}
        </Tab.Items>
      </aside>

      <main className="container min-h-screen laptop:col-span-10">
        {router.isReady ? children : null}
      </main>
    </Tab>
  );
};

export default ComponentLayout;
