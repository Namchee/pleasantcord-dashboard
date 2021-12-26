/* eslint-disable camelcase */
import { User } from 'next-auth';

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user?: User;
    accessToken?: string;
    error?: string;
  }
}
