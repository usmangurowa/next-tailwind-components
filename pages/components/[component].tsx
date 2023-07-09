import ComponentLayout from "@/components/layouts/ComponentLayout";
import { useRouter } from "next/router";
import React from "react";
import Tab from "@/components/navigators/Tab";
import Select from "@/components/common/Select";

import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Switch } from "@usmangurowa/react-switch";
import Grid from "@/components/containers/Grid";
import Input from "@/components/common/Input";
import { getMainLayout } from "@/components/layouts/MainLayout";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import Editor from "@/components/others/Editor";
import CardImage from "@/components/cards/CardImage";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "milk", label: "Milk" },
  { value: "dark", label: "Dark" },
  { value: "white", label: "White" },
  { value: "caramel", label: "Caramel" },
];

const Component = () => {
  const router = useRouter();
  const tab = router.query.component;
  return (
    <ComponentLayout>
      <h1 className="py-2 mb-4 text-3xl font-bold capitalize border-b">
        {tab}
      </h1>
      <Tab.Content value="input">
        <Inputs />
      </Tab.Content>
      <Tab.Content value="button">
        <Buttons />
      </Tab.Content>
      <Tab.Content value="avatar">
        <Avatars />
      </Tab.Content>
      <Tab.Content value="select">
        <Selects />
      </Tab.Content>
      <Tab.Content value="grid">
        <Grids />
        <Editors />
      </Tab.Content>
      <Tab.Content value="">
        <h1 className="text-2xl font-bold">Coming soon...</h1>
      </Tab.Content>
    </ComponentLayout>
  );
};

Component.getLayout = getMainLayout;

export default Component;

const Grids = () => {
  return (
    <>
      <CardImage
        // src={"https://images.unsplash.com/p"}
        src={img}
        alt="Image"
        className="w-72 h-72"
      />
    </>
  );
};

const Inputs = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3">
      <Input
        label="Name"
        full
        type="text"
        placeholder="Enter your name"
        mode="underlined"
        variant="secondary"
        inputSize="lg"
      />
      <Input label="Email" full type="email" placeholder="Enter email" />
      <Input label="Phone Number" type="tel" placeholder="08139223164" full />
      <Input label="DOB" type="date" full mode="outlined" />
      <Input
        label="DOB"
        type="date"
        full
        mode="underlined"
        variant="secondary"
      />
    </div>
  );
};

const Selects = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-10 laptop:grid-cols-2">
      <Select
        full
        label="Choose your favorite flavor"
        placeholder="Choose your favorite flavor"
        options={options}
        inputSize={"lg"}
        helperText="This is a helper text"
      />
      <Select
        full
        label="Choose your favorite flavors"
        placeholder="Choose your favorite flavors"
        options={options}
        multiple
        mode="outlined"
      />
      <Select
        full
        label="Choose your favorite flavors"
        placeholder="Choose your favorite flavors"
        options={options}
        multiple
        inputSize={"sm"}
        mode="underlined"
        helperText="Favorite flavors"
        error
      />
      <Select
        full
        label="Choose your favorite flavors"
        placeholder="Choose your favorite flavors"
        options={options}
        multiple
        inputSize={"lg"}
        mode="underlined"
      />
    </div>
  );
};

const Buttons = () => {
  const [type, setType] = React.useState<"contained" | "outlined" | "text">(
    "contained"
  );

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3">
        <Button size="md" variant="secondary">
          Contained Secondary
        </Button>
        {/* <div className="size-lg bg-secondary"></div> */}
        <Button size="lg">Contained</Button>
        <Button rounded="full" variant="secondary">
          Contained
        </Button>
        <Button size="sm" variant="secondary">
          Contained Secondary small Lorem ipsum dolor.
        </Button>

        <Button mode="outlined" variant="secondary">
          Outlined
        </Button>
        <Button mode="outlined" variant="secondary">
          Outlined
        </Button>
        <Button mode="outlined">cool</Button>
        <Button mode="outlined" variant="secondary">
          cool
        </Button>
        <Button size="sm" mode="text" variant="secondary">
          Text
        </Button>
        <Button loading variant="secondary">
          Outlined
        </Button>
        <h1 className="col-span-3 py-2 text-3xl font-bold capitalize border-b">
          Icon Button
        </h1>
        <IconButton size="lg">
          <TwitterLogoIcon />
        </IconButton>
        <IconButton rounded="full" mode="outlined">
          <TwitterLogoIcon />
        </IconButton>
        <IconButton
          rounded="full"
          mode="outlined"
          size="sm"
          variant="secondary"
        >
          <TwitterLogoIcon />
        </IconButton>
        <IconButton rounded="full" mode="outlined" loading>
          <TwitterLogoIcon />
        </IconButton>
      </div>
    </>
  );
};

const Avatars = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-5">
        <Avatar fallback={"US"} size="sm" src={""} alt={""} />
        <Avatar fallback={"US"} src={img} alt={""} />
        <Avatar fallback={"US"} size="lg" src={img} rounded="full" alt={""} />
        <Avatar src={img} alt={""} fallback={"US"} size="lg" />
        <div className="size-md bg-secondary"></div>
        {/* <div className="size-lg paper"></div> */}
      </div>
      <div className="flex gap-5">
        <Avatar alt={""} fallback={"US"} size="sm" src={img} rounded="full" />
        <Avatar alt={""} fallback={"US"} src={img} rounded="full" />
        <Avatar alt={""} fallback={"US"} size="lg" src={img} rounded="full" />
        <Avatar alt={""} fallback={"US"} size="xl" src={img} rounded="full" />
        <Avatar alt={""} fallback={"US"} size="2xl" src={img} rounded="full" />
        <Avatar alt={""} fallback={"US"} size="3xl" src={img} rounded="full" />
      </div>
    </>
  );
};

const Editors = () => {
  return (
    <Editor
      // height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
};

const img =
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80";
