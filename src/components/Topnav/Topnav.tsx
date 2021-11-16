import * as React from 'react';

import useSWR from 'swr';

import { signOut } from 'next-auth/client';

import * as Popover from '@radix-ui/react-popover';

import { fetcher } from '@/utils/fetcher';

import { Skeleton } from '@/components/Skeleton';
import { Badge } from '@/components/Badge';

import { APIResponse } from '@/entity/response';
import { User } from '@/entity/user';

function Topnav(): JSX.Element {
  const { data } = useSWR<APIResponse<User> >('/api/user', fetcher);

  React.useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

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
      <Skeleton className="rounded-full w-12 h-12"/>
    </div>
  );
}

export default Topnav;
