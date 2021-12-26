import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import { signIn } from 'next-auth/react';

import { ServerItem } from '@/components/ServerItem';

import { fetcher } from '@/utils/fetcher';
import { PartialServer } from '@/entity/server';
import { APIResponse } from '@/entity/response';
import { REFRESH_ERROR } from '@/constant/error';
import { DISCORD } from '@/constant/provider';

function Menu(): JSX.Element {
  const { data } = useSWR<APIResponse<PartialServer[]>>(
    '/api/servers',
    fetcher
  );

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

    const { data: servers, error } = data;

    if (error === REFRESH_ERROR) {
      signIn(DISCORD);
    }

    if (!servers) {
      return (
        <>
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
          <ServerItem.Skeleton />
        </>
      );
    }

    if (!servers.length) {
      return (
        <p
          className="text-xl
            opacity-40
            mx-auto
            md:(hidden py-24)
            lg:block"
        >
          No managable servers
        </p>
      );
    }

    return servers.map((s, i) => <ServerItem key={i} server={s} />);
  };

  return (
    <nav
      className="flex p-4
          md:flex-col
          lg:p-8
          max-w-screen
          md:max-h-screen
          overflow-auto"
    >
      <Link href="/dashboard">
        <a
          className="flex items-center
            space-x-4
            md:ml-1
            lg:mb-12"
        >
          <Image
            width={48}
            height={48}
            src="/images/logo-short.svg"
            alt="pleasantcord"
            title="pleasantcord"
            role="banner"
            layout="fixed"
          />
          <h1
            className="hidden lg:block
                text-28px
                leading-relaxed
                tracking-tight
                font-bold"
          >
            pleasantcord
          </h1>
        </a>
      </Link>

      <p
        className="hidden lg:block
            uppercase
        text-sm
        font-bold
        tracking-wider
        opacity-60
        leading-relaxed
        mb-4"
      >
        Servers
      </p>

      <div
        aria-hidden="true"
        className="lg:hidden
            border-r md:border-t border-content-dark
            bg-content-dark
            opacity-60 mx-4 md:my-4 md:mx-0"
      ></div>

      <ul
        className="flex-1
            flex items-center
            md:items-start
            space-x-2
            md:(space-x-0 space-y-2 flex-col)"
      >
        {items()}
      </ul>
    </nav>
  );
}

export default Menu;
