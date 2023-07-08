// "use client";

import Modal from "@/components/dialogs/Modal";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense } from "react";
import useSWR, { mutate } from "swr";

import dynamic from "next/dynamic";
import Skeleton from "@/components/common/Skeleton";
import { GetServerSideProps } from "next";
import axios from "@/apis/index";
import useServerSWR from "@/lib/hooks/use-server-swr";
import { getServerProps } from "@/lib/utils";
import { getMainLayout } from "@/components/layouts/MainLayout";
// import { getServerProps } from "@/lib/utils";

const API = "https://jsonplaceholder.typicode.com/todos";

const Blog = () => {
  const router = useRouter();

  const { data, isLoading, isValidating } = useServerSWR<any[]>(API);

  return (
    <>
      <Modal
        open={!!router.query.id}
        onClose={() => router.push("/blog")}
        responsive
        blurred={false}
      >
        <Modal.Content className="p-10">
          <PostModal id={router.query.id as string} />
        </Modal.Content>
      </Modal>

      <div className="container grid grid-cols-2 gap-10 py-10 laptop:grid-cols-4">
        {data?.map((post: any, index: number) => (
          <div key={index} className="p-5 paper rounded-xl">
            <Link
              href={`/blog/?id=${post?.id}`}
              as={`/blog/${post?.id}`}
              className="font-bold"
            >
              {post?.title}
            </Link>
          </div>
        ))}

        {isLoading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className="w-full h-40 rounded-xl" />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

Blog.getLayout = getMainLayout;

export default Blog;

// export default dynamic(() => Promise.resolve(Blog), { ssr: false });

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getServerProps(API, context);
};

const PostModal = ({ id }: { id: string }) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null,
    {
      fallbackData: { id },
    }
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl">{data?.title}</h1>
    </div>
  );
};
