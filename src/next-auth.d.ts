/* eslint-disable camelcase */
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
