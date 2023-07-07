import { GetServerSideProps } from "next";
import React from "react";

const Components = () => {
  return <div>Components</div>;
};

export default Components;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/components/input",
      permanent: false,
    },
  };
};
