import Input from "@/components/common/Input";
import { getMainLayout } from "@/components/layouts/MainLayout";
import Pagination from "@/components/navigators/Pagination";
import useServerSWR from "@/lib/hooks/use-server-swr";
import { getInitials, getServerProps, objectToQueryString } from "@/lib/utils";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { NextPageWithLayout } from "../_app";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Skeleton from "@/components/common/Skeleton";
import Avatar from "@/components/common/Avatar";
import Image from "next/image";
import Hover from "@/components/dialogs/Hover";

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

  const previousPage = React.useRef(page);

  const { data, isLoading } = useServerSWR<{
    results: Character[];
    info: InfoType;
  }>(`${API}/?${objectToQueryString({ page })}`);

  const info: { currentPage: number; totalPages: number } = React.useMemo(
    () => ({ currentPage: page, totalPages: data?.info.pages || 1 }),
    [data, page]
  );

  const handleNext = React.useCallback((page: number) => {
    previousPage.current = page;
    router.push(`/rickmorty?page=${page + 1}`);
  }, []);

  const handlePrev = React.useCallback((page: number) => {
    if (page === 1) return;
    previousPage.current = page;
    router.push(`/rickmorty?page=${page - 1}`);
  }, []);

  // React.useEffect(() => {
  //   previousPage.current = page;
  // }, [page]);

  return (
    <>
      <style>
        {previousPage.current > page
          ? `
          .fade-enter {
            opacity: 0;
            transform: translateX(-100%);
          }
          .fade-exit {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-enter-active {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-exit-active {
            opacity: 0;
            transform: translateX(100%);
          }
          .fade-enter-active,
          .fade-exit-active {
            transition: opacity 300ms, transform 300ms;
          }
        `
          : `
          .fade-enter {
            opacity: 0;
            transform: translateX(100%);
          }
          .fade-exit {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-enter-active {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-exit-active {
            opacity: 0;
            transform: translateX(-100%);
          }
          .fade-enter-active,
          .fade-exit-active {
            transition: opacity 300ms, transform 300ms;
          }
        `}
      </style>

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
        {/* {isLoading ? "loading..." : null} */}
        <SwitchTransition>
          <CSSTransition key={page} timeout={300} classNames="fade">
            <div className="grid grid-cols-4 col-span-4 gap-5">
              {isLoading ? (
                <>
                  {[...Array(30)].map((_, i) => (
                    <div
                      className="grid items-center w-full grid-cols-4"
                      key={_}
                    >
                      <Skeleton avatar size="sm" className="row-span-2" />
                      <Skeleton fullW text className="col-span-3" />
                      <Skeleton text fullW className="col-span-3" />
                      <Skeleton
                        text
                        fullW
                        h="200px"
                        className="col-span-4 my-2"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {data?.results?.map((character: Character, index: number) => (
                    <div
                      className="grid items-center w-full grid-cols-4"
                      key={index}
                    >
                      <Hover>
                        <Hover.Trigger className="cursor-pointer">
                          <Avatar
                            alt={character.name}
                            size="xs"
                            classNames={{
                              fallback: "bg-transparent",
                              root: "row-span-2 ",
                            }}
                            fallback={getInitials(character.name)}
                            src={character.image}
                            rounded="full"
                          />
                          <Hover.Content withArrow={true}>
                            <div className="flex flex-col w-full p-2 space-y-4 rounded-md">
                              <Avatar
                                alt={character.name}
                                size="xs"
                                classNames={{
                                  fallback: "bg-transparent",
                                  root: "row-span-2 ",
                                }}
                                fallback={getInitials(character.name)}
                                src={character.image}
                                rounded="full"
                              />
                              <p className="w-full text-lg font-semibold truncate text-ellipsis">
                                {character.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {character.gender}
                              </p>
                            </div>
                          </Hover.Content>
                        </Hover.Trigger>
                      </Hover>
                      <div className="col-span-3">
                        <p className="w-full text-lg font-semibold truncate text-ellipsis">
                          {character.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {character.gender}
                        </p>
                      </div>
                      <div className="relative w-full col-span-4 my-2 overflow-hidden rounded-md h-52">
                        <Image src={character.image} fill alt="img" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
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
    </>
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
