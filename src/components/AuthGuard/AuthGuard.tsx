import * as React from 'react';

import { signIn, useSession } from 'next-auth/react';

import { AuthLoader } from '@/components/AuthLoader';

import { DISCORD } from '@/constant/provider';
import { DISCORD_NOT_AUTH } from '@/constant/error';

function AuthGuard(
  { children }: React.PropsWithChildren<unknown>,
): JSX.Element {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (
      status === 'unauthenticated' ||
      session?.error === DISCORD_NOT_AUTH
    ) {
      signIn(DISCORD);
    }
  }, [session, status]);

  if (status === 'loading') {
    return <AuthLoader />;
  }

  return <>{children}</>;
}

export default AuthGuard;
