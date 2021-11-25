import * as React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';
import { ServerInfo } from '@/components/ServerInfo';
// import { useForm } from 'react-hook-form';

function ServerDashboard(): JSX.Element {
  const { query } = useRouter();
  const { id } = query;

  const { data: headerData } = useSWR(['/api/servers', id], (url, id) => {
    return fetcher(`${url}/${id}`);
  });

  // const { data: categoriesData } = useSWR('/api/categories', fetcher);

  const header = () => {
    if (!headerData) {
      return <ServerInfo.Skeleton />;
    }

    const { data: server } = headerData;

    return <ServerInfo server={server} />;
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="mb-8">{header()}</div>
        <div className="mb-8">
          <h2 className="font-medium text-xl">Configuration</h2>
          <p className="opacity-50 mt-2 max-w-lg">
            You can configure pleasantcord&apos;s behavior here
          </p>
        </div>
        <div className="space-y-8 py-12 grid grid-cols-3 grid-rows-2">
          <div>
            <label htmlFor="">Foo</label>
            <input type="text" />
          </div>
          <div></div>
          <div></div>
          <div><label htmlFor="">Foo</label>
            <input type="text" /></div>
          <div>
            <label htmlFor="">Foo</label>
            <input type="text" />
          </div>
          <div></div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
