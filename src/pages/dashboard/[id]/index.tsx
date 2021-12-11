import * as React from 'react';

import useSWR from 'swr';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';
import { ServerInfo } from '@/components/ServerInfo';
import { ConfigForm } from '@/components/ConfigForm';

function ServerDashboard(): JSX.Element {
  const { query } = useRouter();
  const { id } = query;

  const { data: headerData } = useSWR(
    id ? ['/api/servers', id] : null,
    (url, id) => fetcher(`${url}/${id}`),
  );

  const { data: categoriesData } = useSWR('/api/categories', fetcher);
  const { data: configData } = useSWR(
    id ? ['/api/configs', id] : null,
    (url, id) => fetcher(`${url}/${id}`),
  );

  const header = () => {
    if (!headerData) {
      return <ServerInfo.Skeleton />;
    }

    const { data: server } = headerData;

    if (!server) {
      return <ServerInfo.Skeleton />;
    }

    return <ServerInfo server={server} />;
  };

  const form = () => {
    if (!categoriesData || !configData) {
      return <ConfigForm.Skeleton />;
    }

    const { data: config } = configData;
    const { data: categories } = categoriesData;

    if (!config || !categories) {
      return <ConfigForm.Skeleton />;
    }

    return <ConfigForm
      key={`server-${id}`}
      config={config}
      categoryList={categories} />;
  };

  return (
    <>
      <Head>
        <title>Edit Configuration &mdash; Pleasantcord Dashboard</title>
      </Head>

      <AuthGuard>
        <DashboardLayout>
          <div className="mb-8">{header()}</div>
          <div className="mb-12 lg:mb-16">
            <h2
              className="font-medium
            text-lg
            md:text-xl
            leading-loose"
            >
              Configuration
            </h2>
            <p className="opacity-50 max-w-lg">
              You can configure pleasantcord&apos;s behavior here
            </p>
          </div>
          {form()}
        </DashboardLayout>
      </AuthGuard>
    </>
  );
}

export default ServerDashboard;
