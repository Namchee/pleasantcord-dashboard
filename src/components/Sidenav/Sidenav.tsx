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

    return servers.map((s, i) => <ServerItem key={i} server={s} />);
  };

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="max-h-screen">
        <nav className="p-8">
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

          <ul className="space-y-2">
            {items()}
          </ul>
        </nav>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="bg-surface
          w-2
          rounded-full"
        orientation="vertical">
        <ScrollArea.Thumb
          className="bg-dark opacity-75
            w-1
            rounded-full" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

export default Sidenav;
