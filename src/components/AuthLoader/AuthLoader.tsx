import * as React from 'react';

import { LoadingIcon } from '@/components/Icon';

function AuthLoader(): JSX.Element {
  return (
    <div className="w-full h-full">
      <LoadingIcon className="w-24 h-auto" />
    </div>
  );
}

export default AuthLoader;
