import * as React from 'react';

import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

import { DISCORD } from '@/constant/provider';

import { AuthLoader } from '@/components/AuthLoader';

function AuthGuard(
  { children }: React.PropsWithChildren<unknown>,
): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (!session) {
        signIn(DISCORD);
      }
    }
  }, [session, loading, router]);

  if (loading) {
    return <AuthLoader />;
  }

  if (!loading && session) {
    return <>{children}</>;
  }

  return <></>;
}

export default AuthGuard;
