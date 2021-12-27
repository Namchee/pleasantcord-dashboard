import * as React from 'react';

import useSWR from 'swr';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { fetcher } from '@/utils/fetcher';
import { ServerInfo } from '@/components/ServerInfo';
import { ConfigForm } from '@/components/ConfigForm';
import { APIResponse } from '@/entity/response';
import { Server } from '@/entity/server';
import { Category } from '@/entity/category';
import { Configuration } from '@/entity/config';

function ServerDashboard(): JSX.Element {
  const { query, push } = useRouter();
  const { id } = query;

  const { data: headerData } = useSWR<APIResponse<Server> >(
    id ? ['/api/servers', id] : null,
    (url, id) => fetcher(`${url}/${id}`),
  );

  const { data: categoriesData } = useSWR<APIResponse<Category[]> >(
    '/api/categories',
    fetcher,
  );
  const { data: configData, error } = useSWR<APIResponse<Configuration> >(
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

    return <ServerInfo
      key={`server-${id}`}
      server={server} />;
  };

  const form = () => {
    if (error && [400, 404].includes(error.status)) {
      push('/404');
      return;
    }

    if (!categoriesData || !configData) {
      return <ConfigForm.Skeleton />;
    }

    const { data: config } = configData;
    const { data: categories } = categoriesData;

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
