import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'guilds guilds.members.read',
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
