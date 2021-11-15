import * as React from 'react';

import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLayout } from '@/layout';
import { useRouter } from 'next/dist/client/router';

function ServerDashboard(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AuthGuard>
      <DashboardLayout>
        <p className="p-16">Server id is <b>{id}</b></p>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default ServerDashboard;
