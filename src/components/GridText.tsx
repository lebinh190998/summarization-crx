import React, { memo } from 'react';
import HyperLinkText from './HyperLinkText';
import './GridText.scss';

interface GridTextType {
  texts: string[];
  redirect?: (text: string) => void;
}

const GridText = ({ texts = [], redirect }: GridTextType) => {
  return (
    <div className={'dodoGridText'}>
      {texts.map((text) => {
        return (
          <HyperLinkText key={text} redirect={redirect}>
            {text}
          </HyperLinkText>
        );
      })}
    </div>
  );
};

export default memo(GridText);
