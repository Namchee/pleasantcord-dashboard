import * as React from 'react';

import { StyleProps } from '@/common/style';

function Skeleton(
  { className }: React.PropsWithoutRef<StyleProps>,
): JSX.Element {
  const style = () => {
    return `animate-pulse bg-surface ${className}`;
  };

  return (
    <div
      aria-hidden="true"
      aria-busy="true"
      className={style()} />
  );
}

export default Skeleton;
