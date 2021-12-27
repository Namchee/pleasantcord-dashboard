import * as React from 'react';

import Lottie from 'react-lottie-player';
import * as animation from '@/animations/loading.json';

function AuthLoader(): JSX.Element {
  return (
    <div className="flex-1 grid place-items-center bg-background">
      <Lottie
        loop
        animationData={animation}
        play
        speed={1.75}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
        className="w-320px h-320px" />
    </div>
  );
}

export default AuthLoader;
