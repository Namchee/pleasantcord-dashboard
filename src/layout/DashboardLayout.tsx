import * as React from 'react';

import { Sidenav } from '@/components/Sidenav';
import { Topnav } from '@/components/Topnav';

function DashboardLayout({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className="flex-1 flex">
      <aside className="w-1/4 max-w-360px
        sticky top-0 left-0
        h-screen
        bg-depth">
        <Sidenav />
      </aside>
      <main
        className="flex-1
          flex flex-col
          max-w-6xl
          mx-auto"
      >
        <Topnav />
        <div className="p-16">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
