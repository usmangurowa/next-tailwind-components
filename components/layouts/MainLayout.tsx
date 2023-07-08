import React from "react";
import Nav from "../navigators/Nav";
import BottomNav from "../navigators/BottomNav";

const MainLayout = ({ children }: CommonProp) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-1">{children}</div>
      <BottomNav />
    </main>
  );
};

export default MainLayout;

export const getMainLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);
