export default {
  env: {
    OAUTH: {
      CLIENT_ID: process.env.OAUTH_CLIENT_ID,
      CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
  },
};
