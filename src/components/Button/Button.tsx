import * as React from 'react';

import { SpinnerIcon } from '@/components/Icon';
import { StyleProps } from '@/common/style';

const themeStyles = {
  primary: `bg-primary
  text-content
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-primary-dark
  active:bg-primary-dark
  focus:outline-none
  focus:(bg-primary-dark ring ring-4 ring-primary ring-opacity-50)`,
  accent: `bg-accent
  text-content
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-accent-dark
  active:bg-accent-dark
  focus:(outline-none bg-accent-dark ring ring-4 ring-accent ring-opacity-50)`,
  danger: `bg-danger
  text-content
  rounded-md
  transition-shadow
  focus:(outline-none bg-ring-dark ring ring-4 ring-danger ring-opacity-50)`,
};

const disabledStyles = {
  primary: `bg-primary
  opacity-60
  text-white
  rounded-md
  cursor-not-allowed`,
  accent: '',
  danger: '',
};

export interface ButtonProps extends StyleProps {
  theme: keyof typeof themeStyles;
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'fill' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  theme,
  type,
  onClick,
  className,
  disabled,
  loading,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element {
  const style = () => {
    const baseTheme = disabled || loading ?
      disabledStyles[theme] :
      themeStyles[theme];

    return `${baseTheme} ${className}`;
  };

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={style()}>
      {loading ? <SpinnerIcon className="w-6 h-6 animate-spin" />: children}
    </button>
  );
}

export default Button;
