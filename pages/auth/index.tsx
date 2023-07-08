import React from "react";
import { getServerSession } from "next-auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { providers } from "@/lib/constants";
import Button from "@/components/common/Button";
import { authOptions } from "../api/auth/[...nextauth]";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import useLoading from "@/lib/hooks/use-loading";

const Auth = () => {
  const { loading, start, stop } = useLoading();
  const handleSignIn = React.useCallback((provider: string) => {
    start(provider);
    signIn(provider);
  }, []);

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, [loading]);
  return (
    <main className="container flex items-center justify-center w-screen h-full min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-5">
        {providers.map((provider) => (
          <Button
            loading={loading === provider.id}
            key={provider.id}
            onClick={() => handleSignIn(provider.id)}
            mode="outlined"
            size="lg"
            full
            className="flex "
          >
            Sign in with {provider.name} <GitHubLogoIcon />
          </Button>
        ))}
      </div>
    </main>
  );
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
