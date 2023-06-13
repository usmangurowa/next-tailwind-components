import Input from "@/components/common/Input";
import Tab from "@/components/navigators/Tab";
import { clx } from "@/lib/utils";
import React from "react";
// import Select from "react-select";

import Select from "@/components/common/Select";
import Avatar from "@/components/common/Avatar";

const languages = ["javascript", "typescript", "python"];

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "milk", label: "Milk" },
  { value: "dark", label: "Dark" },
  { value: "white", label: "White" },
  { value: "caramel", label: "Caramel" },
];

const Demo = () => {
  const [selected, setSelected] = React.useState("");
  return (
    <Tab
      orientation="vertical"
      defaultValue={languages[0]}
      className="grid gap-10 tablet:grid-cols-1 laptop:grid-cols-12"
    >
      <aside className="hidden border-r border-gray-500 laptop:flex laptop:col-span-2">
        <Tab.Items orientation="vertical" className="w-full">
          {languages.map((lang) => (
            <Tab.Item
              key={lang}
              value={lang}
              className="w-full px-5 py-2 text-left capitalize"
            >
              {lang}
            </Tab.Item>
          ))}
        </Tab.Items>
      </aside>
      <main className="container min-h-screen laptop:col-span-10">
        {languages.map((lang) => (
          <Tab.Content key={lang + 1} value={lang} className="w-full h-full">
            <div className="w-full h-full p-5 space-y-10 border">
              <h1 className="capitalize">{lang}</h1>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aspernatur voluptatem molestiae adipisci minus perferendis ipsa
                explicabo unde distinctio dolor veritatis nam officia iure,
                dignissimos, ad placeat vel asperiores voluptatibus saepe?
              </span>

              <Avatar
                classNames={{ image: "grayscale" }}
                size="3xl"
                rounded="full"
                src={
                  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                }
                fallback={"US"}
              />

              {/* <div className="p-2 paper size-3xl"></div>r */}

              <Select
                // className="w-xs"
                options={options}
                // renderOption={({ value, label }) => (
                //   <div className="p-4 hover:bg-dark">
                //     <span>{label}</span>
                //   </div>
                // )}
              />
              <Select
                options={options}
                multiple
                size={"lg"}
                containerClassName="w-full"
              />
              <Input placeholder="Input" label="Input field" />
            </div>
          </Tab.Content>
        ))}
      </main>
    </Tab>
  );
};

export default Demo;
