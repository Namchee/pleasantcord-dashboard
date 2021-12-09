import * as React from 'react';

import Image from 'next/image';
import Head from 'next/head';

import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayout from '@/layout/DashboardLayout';

function Dashboard(): JSX.Element {
  return (
    <>
      <Head>
        <title>Pleasantcord Dashboard</title>
      </Head>

      <AuthGuard>
        <DashboardLayout>
          <div className="grid place-items-center text-center">
            <Image
              src="https://res.cloudinary.com/namchee/image/upload/v1639050868/pleasantcord/landing-dashboard_gjezes.svg"
              width={210}
              height={210}
              title="Select server to manage"
              alt="Select server to manage"
              placeholder="blur"
              blurDataURL="https://res.cloudinary.com/namchee/image/upload/c_scale,e_blur:200,h_210,q_25,w_206/v1639050868/pleasantcord/landing-dashboard_gjezes.webp"
            />
            <p className="mt-10 max-w-md opacity-40 text-lg leading-relaxed">
              To begin, select one of the servers from the menu
            </p>
            <p className="md:max-w-md text-lg mt-2 md:mt-0">
              <span className="opacity-40">
                Or add the bot to your server by clicking
              </span>{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary opacity-100"
                href="https://discord.com/oauth2/authorize?client_id=750668307555942482&permissions=10240&scope=bot"
              >
                here
              </a>
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    </>
  );
}

export default Dashboard;
