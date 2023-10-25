import React, { memo } from 'react';
import classNames from 'classnames';
import './Icon.scss';

interface IconType {
  className?: string;
  src: string;
}

const Icon = ({ className, src }: IconType) => {
  return (
    <div className={classNames('dodoIcon', className)}>
      <img className="dodoIconImg" draggable={false} src={src} />
    </div>
  );
};

export default memo(Icon);
