import * as React from 'react';

import { Badge } from '@/components/Badge';

import Profile from './Profile';

function Topnav(): JSX.Element {
  return (
    <div
      className="w-full
      px-8
      lg:px-16
      flex items-center justify-between
      h-20
      lg:h-28"
    >
      <div
        className="flex items-center
        space-x-2
        md:space-x-4"
      >
        <h1
          className="text-28px
          leading-relaxed
          font-bold
          tracking-tight"
        >
          Dashboard
        </h1>
        <Badge.Grass
          className="text-xs
            px-2 py-1
            rounded-md
            font-medium
            uppercase"
          label="beta"
        >
          Beta
        </Badge.Grass>
      </div>
      <Profile />
    </div>
  );
}

export default Topnav;
