import * as React from 'react';

export type AvatarProps = {
  name: string;
  rounded?: boolean;
}

function Avatar(
  { name, rounded }: React.PropsWithoutRef<AvatarProps>,
): JSX.Element {
  const initial = () => {
    return name.split(' ').map((v) => v[0]).slice(0, 2).join('');
  };

  return (
    <div
      role="image"
      aria-label={name}
      className={`grid place-items-center
        ${rounded ? 'rounded-full' : 'rounded-md'}
        bg-dark
        w-10 h-10
        text-base`}>
      {initial()}
    </div>
  );
}

export default Avatar;
