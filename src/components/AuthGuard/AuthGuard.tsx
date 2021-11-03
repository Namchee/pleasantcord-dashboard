import * as React from 'react';

import { useRouter } from 'next/router';

import { signIn, useSession } from 'next-auth/client';

function AuthGuard(
  { children }: React.PropsWithChildren<unknown>,
): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (!session) {
        signIn('discord');
      }
    }
  }, [session, loading, router]);

  if (loading) {
    return <p>LOADING</p>;
  }

  if (!loading && session) {
    return <>{children}</>;
  }

  return <></>;
}

export default AuthGuard;
