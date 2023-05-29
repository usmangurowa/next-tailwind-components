import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-300 ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
