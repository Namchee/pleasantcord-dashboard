import * as React from 'react';

import { signIn, useSession } from 'next-auth/client';

import { DISCORD } from '@/constant/provider';
import { AuthLoader } from '@/components/AuthLoader';

function AuthGuard(
  { children }: React.PropsWithChildren<unknown>,
): JSX.Element {
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (!loading && !session) {
      signIn(DISCORD);
    }
  }, [session, loading]);

  if (loading) {
    return <AuthLoader />;
  }

  if (!loading && session) {
    return <>{children}</>;
  }

  return <AuthLoader />;
}

export default AuthGuard;
