import classNames from 'classnames';
import React, { memo, ReactNode } from 'react';
import './Container.scss';

interface ContainerType {
  children: ReactNode;
  highlighted?: boolean;
  className?: string;
  onClick?: () => void;
}

const Container = ({
  children,
  highlighted,
  className,
  onClick,
}: ContainerType) => {
  const styling = classNames(
    className,
    'dodoContainer',
    onClick ? 'dodoClickable' : null,
    highlighted ? 'dodoHighlighted' : null
  );

  return (
    <div className={styling} onClick={onClick}>
      {children}
    </div>
  );
};

export default memo(Container);
