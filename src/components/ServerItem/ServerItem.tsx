import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Server } from '@/entity/server';
import { Avatar } from '../Avatar';
import { useRouter } from 'next/dist/client/router';

export type ServerItemProps = {
  server: Server;
}

function ServerItem({
  server,
}: React.PropsWithoutRef<ServerItemProps>): JSX.Element {
  const iconLink = () => {
    return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
  };

  const { query } = useRouter();
  const isSameId = query && query.id && query.id === server.id;

  const avatar = () => {
    const className = `rounded-md
      transition-all
      filter
      ${!isSameId && 'grayscale-75'}
      group-hover:grayscale-0`;

    return server.icon ?
      <Image
        src={iconLink()}
        width={40}
        height={40}
        alt={server.name}
        title={server.name}
        className={className}
      /> :
      <Avatar name={server.name} />;
  };

  const containerClass = () => {
    return `flex items-center
      p-2
      space-x-4
      rounded-md
      bg-white
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
        <p className={textClass()}>
          {server.name}
        </p>
      </a>
    </Link>
  );
}

export default ServerItem;
