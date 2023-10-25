import React, { memo, ReactNode } from 'react';
import { TextStatic } from '../../components';
import './ErrorPage.scss';

interface ErrorPageType {
  children: ReactNode;
}

const ErrorPage = ({ children }: ErrorPageType) => {
  return (
    <>
      <TextStatic variant={'h1'} className={'dodoErrorHeading'}>
        Oops, something went wrong
      </TextStatic>
      <TextStatic className={'dodoErrorMessage'} variant={'h3'}>
        {children}
      </TextStatic>
    </>
  );
};

export default memo(ErrorPage);
