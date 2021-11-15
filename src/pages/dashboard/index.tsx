import * as React from 'react';

import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayout from '@/layout/DashboardLayout';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <DashboardLayout>
        <p className="p-16">You are authenticated</p>
      </DashboardLayout>
    </AuthGuard>
  );
}

export default Dashboard;
