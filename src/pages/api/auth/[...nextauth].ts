import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_PRIVATE_KEY,
  },
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (!account) {
        return token;
      }

      if (account.accessToken) {
        token.accessToken = account.accessToken;
      }

      if (account.refreshToken) {
        token.refreshToken = account.refreshToken;
      }

      return token;
    },
  },
});
