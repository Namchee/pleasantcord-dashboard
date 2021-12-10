import * as React from 'react';

import Head from 'next/head';

import { getSession } from 'next-auth/react';

import {
  RocketIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';

import { Navbar } from '@/components/Navbar';
import { HomeAccent } from '@/components/Accent';
import { Button } from '@/components/Button';
import { DiscordIcon } from '@/components/Icon';
import { Footer } from '@/components/Footer';

import type { GetServerSidePropsContext } from 'next';

// eslint-disable-next-line max-len
const metaDesc = 'Your Discord servers is never safe from harmful contents. Invite pleasantcord and free your servers from NSFW, effortlessly.';

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Hassle-Free Discord NSFW Moderation — Pleasantcord</title>
        <meta name="description" content={metaDesc}></meta>
        <meta
          property="og:title"
          content="Hassle-Free NSFW Moderation — Pleasantcord"></meta>
        <meta property="og:url" content="https://pleasantcord.namchee.dev"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:description" content={metaDesc}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <div
        className="flex-1
        flex flex-col
        bg-background-deep"
      >
        <Navbar />
        <main className="flex-1">
          <section
            className="w-full max-w-7xl
          mx-auto
          p-16
          grid place-items-center
          relative"
          >
            <h1
              className="font-bold
            md:text-7xl
            lg:text-84px
            text-5xl
            max-w-3xl
            tracking-tighter
            text-center
            leading-tight
            z-1"
            >
              Hassle-free NSFW Moderation
            </h1>
            <p
              className="text-content text-opacity-40
              text-center
            md:text-xl
            text-lg
            font-medium
            z-1
            mt-6
            leading-normal"
            >
              Your Discord servers is never safe from harmful contents
            </p>
            <p
              className="text-content text-opacity-40
              mt-2 md:mt-0
            md:text-xl
            text-lg
            text-center
            font-medium
            z-1
            leading-normal"
            >
              Invite pleasantcord and free your servers from NSFW, effortlessly
            </p>
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=750668307555942482&permissions=10240&scope=bot"
              target="_blank"
              rel="noopener noreferrer"
              className="z-1"
            >
              <Button
                theme="primary"
                className="flex items-center justify-between
              space-x-2
              px-8 py-3
              rounded-30px
              mt-8"
                type="button"
              >
                <DiscordIcon className="w-6 h-auto" />
                <span className="text-xl font-medium tracking-tight">
                  Invite Now
                </span>
              </Button>
            </a>

            <HomeAccent
              className="w-full min-h-auto
            absolute
            md:-top-3/12
            select-none"
            />
          </section>

          <section
            className="w-full max-w-6xl
          mx-auto
          p-16
          flex flex-col md:flex-row justify-between
          space-y-12
          md:space-x-12
          md:space-y-0"
          >
            <div className="flex flex-col items-center md:items-start">
              <div
                className="grid place-items-center
              bg-primary bg-opacity-20
              p-3 rounded-full"
              >
                <RocketIcon className="w-6 h-6 text-primary" />
              </div>
              <p
                className="text-2xl
                mt-3
                font-bold tracking-tight leading-normal"
              >
                Dead Simple
              </p>
              <p
                className="max-w-xs
              text-content text-opacity-50
              leading-relaxed
              text-center md:text-left
              mt-2"
              >
                Invite pleasantcord and enjoy automated NSFW contents moderation
                immediately. Without extra steps involved.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div
                className="grid place-items-center
              bg-primary bg-opacity-20
              p-3 rounded-full"
              >
                <MagicWandIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl mt-3 font-bold tracking-tight">
                Fairly Accurate
              </p>
              <p
                className="max-w-xs
              text-content text-opacity-50
              leading-relaxed
              text-center md:text-left
              mt-2"
              >
                Backed by a heavily trained and well tested machine learning
                NSFW model under the hood.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div
                className="grid place-items-center
              bg-primary bg-opacity-20
              p-3 rounded-full"
              >
                <MixerHorizontalIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl mt-3 font-bold tracking-tight">
                Configurable
              </p>
              <p
                className="max-w-xs
              text-content text-opacity-50
              leading-relaxed
              text-center md:text-left
              mt-2"
              >
                Customize pleasantcord’s behavior in your servers easily through
                our intuitive dashboard to your liking.
              </p>
            </div>
          </section>

          <section
            className="max-w-7xl w-full mx-auto
            px-16 py-24
            md:py-32
            grid place-items-center
            text-4xl md:text-5xl
            font-bold tracking-tighter leading-relaxed
            opacity-50
            text-center"
          >
            <p>More surprises coming soon</p>
            <p className="mt-2 md:mt-8">Stay tuned</p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
