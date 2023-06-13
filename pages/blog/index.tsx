"use client";

import Modal from "@/components/dialogs/Modal";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense } from "react";
import useSWR, { mutate } from "swr";

import dynamic from "next/dynamic";
import Skeleton from "@/components/common/Skeleton";

const API = "https://jsonplaceholder.typicode.com/todos";
const data = [1, 2, 3, 4, 5, 6, 7];

const Blog = ({ fallback }: any) => {
  const router = useRouter();

  const { data, error, isLoading, isValidating } = useSWR(API);

  return (
    <>
      <Modal
        open={!!router.query.id}
        onClose={() => router.push("/blog")}
        responsive
      >
        <Modal.Content className="p-10">
          <PostModal id={router.query.id as string} />
        </Modal.Content>
      </Modal>

      <div className="container hidden laptop:hidden desktop:hidden tablet:block">
        Tablet
      </div>

      <div className="container grid grid-cols-2 gap-10 py-10 laptop:grid-cols-4">
        {isLoading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} className="w-full h-40 rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {data?.map((post: any, index: number) => (
              <div key={index} className="p-5 paper rounded-xl">
                <Link
                  href={`/blog/?id=${post?.id}`}
                  as={`/blog/${post?.id}`}
                  className="font-bold"
                  passHref
                >
                  {post?.title}
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

// export default Blog;

export default dynamic(() => Promise.resolve(Blog), { ssr: false });

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { data, status } = await axios.get(API);
//   if (status === 404) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       fallback: {
//         [API]: data || [],
//       },
//     },
//   };
// };

const PostModal = ({ id }: { id: string }) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null,
    {
      fallbackData: { id },
    }
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl">{data?.title}</h1>
    </div>
  );
};
