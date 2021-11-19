import * as React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';

function ServerDashboard(): JSX.Element {
  const { query } = useRouter();
  const { id } = query;

  const { data } = useSWR(['/api/servers', id], (url, id) => {
    return fetcher(`${url}/${id}`);
  });

  React.useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <AuthGuard>
      <DashboardLayout>
        The server id is {id}
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
