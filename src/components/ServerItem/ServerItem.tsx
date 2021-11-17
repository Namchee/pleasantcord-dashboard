import * as React from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';

import * as RadixAvatar from '@radix-ui/react-avatar';

import { Server } from '@/entity/server';
import { Avatar } from '@/components/Avatar';
import { CDN_URL } from '@/constant/api';

export type ServerItemProps = {
  server: Server;
};

function ServerItem({
  server,
}: React.PropsWithoutRef<ServerItemProps>): JSX.Element {
  const iconLink = () => {
    return `${CDN_URL}/icons/${server.id}/${server.icon}.png`;
  };

  const { query } = useRouter();
  const isSameId = query && query.id && query.id === server.id;

  const avatar = () => {
    const className = `rounded-md
      transition-all
      filter
      ${!isSameId && 'grayscale-75'}
      group-hover:grayscale-0`;

    return server.icon ? (
      <RadixAvatar.Root className="flex">
        <RadixAvatar.Image
          width={40}
          height={40}
          src={iconLink()}
          alt={server.name}
          title={server.name}
          className={className}
        />
        <RadixAvatar.Fallback>
          <Avatar name={server.name} />
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    ) : (
      <Avatar name={server.name} />
    );
  };

  const containerClass = () => {
    return `flex items-center
      p-2
      space-x-4
      rounded-md
      bg-content
      ${isSameId ? 'bg-opacity-5' : 'bg-opacity-0'}
      w-full
      group`;
  };

  const textClass = () => {
    return `font-medium
      flex-1
      truncate
      ${isSameId ? 'opacity-100' : 'opacity-60'}
      group-hover:opacity-100
      transition-opacity`;
  };

  return (
    <Link href={`/dashboard/${server.id}`}>
      <a className={containerClass()}>
        {avatar()}
        <p className={textClass()}>{server.name}</p>
      </a>
    </Link>
  );
}

export default ServerItem;
