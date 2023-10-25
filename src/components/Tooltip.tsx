import React, { memo, ReactNode, useState } from 'react';
import './Tooltip.scss';
import classNames from 'classnames';

interface TooltipType {
  text: string;
  children?: ReactNode;
  className?: string;
  placement?: 'top' | 'bottom';
}

const placementMapping = {
  top: 'dodoTop',
  bottom: 'dodoBottom',
};

const Tooltip = ({
  text = '',
  children,
  className,
  placement = 'bottom',
}: TooltipType) => {
  const [isShow, setIsShow] = useState(false);

  const handleMouseIn = () => {
    setIsShow(true);
  };

  const handleMouseOut = () => {
    setIsShow(false);
  };

  return (
    <div
      className="dodoTooltipWrapper"
      onMouseOver={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      {isShow && (
        <div
          className={classNames(
            'dodoTooltip',
            placementMapping[placement],
            className
          )}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
};

export default memo(Tooltip);
