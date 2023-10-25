import classNames from 'classnames';
import React, { memo } from 'react';
import './ProgressBar.scss';

export interface ProgressBarType {
  id?: string;
  value: number;
  max?: string;
  className?: string;
}

const ProgressBar = ({
  id,
  value = 0,
  max = '100',
  className,
  ...props
}: ProgressBarType) => {
  const styling = classNames(className, 'dodoProgressBar');

  return (
    <progress
      id={id}
      className={styling}
      max={max}
      value={value}
      {...props}
    ></progress>
  );
};

export default memo(ProgressBar);
