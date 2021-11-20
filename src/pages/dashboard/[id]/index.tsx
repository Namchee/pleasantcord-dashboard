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
        <div>
          {header()}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
