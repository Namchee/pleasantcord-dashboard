import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_PRIVATE_KEY,
  },
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
});
