import * as React from 'react';

import { Skeleton } from '@/components/Skeleton';

function ServerItemSkeleton(): JSX.Element {
  return (
    <div className="lg:w-full flex items-center p-2 lg:space-x-4">
      <Skeleton className="w-10 h-10 rounded-md" />
      <Skeleton className="flex-1 hidden lg:block h-18px rounded" />
    </div>
  );
}

export default ServerItemSkeleton;
