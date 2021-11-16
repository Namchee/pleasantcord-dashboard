import * as React from 'react';

import { signOut } from 'next-auth/client';
import { Badge } from '../Badge';

function Topnav(): JSX.Element {
  return (
    <div className="w-full
      px-16
      flex items-center justify-between
      h-30">
      <div className="flex items-center
        space-x-4">
        <h1 className="text-4xl
          font-bold
          tracking-tight">
          Dashboard
        </h1>
        <Badge.Grass
          className="text-xs
            px-2 py-1
            rounded-md
            uppercase"
          label="beta">
          Beta
        </Badge.Grass>
      </div>
      <button
        className="px-4 py-2 rounded-md bg-accent text-sm tracking-tight"
        onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

export default Topnav;
