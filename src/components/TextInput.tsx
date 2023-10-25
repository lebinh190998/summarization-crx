import classNames from 'classnames';
import React, {
  memo,
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import './TextInput.scss';

interface TextInputType {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  accessories?: ReactNode;
  className?: string;
  type?: string;
}

const TextInput = ({
  value = '',
  accessories,
  onChange,
  onBlur,
  onKeyDown,
  className,
  type = 'text',
}: TextInputType) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={classNames('dodoInputWrapper', className)}>
      <input
        className={'dodoInput'}
        type={type}
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e) {
            setInputValue(e.target.value);
            onChange(e);
          }
        }}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e && onKeyDown) {
            if (['ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
              e.stopPropagation();
              e.preventDefault();
            }
            onKeyDown(e);
          }
        }}
      ></input>
      {accessories}
    </div>
  );
};

export default memo(TextInput);
