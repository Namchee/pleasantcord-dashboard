import * as React from 'react';

import { AuthGuard } from '@/components/AuthGuard';

function Dashboard(): JSX.Element {
  return (
    <AuthGuard>
      <p>Congratulations, You have logged in!</p>
    </AuthGuard>
  );
}

export default Dashboard;
