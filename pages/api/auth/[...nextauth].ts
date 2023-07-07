import config from "@/lib/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.env.OAUTH.CLIENT_ID as string,
      clientSecret: config.env.OAUTH.CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
