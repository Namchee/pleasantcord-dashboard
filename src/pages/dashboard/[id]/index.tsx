import * as React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';
import { ServerInfo } from '@/components/ServerInfo';

function ServerDashboard(): JSX.Element {
  const { query } = useRouter();
  const { id } = query;

  const { data } = useSWR(['/api/servers', id], (url, id) => {
    return fetcher(`${url}/${id}`);
  });

  const header = () => {
    if (!data) {
      return <ServerInfo.Skeleton />;
    }

    const { data: server } = data;

    return <ServerInfo server={server} />;
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="mb-10">{header()}</div>
        <div className="mb-10">
          <h2 className="font-medium text-xl">Configuration</h2>
          <p className="opacity-50 mt-2 max-w-lg">
            You can configure pleasantcord&apos;s behavior here
          </p>
        </div>
        <div className="space-y-8 py-8">
          <div className="grid grid-cols-[4fr,6fr]">
            <p className="text-lg">
              NSFW Categories
            </p>
            <p>bar</p>
          </div>
          <div className="grid grid-cols-[4fr,6fr]">
            <p className="text-lg">NSFW Categories</p>
            <p>bar</p>
          </div>
          <div className="grid grid-cols-[4fr,6fr]">
            <p className="text-lg">NSFW Categories</p>
            <p>bar</p>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
