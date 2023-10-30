import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './Popup.scss';
import '../../styles.scss';
import {
  Button,
  Icon,
  Searchbar,
  TextContainer,
  TextStatic,
  TextareaInput,
} from '../../components';
import { LANGUAGE_CODES } from '../../constant';
import { Utils } from '../../utils';

import { RootState } from '../../redux/types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getCurrentPageContent,
  loadLanguage,
  redirect,
  summarize,
  toggleLanguage,
} from '../../redux/actions';
import { setSummarization } from '../../redux/popup';

const Popup = () => {
  // global state
  const { summarization, language } = useSelector(
    (state: RootState) => state.popup,
    shallowEqual
  );

  const dispatch = useDispatch();

  // local state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentPageContent(dispatch);
  }, []);

  return (
    <div className="dodoCornerPopup">
      {isLoading ? (
        <Icon
          className="dodoSpinningIcon"
          src={chrome.runtime.getURL('spinner-solid.svg')}
        />
      ) : (
        <div className="dodoPopupBody">
          <div>
            <TextStatic variant={'h3'}>
              {Utils.translateText(`${language}.general.full_text`)}
            </TextStatic>
            <TextContainer
              childElements={[
                <TextareaInput
                  className="dodoInvisibleInput"
                  value={summarization.original}
                  rows={8}
                  onChange={(e) =>
                    dispatch(
                      setSummarization({
                        ...summarization,
                        original: e.target.value,
                      })
                    )
                  }
                />,
              ]}
            />
          </div>
          <div className="dodoButtonContainer">
            <Button
              variant="primary"
              size="normal"
              onClick={() => summarize(dispatch, summarization.original)}
              accessories={
                <Icon
                  className="dodoRotate90"
                  src={chrome.runtime.getURL(
                    'arrow-right-arrow-left-solid.svg'
                  )}
                />
              }
            />
          </div>
          <div>
            <TextStatic variant={'h3'}>
              {Utils.translateText(`${language}.general.summarized_text`)}
            </TextStatic>
            <TextContainer
              childElements={[
                <TextareaInput
                  className="dodoInvisibleInput"
                  value={summarization.summarized}
                  rows={8}
                  isReadOnly={true}
                />,
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Popup);
