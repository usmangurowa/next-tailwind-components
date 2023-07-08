import { GetServerSidePropsContext } from "next";
import axios from "../apis";

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2);

export const objectToQueryString = (obj: object) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key as keyof typeof obj])
    .join("&");
};

export const getServerProps: any = async (
  endpoint: string,
  context?: GetServerSidePropsContext
) => {
  try {
    const { data, status } = await axios.get(endpoint);
    if (status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        fallback: {
          [endpoint]: data || [],
        },
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
