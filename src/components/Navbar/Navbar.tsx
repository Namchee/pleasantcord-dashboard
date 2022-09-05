import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/Button';
import { signIn } from 'next-auth/react';

interface NavbarProps {
  authenticated: boolean;
}

function Navbar(
  props: React.PropsWithoutRef<NavbarProps>
): JSX.Element {
  let button = (
    <Button
      onClick={() => signIn('discord', {
        callbackUrl: '/dashboard',
      })}
      type="button"
      theme="primary"
      className="px-5 py-2 text-sm"
    >
      Sign In
    </Button>
  );

  if (props.authenticated) {
    button = (
      <Link href="/dashboard">
        <a
          className="bg-primary
          text-content
          rounded-md
          transition-shadow
          transition-colors
          hover:bg-primary-dark
          active:bg-primary-dark
          focus:outline-none
          focus:(bg-primary-dark ring ring-4 ring-primary ring-opacity-50)
          px-5 py-2 text-sm"
        >
          Dashboard
        </a>
      </Link>
    );
  }

  return (
    <nav
      className="w-full
      max-w-7xl
      mx-auto
      h-24
      px-6
      md:px-20
      flex justify-between items-center
      bg-transparent
      z-1"
    >
      <Link href="/">
        <a>
          <Image
            width={150}
            height={65}
            src="/images/logo-long.svg"
            alt="pleasantcord"
            title="pleasantcord"
            role="banner"
          />
        </a>
      </Link>

      {button}
    </nav>
  );
}

export default Navbar;
