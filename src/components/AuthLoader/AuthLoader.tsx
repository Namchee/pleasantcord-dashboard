import * as React from 'react';

import Lottie from 'react-lottie';
import * as animation from '@/animations/loading.json';

function AuthLoader(): JSX.Element {
  const opts = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Lottie options={opts} width={320} height={320} speed={1.65} />
    </div>
  );
}

export default AuthLoader;
