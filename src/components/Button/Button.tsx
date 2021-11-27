import { StyleProps } from '@/common/style';
import * as React from 'react';

const themeStyles = {
  primary: `bg-accent
  text-white
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-accentDark
  active:bg-accentDark
  focus:(outline-none bg-accentDark ring ring-4 ring-accent ring-opacity-50)`,
  accent: `bg-primary
  text-white
  rounded-md
  transition-shadow
  transition-colors
  hover:bg-primaryDark
  active:bg-primaryDark
  focus:(outline-none bg-primaryDark ring ring-4 ring-primary ring-opacity-50)`,
};

export interface ButtonProps extends StyleProps {
  theme: keyof typeof themeStyles;
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  theme,
  type,
  onClick,
  className,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element {
  const style = () => {
    const baseTheme = themeStyles[theme];

    return `${baseTheme} ${className}`;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={style()}>
      {children}
    </button>
  );
}

export default Button;
