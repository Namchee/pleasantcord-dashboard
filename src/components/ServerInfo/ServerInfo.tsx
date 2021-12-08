import * as React from 'react';

import Image from 'next/image';

import { CheckmarkIcon } from '@/components/Icon';
import { CDN_URL, VERIFIED_FEATURE } from '@/constant/api';

import type { Server } from '@/entity/server';

import ServerInfoSkeleton from './Skeleton';

export type ServerInfoProps = {
  server: Server;
}

function ServerInfo({
  server,
}: React.PropsWithoutRef<ServerInfoProps>): JSX.Element {
  const iconLink = () => {
    return `${CDN_URL}/icons/${server.id}/${server.icon}.png`;
  };

  const isVerified = () => {
    return server.features.includes(VERIFIED_FEATURE);
  };

  return (
    <div className="flex justify-start space-x-4 md:space-x-6">
      <Image
        src={iconLink()}
        width={80}
        height={80}
        title={server.name}
        alt={server.name}
        layout="fixed"
        className="rounded-md" />
      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="font-bold
            tracking-tight
            text-2xl md:text-28px lg:text-32px
            truncate max-w-15ch
            md:max-w-none">
            {server.name}
          </h1>
          {
            isVerified() &&
            <CheckmarkIcon className="w-18px h-18px" />
          }
        </div>
        <p className="opacity-50 text-lg">
          {server.approximate_member_count} members
        </p>
      </div>
    </div>
  );
}

ServerInfo.Skeleton = ServerInfoSkeleton;

export default ServerInfo;
