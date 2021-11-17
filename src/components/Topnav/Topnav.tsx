import * as React from 'react';

import useSWR from 'swr';

import { signOut } from 'next-auth/client';

import * as Popover from '@radix-ui/react-popover';
import * as RadixAvatar from '@radix-ui/react-avatar';

import { fetcher } from '@/utils/fetcher';

import { Avatar } from '@/components/Avatar';
import { Skeleton } from '@/components/Skeleton';
import { Badge } from '@/components/Badge';

import { APIResponse } from '@/entity/response';
import { User } from '@/entity/user';
import { CDN_URL } from '@/constant/api';

function getIconLink({ id, avatar }: User): string {
  return `${CDN_URL}/avatars/${id}/${avatar}`;
}

function Topnav(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const { data } = useSWR<APIResponse<User>>('/api/user', fetcher);

  const profile = () => {
    if (!data) {
      return <Skeleton className="rounded-full w-12 h-12" />;
    }

    const { data: user } = data;

    return (
      <Popover.Root open={open}>
        <Popover.Trigger className="focus:outline-none">
          <button
            onPointerDown={() => setOpen(!open)}
            className={`rounded-full
            transition-shadow
            w-12 h-12
            ${open && 'ring ring-4 ring-opacity-50'}
            focus:(outline-none ring ring-accent ring-opacity-40 ring-4)`}>
            <RadixAvatar.Root>
              <RadixAvatar.Image
                src={getIconLink(user)}
                width={48}
                height={48}
                className="rounded-full shadow-inner"
              />
              <RadixAvatar.Fallback>
                <Avatar rounded name={user.username} />
              </RadixAvatar.Fallback>
            </RadixAvatar.Root>
          </button>
        </Popover.Trigger>
        <Popover.Content
          sideOffset={8}
          collisionTolerance={12}
          onPointerDownOutside={() => setOpen(false)}>
          <div className="py-6 px-8 bg-depth rounded-lg text-content">
            <p
              className="text-xs
              font-medium
              opacity-50
              uppercase
              tracking-wider"
            >
              Signed in as
            </p>
            <p className="text-2xl mt-2">
              <span className="font-bold tracking-tight">{user.username}</span>
              <span className="opacity-50 ml-2px">#{user.discriminator}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2
                bg-accent
                rounded-md
                text-sm
                mt-8
                transition-shadow
                focus:(outline-none ring ring-accent ring-opacity-50 ring-4)">
              Sign out
            </button>
          </div>
          <Popover.Arrow offset={16} className="fill-current text-depth" />
        </Popover.Content>
      </Popover.Root>
    );
  };

  return (
    <div
      className="w-full
      px-16
      flex items-center justify-between
      h-30"
    >
      <div
        className="flex items-center
        space-x-4"
      >
        <h1
          className="text-4xl
          font-bold
          tracking-tight"
        >
          Dashboard
        </h1>
        <Badge.Grass
          className="text-xs
            px-2 py-1
            rounded-md
            uppercase"
          label="beta"
        >
          Beta
        </Badge.Grass>
      </div>
      {profile()}
    </div>
  );
}

export default Topnav;
