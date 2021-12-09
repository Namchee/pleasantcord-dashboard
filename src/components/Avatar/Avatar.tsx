import * as React from 'react';

export type AvatarProps = {
  name: string;
  rounded?: boolean;
  className?: string;
}

function Avatar(
  { name, rounded, className }: React.PropsWithoutRef<AvatarProps>,
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
        bg-background-deep
        ${className}`}>
      {initial()}
    </div>
  );
}

export default Avatar;
