import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/Button';
import { signIn } from 'next-auth/react';

function Navbar(): JSX.Element {
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
            width={153}
            height={33}
            src="https://res.cloudinary.com/namchee/image/upload/v1639050868/pleasantcord/logo-long_m6vvcn.svg"
            alt="pleasantcord"
            title="pleasantcord"
            role="banner"
            placeholder="blur"
            blurDataURL='https://res.cloudinary.com/namchee/image/upload/e_blur:100,q_25/v1639050868/pleasantcord/logo-long_m6vvcn.webp'
          />
        </a>
      </Link>

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
    </nav>
  );
}

export default Navbar;
