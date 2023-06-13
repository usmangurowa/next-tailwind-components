import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import userServerSWR from "@/lib/hooks/use-server-swr";
import Skeleton from "@/components/common/Skeleton";

const Blog = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
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
