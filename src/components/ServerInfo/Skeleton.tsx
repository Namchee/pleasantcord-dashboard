import * as React from 'react';

import { Skeleton } from '@/components/Skeleton';

function ServerInfoSkeleton(): JSX.Element {
  return (
    <div className="flex space-x-6">
      <Skeleton className="w-20 h-20 rounded-md" />
      <div className="flex flex-col justify-between">
        <Skeleton className="h-8 w-40ch rounded-md" />
        <Skeleton className="h-6 w-20ch rounded-md" />
      </div>
    </div>
  );
}

export default ServerInfoSkeleton;
