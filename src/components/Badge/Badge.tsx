import { StyleProps } from '@/common/style';
import * as React from 'react';

export interface BadgeProps extends StyleProps {
  label?: string;
}

function Badge(
  { label, children, className }: React.PropsWithChildren<BadgeProps>,
): JSX.Element {
  return (
    <div
      className={className}
      aria-label={label}>
      {children}
    </div>
  );
}

function GrassBadge(
  { children, label, className }: React.PropsWithChildren<BadgeProps>,
): JSX.Element {
  return <Badge
    label={label}
    className={`${className} bg-grass`}>
    {children}
  </Badge>;
}

Badge.Grass = GrassBadge;

export default Badge;
