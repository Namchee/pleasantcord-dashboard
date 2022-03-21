import * as React from 'react';

import { Trigger } from '@radix-ui/react-tabs';

export type FormTabProps = {
  name: string;
  value: string;
  isActive: boolean;
};

function FormTab({
  name,
  value,
  isActive,
}: React.PropsWithoutRef<FormTabProps>): JSX.Element {
  const style = () => {
    let baseStyle = `py-4
      text-content
      transition-colors
      hover:text-opacity-100`;

    if (isActive) {
      baseStyle = `${baseStyle} border-b-2 border-white`;
    } else {
      baseStyle = `${baseStyle} text-opacity-50`;
    }

    return baseStyle;
  };

  return (
    <Trigger
      value={value}
      className={style()}
    >
      {name}
    </Trigger>
  );
}

export default FormTab;
