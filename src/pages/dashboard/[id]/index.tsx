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
import { Configuration } from '@/entity/config';
import { Model } from '@/entity/model';
import { REFRESH_ERROR } from '@/constant/error';
import { DISCORD } from '@/constant/provider';
import { signIn } from 'next-auth/react';
import { Label } from '@/entity/category';

function ServerDashboard(): JSX.Element {
  const { query, push } = useRouter();
  const { id } = query;

  const { data: headerData } = useSWR<APIResponse<Server>>(
    id ? ['/api/servers', id] : null,
    (url, id) => fetcher(`${url}/${id}`)
  );

  const { data: categoriesData, error: categoryError } = useSWR<
    APIResponse<Record<Label, string> >
  >('/api/categories', fetcher);
  const { data: modelsData, error: modelError } = useSWR<
    APIResponse<Record<Model, string> >
  >('/api/models', fetcher);
  const { data: configData, error: configError } = useSWR<
    APIResponse<Configuration>
  >(id ? ['/api/configs', id] : null, (url, id) => fetcher(`${url}/${id}`));

  const header = () => {
    if (!headerData) {
      return <ServerInfo.Skeleton />;
    }

    const { data: server } = headerData;

    if (!server) {
      return <ServerInfo.Skeleton />;
    }

    return <ServerInfo key={`server-${id}`} server={server} />;
  };

  const form = () => {
    if (configError && [400, 404].includes(configError.status)) {
      push('/404');
      return;
    }

    if (!categoriesData || !configData || !modelsData) {
      return <ConfigForm.Skeleton />;
    }

    if (configError || categoryError || modelError) {
      const { message } = (configError || categoryError || modelError) as Error;

      if (message === REFRESH_ERROR) {
        signIn(DISCORD);
      }
    }

    const { data: config } = configData;
    const { data: categories } = categoriesData;
    const { data: models } = modelsData;

    return (
      <ConfigForm
        key={`server-${id}`}
        config={config}
        categories={categories}
        models={models}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Edit Configuration &mdash; Pleasantcord Dashboard</title>
      </Head>

      <AuthGuard>
        <DashboardLayout>
          <div className="mb-8">{header()}</div>
          <div className="mb-12 lg:mb-16 hidden">
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
