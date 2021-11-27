import * as React from 'react';

import useSWR from 'swr';

import { signOut } from 'next-auth/client';
import { useSpring, animated } from 'react-spring';

import * as RadixAvatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';

import { Avatar } from '@/components/Avatar';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/Button';

import { CDN_URL } from '@/constant/api';
import { fetcher } from '@/utils/fetcher';

import type { User } from '@/entity/user';
import type { APIResponse } from '@/entity/response';

function getIconLink({ id, avatar }: User): string {
  return `${CDN_URL}/avatars/${id}/${avatar}`;
}

function Profile(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const transition = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0px)' : 'translateY(-8px)',
    config: {
      duration: 125,
    },
  });

  const { data } = useSWR<APIResponse<User>>('/api/user', fetcher);

  if (!data) {
    return <Skeleton className="rounded-full w-12 h-12" />;
  }

  const { data: user } = data;

  const PopoverContent = animated(Popover.Content);

  return (
    <Popover.Root open={open}>
      <Popover.Trigger
        onPointerDown={() => setOpen(!open)}
        className={`rounded-full
          transition-shadow
          w-12 h-12
          ${open && 'ring ring-4 ring-opacity-50'}
          focus:(outline-none ring ring-accent ring-opacity-40 ring-4)`}
      >
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
      </Popover.Trigger>
      <PopoverContent
        style={transition}
        sideOffset={8}
        collisionTolerance={12}
        onPointerDownOutside={() => setOpen(false)}
      >
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

          <Button
            onClick={() => signOut()}
            type="button"
            theme="primary"
            className="px-4 py-2
              text-sm
              mt-8">
            Sign out
          </Button>
        </div>
        <Popover.Arrow offset={16} className="fill-current text-depth" />
      </PopoverContent>
    </Popover.Root>
  );
}

export default Profile;
