import * as React from 'react';

import { Menu } from '@/components/Menu';
import { DashboardHeader } from '@/components/DashboardHeader';

function DashboardLayout({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className="flex-1
      bg-background
      flex flex-col md:flex-row">
      <aside className="order-last md:order-none
        lg:w-1/4 lg:max-w-360px
        sticky bottom-0 left-0 right-0
        md:top-0
        md:h-screen lg:w-full
        bg-background-dark
        z-10">
        <Menu />
      </aside>
      <main
        className="flex-1
          flex flex-col
          max-w-6xl
          mx-auto
        "
      >
        <DashboardHeader />
        <div className="px-8 py-16 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
