import CodeEditor, { EditorProps } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import React from "react";

const Editor = ({ className, ...props }: EditorProps) => {
  const { theme } = useTheme();
  return (
    <CodeEditor
      height="50vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      {...props}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
    />
  );
};

export default dynamic(() => Promise.resolve(Editor), { ssr: false });
