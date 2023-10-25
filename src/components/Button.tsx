import classNames from 'classnames';
import React, { memo, ReactNode } from 'react';
import './Button.scss';

export interface ButtonType {
  id?: string;
  variant: 'primary' | 'secondary' | 'invisible' | 'border';
  size?: 'large' | 'normal' | 'small' | 'stretch';
  className?: string;
  children?: ReactNode;
  accessories?: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
}

const variantMapping = {
  primary: 'dodoButtonPrimary',
  secondary: 'dodoButtonSecondary',
  invisible: 'dodoButtonInvisible',
  border: 'dodoButtonBorder'
};

const sizeMapping = {
  large: 'dodoButtonLarge',
  normal: 'dodoButtonNormal',
  small: 'dodoButtonSmall',
  stretch: 'dodoButtonStretch',
};

const Button = ({
  id,
  variant = 'primary',
  size = 'normal',
  className,
  disabled,
  children,
  accessories,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onMouseLeave,
  onMouseEnter,
  ...props
}: ButtonType) => {
  const styling = classNames(
    className,
    variantMapping[variant],
    sizeMapping[size]
  );

  return (
    <button
      id={id}
      className={styling}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {accessories}
      {children}
    </button>
  );
};

export default memo(Button);
