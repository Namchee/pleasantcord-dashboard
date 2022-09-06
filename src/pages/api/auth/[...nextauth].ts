import NextAuth, { User } from 'next-auth';
import Discord from 'next-auth/providers/discord';

import { URLSearchParams } from 'url';
import { JWT } from 'next-auth/jwt';

import { REFRESH_GRANT } from '@/constant/provider';
import { REFRESH_ERROR } from '@/constant/error';

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const url = 'https://discord.com/api/oauth2/token' +
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID as string,
        client_secret: process.env.DISCORD_CLIENT_SECRET as string,
        grant_type: REFRESH_GRANT,
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const newToken = await response.json();

    if (!response.ok) {
      throw newToken;
    }

    return {
      ...token,
      accessToken: newToken.access_token,
      accessTokenExpires: Date.now() + newToken.expires_in * 1000,
      refreshToken: newToken.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.error(err);

    return {
      ...token,
      error: REFRESH_ERROR,
    };
  }
}

export default NextAuth({
  secret: process.env.JWT_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'guilds identify',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at || 0) * 1000,
          refreshToken: account.refresh_token,
          userId: token.sub,
        };
      }

      if (!token.accessTokenExpires || Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshToken(token);
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.error = token.error as string;

      return session;
    },
  },
});
