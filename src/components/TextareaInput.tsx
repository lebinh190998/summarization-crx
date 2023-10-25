import classNames from 'classnames';
import React, { memo, ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './TextareaInput.scss';

interface TextareaInputType {
  value: string;
  rows?: number;
  cols?: number;
  isReadOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextareaInput = ({
  value = '',
  rows = 3,
  cols = 50,
  isReadOnly = false,
  onChange,
  onBlur,
  onKeyUp,
  className,
}: TextareaInputType) => {

  const [textValue, setTextValue] = useState(value)

  useEffect(() => {
    setTextValue(value)
  }, [value])

  return (
    <div className={classNames('dodoTextareaWrapper', className)}>
      <textarea
        className={'dodoTextarea'}
        rows={rows}
        cols={cols}
        value={textValue}
        onChange={(e) => {
          setTextValue(e.target.value)
          onChange && onChange(e)
        }}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default memo(TextareaInput);
