import * as React from 'react';

import { StyleProps } from '@/common/style';
import { UseFormRegister } from 'react-hook-form';
import { FormConfiguration } from '@/entity/config';

export interface CheckboxProps extends StyleProps {
  value: string;
  name: string;
  props: keyof FormConfiguration;
  register: UseFormRegister<FormConfiguration>;
  theme?: keyof typeof themeStyles;
  className?: string;
  disabled?: boolean;
  help?: JSX.Element | string;
}

const disabledStyle = `bg-background-light
  border border-background-dark
  rounded-md`;

const themeStyles = {
  primary: `w-6 h-6
    bg-background-dark
    transition-shadow
    border border-background-deep
    focus:(outline-none ring ring-3 ring-primary ring-opacity-50)
    text-primary
    rounded-md`,
};

function CheckBox(
  {
    value,
    name,
    props,
    help,
    register,
    disabled,
    theme,
    className,
  }: React.PropsWithoutRef<CheckboxProps>,
): JSX.Element {
  const style = () => {
    if (!theme) {
      return className;
    }

    const baseTheme = disabled ?
      disabledStyle :
      themeStyles[theme];

    return `${baseTheme} ${className}`;
  };

  return (
    <label
      className="flex items-start space-x-4 max-w-sm"
      htmlFor={`category-${name}`}
    >
      <input
        id={`category-${name}`}
        value={value}
        type="checkbox"
        className={style()}
        {...register(props)}
      />

      <div>
        <p className="text-lg">{name}</p>
        {help &&
          <p className="text-sm leading-relaxed opacity-50">
            {help}
          </p>
        }
      </div>
    </label>
  );
}

export default CheckBox;
