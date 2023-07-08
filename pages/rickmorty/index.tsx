import Input from "@/components/common/Input";
import { getMainLayout } from "@/components/layouts/MainLayout";
import Pagination from "@/components/navigators/Pagination";
import useServerSWR from "@/lib/hooks/use-server-swr";
import { getServerProps, objectToQueryString } from "@/lib/utils";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { NextPageWithLayout } from "../_app";

interface InfoType {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

const API = "https://rickandmortyapi.com/api/character";
const RickMorty: NextPageWithLayout = () => {
  const router = useRouter();
  const page: number = Number(router.query?.page) || 1;

  const { data, isLoading } = useServerSWR<{
    results: Character[];
    info: InfoType;
  }>(`${API}/?${objectToQueryString({ page })}`);

  const info: { currentPage: number; totalPages: number } = React.useMemo(
    () => ({ currentPage: page, totalPages: data?.info.pages || 1 }),
    [data, page]
  );

  const handleNext = (page: number) => {
    router.push(`/rickmorty?page=${page + 1}`);
  };

  const handlePrev = (page: number) => {
    if (page === 1) return;
    router.push(`/rickmorty?page=${page - 1}`);
  };

  return (
    <div className="container grid grid-cols-4 gap-5 py-20">
      <div className="col-span-4">
        <Input
          inputSize="lg"
          mode="underlined"
          full
          placeholder="Search for character"
        />
      </div>
      <div className="col-span-4">
        <Pagination
          onNext={handleNext}
          onPrev={handlePrev}
          total={info?.totalPages}
          page={info?.currentPage}
          buttonProps={{
            rounded: "full",
            size: "xs",
          }}
        />
      </div>
      {isLoading ? "loading..." : null}
      {data?.results?.map((character: Character, index: number) => (
        <div key={index} className="p-5 paper rounded-xl">
          <img src={character.image} alt={character.name} />
          <p className="font-bold">{character.name}</p>
        </div>
      ))}
      <div className="col-span-4">
        <Pagination
          onNext={handleNext}
          onPrev={handlePrev}
          total={info?.totalPages}
          page={info.currentPage}
          buttonProps={{
            rounded: "full",
            size: "xs",
          }}
        />
      </div>
    </div>
  );
};

RickMorty.getLayout = getMainLayout;

export default RickMorty;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const page = context.query?.page || 1;
  return await getServerProps(`${API}/?${objectToQueryString({ page })}`);
};
