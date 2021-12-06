import * as React from 'react';

import Image from 'next/image';

import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayout from '@/layout/DashboardLayout';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="grid place-items-center text-center">
          <Image
            src="/images/landing-dashboard.svg"
            width={240}
            height={240}
            title="Select server to manage"
            alt="Select server to manage"
          />
          <p className="mt-8 max-w-md opacity-40 text-lg leading-relaxed">
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
              href="https://discord.com/oauth2/authorize?client_id=750668307555942482&permissions=10240&scope=bot">
                here
            </a>
          </p>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default Dashboard;
