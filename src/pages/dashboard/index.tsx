import * as React from 'react';

import { AuthGuard } from '@/components/AuthGuard';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <p>This is protected</p>
    </AuthGuard>
  );
}

Dashboard.protected = true;

export default Dashboard;
