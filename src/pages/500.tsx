import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { Button } from '@/components/Button';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>500: Well that&apos;s unexpected &mdash; Pleasantcord</title>
      </Head>

      <div
        className="p-12 md:p-24
        flex-1
      flex flex-col
      text-content text-opacity-40
      text-center
      bg-background"
      >
        <Image
          src="/images/500.svg"
          width={280}
          height={280}
          title="Not Found"
          alt="Not Found"
        />

        <h1
          className="text-content
        font-bold mt-4
        text-3xl
        md:tracking-tight md:text-5xl"
        >
          Well, that&apos;s on us
        </h1>
        <p className="md:text-lg leading-relaxed mt-2 md:mt-4">
          Looks like we encountered an unexpected error
        </p>
        <p className="md:text-lg leading-relaxed">Quick! Back to safety!</p>

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
    </>
  );
}

export default NotFoundPage;
