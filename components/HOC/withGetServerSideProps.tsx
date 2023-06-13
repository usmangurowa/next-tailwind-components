import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface WithDataProps {
  data: any; // Replace `any` with the appropriate type for your data
}

type WithDataComponent<P> = React.ComponentType<P & WithDataProps>;

const withGetServerSideProps = (fetcher: any) => (Component: NextPage) => {
  const Page = ({ data, ...props }: any) => (
    <Component {...props} data={data} />
  );

  Page.getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { data, status } = await fetcher(context);

    if (status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data,
      },
    };
  };

  return Page;
};

export default withGetServerSideProps;
