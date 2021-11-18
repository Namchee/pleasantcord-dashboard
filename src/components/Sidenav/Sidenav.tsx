import * as React from 'react';

import Image from 'next/image';
import useSWR from 'swr';

import { ServerItem } from '@/components/ServerItem';

import { fetcher } from '@/utils/fetcher';
import { Server } from '@/entity/server';
import { APIResponse } from '@/entity/response';

function Sidenav(): JSX.Element {
  const { data } = useSWR<APIResponse<Server[]> >('/api/servers', fetcher);

  const items = () => {
    if (!data) {
      return (
        <>
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
        </>
      );
    }

    const { data: servers } = data;

    return servers.map((s, i) => <ServerItem key={i} server={s} />);
  };

  return (
    <nav className="bg-depth
      p-8
      h-full">
      <div className="flex items-center
        space-x-4
        ml-1
        mb-12">
        <Image
          width={48}
          height={48}
          src="/images/logo-production.svg"
          alt="pleasantcord"
          title="pleasantcord"
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
        {items()}
      </ul>
    </nav>
  );
}

export default Sidenav;
