import React, { ReactNode } from 'react';

interface EmojiType {
  label: string;
  symbol?: ReactNode;
}

const Emoji = ({ label, symbol, ...props }: EmojiType) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);
export default Emoji;
