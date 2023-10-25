import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './InputGrid.scss';
import Icon from './Icon';
import { Utils } from '../utils';

interface InputGridProps {
  input: Array<string | undefined>;
  onInputChanged: (entry: string | undefined, index: number) => void;
  inputLength: number;
  state: 'correct' | 'incorrect' | 'base';
}

const BACKSPACE_KEY = 'Backspace';
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';

const InputGrid = ({
  inputLength,
  input,
  onInputChanged,
  state,
}: InputGridProps) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const changeFocus = (index: number) => {
    const ref = inputRefs.current[index];
    if (ref) {
      ref.focus();
    }
  };

  useEffect(() => {
    changeFocus(0);
  }, []);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousValue = event.target.defaultValue;
    const valuesArray = event.target.value.split('');
    Utils.removeValuesFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) {
      return;
    }
    const inputText = value.trim();
    if (inputText === '' || value.length === 0) {
      return;
    }

    onInputChanged(inputText, index);
    if (index < inputLength - 1) {
      changeFocus(index + 1);
    }
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if (keyboardKeyCode === BACKSPACE_KEY) {
      if (input[index] === undefined) {
        changeFocus(index - 1);
      } else {
        onInputChanged(undefined, index);
      }
    } else if (keyboardKeyCode === ARROW_LEFT_KEY) {
      changeFocus(index - 1);
    } else if (keyboardKeyCode === ARROW_RIGHT_KEY) {
      changeFocus(index + 1);
    } else {
      return;
    }
  };

  return (
    <div className="dodoInputGridContainer">
      {state === 'base' ? (
        Array.from({ length: inputLength }, (_, index) => (
          <input
            className="dodoInputGrid"
            type="text"
            onKeyDown={(event) => onKeyDown(event, index)}
            key={index}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            onChange={(event) => onChange(event, index)}
            value={input[index] || ''}
          />
        ))
      ) : state === 'correct' ? (
        <>
          {Array.from({ length: inputLength }, (_, index) => (
            <input
              className={classNames('dodoInputGrid', 'dodoInputGridCorrect')}
              type="text"
              onKeyDown={(event) => onKeyDown(event, index)}
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              onChange={(event) => onChange(event, index)}
              value={input[index] || ''}
            />
          ))}{' '}
          <Icon src={chrome.runtime.getURL('check-green.svg')} />
        </>
      ) : (
        <>
          {Array.from({ length: inputLength }, (_, index) => (
            <input
              className={classNames('dodoInputGrid', 'dodoInputGridIncorrect')}
              type="text"
              onKeyDown={(event) => onKeyDown(event, index)}
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              onChange={(event) => onChange(event, index)}
              value={input[index] || ''}
            />
          ))}
          <Icon src={chrome.runtime.getURL('xmark-solid.svg')} />
        </>
      )}
    </div>
  );
};

export default InputGrid;
