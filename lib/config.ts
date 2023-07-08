export default {
  env: {
    OAUTH: {
      CLIENT_ID: process.env.OAUTH_CLIENT_ID,
      CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
  },
};
