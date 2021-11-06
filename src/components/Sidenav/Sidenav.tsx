import * as React from 'react';

import Image from 'next/image';

import { Skeleton } from '@/components/Skeleton';

function Sidenav(): JSX.Element {
  return (
    <nav className="bg-depth p-6">
      <div className="flex items-center
        space-x-4
        mb-12">
        <Image
          width={48}
          height={48}
          src="/images/logo-production.svg"
          alt="Pleasantcord"
          role="banner"
        />
        <h1
          className="text-2xl
            tracking-tight
            font-bold">
          pleasantcord
        </h1>
      </div>

      <p className="uppercase
        text-sm
        font-bold
        tracking-wider
        opacity-60
        leading-relaxed
        mb-4">
        Servers
      </p>

      <ul className="space-y-2">
        <Skeleton className="rounded h-12 w-64" />
        <Skeleton className="rounded h-12 w-64" />
        <Skeleton className="rounded h-12 w-64" />
      </ul>
    </nav>
  );
}

export default Sidenav;
