import * as React from 'react';

import useSWR from 'swr';

import { signIn, signOut } from 'next-auth/react';
import { useTransition, animated, config } from 'react-spring';

import * as RadixAvatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';

import { Avatar } from '@/components/Avatar';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/Button';

import { REFRESH_ERROR } from '@/constant/error';
import { DISCORD } from '@/constant/provider';
import { CDN_URL } from '@/constant/api';

import { fetcher } from '@/utils/fetcher';

import type { User } from '@/entity/user';
import type { APIResponse } from '@/entity/response';

function getIconLink({ id, avatar }: User): string {
  return `${CDN_URL}/avatars/${id}/${avatar}`;
}

function Profile(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const transition = useTransition(open, {
    from: { opacity: 0, transform: 'scale(0.96)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.96)' },
    reverse: open,
    config: {
      ...config.stiff,
      duration: 150,
    },
  });

  const { data, error } = useSWR<APIResponse<User> >('/api/user', fetcher);

  if (error) {
    const { message } = error as Error;

    if (message === REFRESH_ERROR) {
      signIn(DISCORD);
    }
  }

  if (!data) {
    return <Skeleton className="rounded-full w-12 h-12" />;
  }

  const { data: user } = data;

  if (!user) {
    return <Skeleton className="rounded-full w-12 h-12" />;
  }

  if (!user.avatar) {
    return (
      <Avatar rounded name={user.username} className="w-12 h-12 text-xl" />
    );
  }

  return (
    <Popover.Root open={open}>
      <Popover.Trigger
        onPointerDown={() => setOpen(!open)}
        className={`rounded-full
          transition-shadow
          w-12 h-12
          ${open && 'ring ring-4 ring-opacity-50'}
          focus:(outline-none ring ring-primary ring-opacity-40 ring-4)`}
      >
        <RadixAvatar.Root>
          <RadixAvatar.Image
            src={getIconLink(user)}
            width={48}
            height={48}
            className="rounded-full shadow-inner"
          />
          <RadixAvatar.Fallback>
            <Avatar
              rounded
              name={user.username}
              className="w-12 h-12 text-xl"
            />
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </Popover.Trigger>
      {transition((styles, item) => {
        return (
          item && (
            <Popover.Content
              sideOffset={12}
              collisionTolerance={16}
              onPointerDownOutside={() => setOpen(false)}
              forceMount
              asChild
            >
              <animated.div
                style={styles}
                className="py-6 px-8
              bg-background-dark
              rounded-lg
              origin-top-right
              text-content"
              >
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
                  <span className="font-bold tracking-tight">
                    {user.username}
                  </span>
                  <span className="opacity-50 ml-2px">
                    #{user.discriminator}
                  </span>
                </p>

                <Button
                  onClick={() =>
                    signOut({
                      callbackUrl: '/',
                    })
                  }
                  type="button"
                  theme="primary"
                  className="px-4 py-2
                    text-sm
                    mt-8"
                >
                  Sign Out
                </Button>
                <Popover.Arrow
                  offset={16}
                  className="fill-current text-background-dark"
                />
              </animated.div>
            </Popover.Content>
          )
        );
      })}
    </Popover.Root>
  );
}

export default Profile;
