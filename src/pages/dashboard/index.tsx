import * as React from 'react';

import Image from 'next/image';

import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayout from '@/layout/DashboardLayout';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="mt-12 grid place-items-center">
          <Image
            src="/images/landing-dashboard.svg"
            width={240}
            height={240}
            title="Select server to manage"
            alt="Select server to manage"
          />
          <p className="mt-8 max-w-md opacity-50 text-xl">
            To begin, select one of servers from the sidebar.
          </p>
          <p className="max-w-md mt-2 text-sm">
            <span className="opacity-50">
              Or add the bot to your server by clicking
            </span>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent opacity-100"
              href="https://discord.com/oauth2/authorize?client_id=750668307555942482&permissions=10240&scope=bot">
                here
            </a>.
          </p>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default Dashboard;
