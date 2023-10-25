import classNames from 'classnames';
import React, { memo, ReactNode } from 'react';
import { ButtonType } from './Button';
import './ButtonGroup.scss';

interface ButtonGroupType {
  variant?: 'contained' | 'text';
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

const variantMapping = {
  contained: 'dodoButtonGroupContained',
  text: 'dodoButtonGroupText',
};

const ButtonGroup = ({
  variant = 'contained',
  className,
  disabled,
  children,
  ...props
}: ButtonGroupType) => {
  const styling = classNames(className, variantMapping[variant]);

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        disabled: disabled,
      } as ButtonType);
    }
    return child;
  });

  return (
    <div className={styling} {...props}>
      {childrenWithProps}
    </div>
  );
};

export default memo(ButtonGroup);
