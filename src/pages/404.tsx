import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/Button';

function NotFoundPage(): JSX.Element {
  return (
    <div
      className="p-12 md:p-24
      mx-auto max-w-6xl
      grid place-items-center
      text-content text-opacity-40
      text-center"
    >
      <Image
        src="/images/404.svg"
        width={320}
        height={320}
        title="Not Found"
        alt="Not Found"
      />

      <h1
        className="text-content
        font-bold -mt-12
        text-3xl
        md:tracking-tight md:text-5xl"
      >
        Looks like you&apos;re lost!
      </h1>
      <p className="md:text-lg leading-relaxed mt-2 md:mt-4">
        The page you&apos;re looking for doesn&apos;t exist
      </p>
      <p className="md:text-lg leading-relaxed">
        Let&apos;s get you back to safety ASAP
      </p>

      <Link href="/">
        <a>
          <Button
            theme="primary"
            className="mt-8
          px-6 py-3
          text-lg
          rounded-25px"
          >
            Back to Home
          </Button>
        </a>
      </Link>
    </div>
  );
}

export default NotFoundPage;
