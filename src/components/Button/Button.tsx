import * as React from 'react';

import { SpinnerIcon } from '@/components/Icon';
import { StyleProps } from '@/common/style';

const themeStyles = {
  primary: `bg-primary
  text-white
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-primaryDark
  active:bg-primaryDark
  focus:(outline-none bg-primaryDark ring ring-4 ring-primary ring-opacity-50)`,
  accent: `bg-accent
  text-white
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-accentDark
  active:bg-accentDark
  focus:(outline-none bg-accentDark ring ring-4 ring-primary ring-opacity-50)`,
};

const disabledStyles = {
  primary: `bg-primary
  opacity-60
  text-white
  rounded-md
  cursor-not-allowed`,
  accent: '',
};

export interface ButtonProps extends StyleProps {
  theme: keyof typeof themeStyles;
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
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
