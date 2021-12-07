import NextAuth from 'next-auth';

import Discord from 'next-auth/providers/discord';

export default NextAuth({
  secret: process.env.JWT_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'guilds identify',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (!account) {
        return token;
      }

      if (account.access_token) {
        token.accessToken = account.access_token;
      }

      if (account.refresh_token) {
        token.refreshToken = account.refresh_token;
      }

      token.userId = token.sub;

      return token;
    },
  },
});
