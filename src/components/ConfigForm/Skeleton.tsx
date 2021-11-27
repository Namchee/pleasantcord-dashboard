import * as React from 'react';

import { Skeleton } from '@/components/Skeleton';

function ConfigFormSkeleton(): JSX.Element {
  return (
    <div className="space-y-8">
      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <Skeleton className="w-20ch h-5 rounded-md" />
          <Skeleton className="mt-3 w-25ch h-3 rounded-md" />
        </div>

        <div className="max-w-sm mb-2">
          <Skeleton className="w-full h-12 rounded-md" />
        </div>
      </div>

      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <Skeleton className="w-20ch h-5 rounded-md" />
          <Skeleton className="mt-3 w-25ch h-3 rounded-md" />
        </div>

        <div className="mb-2">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-md" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-md" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-md" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-md" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-md" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <Skeleton className="w-20ch h-5 rounded-md" />
          <Skeleton className="mt-3 w-25ch h-3 rounded-md" />
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div>
                <Skeleton className="w-20ch h-4 rounded-md" />
                <Skeleton className="mt-2 w-25ch h-3 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="col-start-2 mt-8">
          <Skeleton className="w-30 h-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default ConfigFormSkeleton;
