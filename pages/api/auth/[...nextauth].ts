import config from "@/lib/config";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.env.OAUTH.CLIENT_ID as string,
      clientSecret: config.env.OAUTH.CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: config.env.OAUTH.NEXTAUTH_SECRET as string,
};
export default NextAuth(authOptions);
