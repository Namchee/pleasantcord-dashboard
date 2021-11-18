import * as React from 'react';

import { Skeleton } from '@/components/Skeleton';

function ServerItemSkeleton(): JSX.Element {
  return (
    <div className="flex items-center p-2 space-x-4">
      <Skeleton className="w-10 h-10 rounded-md" />
      <Skeleton className="flex-1 h-18px rounded" />
    </div>
  );
}

export default ServerItemSkeleton;
