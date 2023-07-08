import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      return !!token;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/",
  },
});

export const config = { matcher: ["/rickmorty", "/me"] };
