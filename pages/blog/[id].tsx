import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Skeleton from "@/components/common/Skeleton";
import useServerSWR from "@/lib/hooks/use-server-swr";
import { getServerProps } from "@/lib/utils";
import { GetServerSideProps } from "next";

const API = "https://jsonplaceholder.typicode.com/posts/";

const Blog = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating, mutate } = useServerSWR<any>(
    `${API}${router?.query?.id}`
  );

  return (
    <main className="container">
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <Skeleton className="w-40 h-5 rounded-md" />
        ) : (
          <h1 className="text-2xl">{data?.title}</h1>
        )}
      </div>
    </main>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getServerProps(context, `${API}${context?.query?.id}`);
};
