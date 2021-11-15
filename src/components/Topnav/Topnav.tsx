import * as React from 'react';

import { signOut } from 'next-auth/client';

function Topnav(): JSX.Element {
  return (
    <div className="w-full
      px-16
      flex items-center justify-between
      h-30">
      <button
        className="px-4 py-2 rounded-md bg-accent text-sm tracking-tight"
        onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

export default Topnav;
