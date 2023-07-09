import React from "react";
import Switch from "@usmangurowa/react-switch";
import Tab from "../navigators/Tab";
import { useRouter } from "next/router";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const tabs = [
  "input",
  "select",
  "button",
  "avatar",
  "tab",
  "grid",
  "modal",
  "sheet",
  "cards",
];

const ComponentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const tab = router.query.component;

  const previousTab = React.useRef(tab);

  const handleChangeTab = React.useCallback(
    (pathname: string) => {
      router.push(`/components/${pathname}`);
    },
    [router.pathname]
  );

  React.useEffect(() => {
    previousTab.current = tab;
  }, [tab]);

  return (
    <>
      <style>
        {tabs.indexOf(previousTab.current as string) >
        tabs.indexOf(tab as string)
          ? `
          .fade-enter {
            opacity: 0;
            transform: translateY(-100%);
          }
          .fade-exit {
            opacity: 1;
            transform: translateY(0%);
          }
          .fade-enter-active {
            opacity: 1;
            transform: translateY(0%);
          }
          .fade-exit-active {
            opacity: 0;
            transform: translateY(100%);
          }
          .fade-enter-active,
          .fade-exit-active {
            transition: opacity 300ms, transform 300ms;
          }
        `
          : `
          .fade-enter {
            opacity: 0;
            transform: translateY(100%);
          }
          .fade-exit {
            opacity: 1;
            transform: translateY(0%);
          }
          .fade-enter-active {
            opacity: 1;
            transform: translateY(0%);
          }
          .fade-exit-active {
            opacity: 0;
            transform: translateY(-100%);
          }
          .fade-enter-active,
          .fade-exit-active {
            transition: opacity 300ms, transform 300ms;
          }
        `}
      </style>
      <Tab
        value={tab as string}
        onValueChange={handleChangeTab}
        orientation="vertical"
        defaultValue={tabs[0]}
        className="grid gap-10 overflow-y-hidden tablet:grid-cols-1 laptop:grid-cols-12"
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
        <SwitchTransition mode="out-in">
          <CSSTransition key={tab as string} timeout={300} classNames="fade">
            <main
              className={`container min-h-screen overflow-x-hidden laptop:col-span-10 overflow-y-auto`}
            >
              {router.isReady ? children : null}
            </main>
          </CSSTransition>
        </SwitchTransition>
      </Tab>
    </>
  );
};

export default ComponentLayout;
