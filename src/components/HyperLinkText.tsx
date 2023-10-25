import React, { memo } from 'react';
import './HyperLinkText.scss';

interface HyperLinkTextType {
  children: string;
  redirect?: (text: string) => void;
}

const HyperLinkText = ({ children = '', redirect }: HyperLinkTextType) => {
  const handleClick = (text: string) => {
    if (redirect) redirect(text);
  };

  return (
    <a className={'dodoHyperlink'} onClick={() => handleClick(children)}>
      {children}
    </a>
  );
};

export default memo(HyperLinkText);
