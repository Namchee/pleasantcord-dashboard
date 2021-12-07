import * as React from 'react';

import { signIn, useSession } from 'next-auth/react';

import { DISCORD } from '@/constant/provider';
import { AuthLoader } from '@/components/AuthLoader';

function AuthGuard(
  { children }: React.PropsWithChildren<unknown>,
): JSX.Element {
  const { status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(DISCORD);
    }
  }, [status]);

  if (status === 'loading') {
    return <AuthLoader />;
  }

  return <>{children}</>;
}

export default AuthGuard;
