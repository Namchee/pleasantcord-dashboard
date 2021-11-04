import * as React from 'react';

import { LoadingIcon } from '@/components/Icon';

function AuthLoader(): JSX.Element {
  return (
    <>
      <LoadingIcon className="w-24 h-auto" />
    </>
  );
}

export default AuthLoader;
