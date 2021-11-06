import * as React from 'react';

import { AuthGuard } from '@/components/AuthGuard';
import { Sidenav } from '@/components/Sidenav';
import { Topnav } from '@/components/Topnav';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <div className="flex-1 flex">
        <Sidenav />
        <main className="w-full
          flex flex-col">
          <Topnav />
          <div className="p-16">
            You are authenticated
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

export default Dashboard;
