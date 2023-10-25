import React, { memo, ReactNode } from 'react';
import './TextStatic.scss';
import classNames from 'classnames';

interface TextStaticType {
  children: ReactNode;
  className?: string;
  variant: 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph';
  centered?: boolean;
  color?: 'primary' | 'secondary' | ''
  hover?: boolean
}

const variantMapping = {
  h0: 'dodoH0',
  h1: 'dodoH1',
  h2: 'dodoH2',
  h3: 'dodoH3',
  h4: 'dodoH4',
  paragraph: 'dodoParagraph',
};

const TextStatic = ({ children = '', className, variant, centered = false, color ='', hover= false }: TextStaticType) => {
  return (
    <div className={classNames("dodoTextStaticContainer", centered ? "dodoFlexCentered" : '')}>
      <div className={classNames(variantMapping[variant], className, color, hover ? 'hover' : '')}>
        {children}
      </div>
    </div>
  );
};

export default memo(TextStatic);
