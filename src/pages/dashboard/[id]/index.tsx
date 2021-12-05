import * as React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';
import { ServerInfo } from '@/components/ServerInfo';
import { ConfigForm } from '@/components/ConfigForm';

function ServerDashboard(): JSX.Element {
  const { query } = useRouter();
  const { id } = query;

  const { data: headerData } = useSWR(['/api/servers', id], (url, id) => {
    if (id === undefined) {
      return null;
    }

    return fetcher(`${url}/${id}`);
  });

  const { data: categoriesData } = useSWR('/api/categories', fetcher);
  const { data: configData } = useSWR(['/api/configs', id], (url, id) => {
    if (!id) {
      return null;
    }

    return fetcher(`${url}/${id}`);
  });

  const header = () => {
    if (!headerData) {
      return <ServerInfo.Skeleton />;
    }

    const { data: server } = headerData;

    return <ServerInfo server={server} />;
  };

  const form = () => {
    if (!categoriesData || !configData) {
      return <ConfigForm.Skeleton />;
    }

    const { data: config } = configData;
    const { data: categories } = categoriesData;

    return <ConfigForm
      config={config}
      categoryList={categories} />;
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="mb-8">{header()}</div>
        <div className="mb-16">
          <h2 className="font-medium
            text-xl
            leading-loose">
            Configuration
          </h2>
          <p className="opacity-50 max-w-lg">
            You can configure pleasantcord&apos;s behavior here
          </p>
        </div>
        {form()}
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
