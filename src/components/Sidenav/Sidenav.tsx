import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import { ServerItem } from '@/components/ServerItem';

import { fetcher } from '@/utils/fetcher';
import { PartialServer } from '@/entity/server';
import { APIResponse } from '@/entity/response';

function Sidenav(): JSX.Element {
  const { data } = useSWR<APIResponse<PartialServer[]>>(
    '/api/servers',
    fetcher
  );

  const items = () => {
    if (!data) {
      return (
        <div className="space-y-2">
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
        </div>
      );
    }

    const { data: servers } = data;

    if (!servers.length) {
      return (
        <p
          className="text-xl
            opacity-40
            text-center
            py-24"
        >
          No managed servers
        </p>
      );
    }

    return (
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <ul className="max-h-screen space-y-2">
            {servers.map((s, i) => <ServerItem key={i} server={s} />)}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    );
  };

  return (
    <nav
      className="bg-depth
        p-8
        h-screen
        overflow-hidden"
    >
      <Link href="/dashboard">
        <a
          className="flex items-center
            space-x-4
            ml-1
            mb-12"
        >
          <Image
            width={48}
            height={48}
            src="/images/logo-production.svg"
            alt="pleasantcord"
            title="pleasantcord"
            role="banner"
          />
          <h1
            className="text-28px
            leading-relaxed
            tracking-tight
            font-bold"
          >
            pleasantcord
          </h1>
        </a>
      </Link>

      <p
        className="uppercase
        text-sm
        font-bold
        tracking-wider
        opacity-60
        leading-relaxed
        mb-4"
      >
        Servers
      </p>

      {items()}
    </nav>
  );
}

export default Sidenav;
