import React, { memo, useEffect, useMemo, useState } from 'react';
import './Popup.scss';
import '../../styles.scss';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import {
  Button,
  Icon,
  TextContainer,
  TextStatic,
  TextareaInput,
} from '../../components';
import { Utils } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import { loadLanguage, summarize } from '../../redux/actions';
import { setSummarization } from '../../redux/popup';

interface PopupType {
  textContent: string;
}

const Popup = ({ textContent }: PopupType) => {
  const dispatch = useDispatch();

  // local state
  const [isExpand, setIsExpand] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    loadLanguage(dispatch);
  }, []);

  const eventControl = (event: any, info: any) => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      setIsDragging(true);
    }

    if (event.type === 'mouseup' || event.type === 'touchend') {
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    }
  };

  const handleExpand = (event: any, expand: boolean) => {
    if (isDragging === false) {
      setIsExpand(expand);
      if (expand) {
        dispatch(
          setSummarization({
            original: textContent,
            summarized: '',
          })
        );
      }
    }
  };

  const defaultPosition = useMemo(() => {
    return {
      x: window.innerWidth - 100,
      y: 100,
    };
  }, []);

  return (
    <>
      {isExpand ? (
        <Draggable bounds="body" onDrag={eventControl} onStop={eventControl}>
          <div
            className={classNames('dodoPopupContainer', 'dodoZIndex')}
            style={{
              position: 'absolute',
              left: defaultPosition.x - 300,
              top: defaultPosition.y,
            }}
          >
            <PopupDetails handleExpand={handleExpand} />
          </div>
        </Draggable>
      ) : (
        <Draggable bounds="body" onDrag={eventControl} onStop={eventControl}>
          <div
            className={classNames('dodoPopupContainer', 'dodoZIndex')}
            style={{
              position: 'absolute',
              left: defaultPosition.x,
              top: defaultPosition.y,
            }}
          >
            <PopupIcon handleExpand={handleExpand} />
          </div>
        </Draggable>
      )}
    </>
  );
};

interface PopupDetails {
  handleExpand: (event: any, expand: boolean) => void;
}

export const PopupDetails = ({ handleExpand }: PopupDetails) => {
  const dispatch = useDispatch();

  // global state
  const { language, summarization } = useSelector(
    (state: RootState) => state.popup
  );

  return (
    <div className={'dodoPopup'}>
      <div className="dodoPopupHeader">
        <Icon
          className="dodoLogoIcon"
          src={chrome.runtime.getURL('logo.svg')}
        />
        <TextStatic variant={'h4'}>Header</TextStatic>
        <Button
          className="dodoContractButton"
          variant="invisible"
          size="normal"
          accessories={<Icon src={chrome.runtime.getURL('xmark.svg')} />}
          onClick={(e) => handleExpand(e, false)}
        />
      </div>
      <div className="dodoPopupBody">
        <div className="dodoLanguageSection">
          <TextStatic variant={'h3'}>
            {Utils.translateText(`${language}.general.full_text`)}
          </TextStatic>
          <TextContainer
            childElements={[
              <TextareaInput
                className="dodoInvisibleInput"
                value={summarization.original}
                rows={13}
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
                src={chrome.runtime.getURL('arrow-right-arrow-left-solid.svg')}
              />
            }
          />
        </div>
        <div className="dodoLanguageSection">
          <TextStatic variant={'h3'}>
            {Utils.translateText(`${language}.general.summarized_text`)}
          </TextStatic>
          <TextContainer
            childElements={[
              <TextareaInput
                className="dodoInvisibleInput"
                value={summarization.summarized}
                rows={13}
                isReadOnly={true}
              />,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

interface PopupIconType {
  handleExpand: (event: any, expand: boolean) => void;
}

const PopupIcon = ({ handleExpand }: PopupIconType) => {
  // global state
  const { language } = useSelector((state: RootState) => state.popup);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="dodoZIndex">
      {isHovered ? (
        <Button
          className="dodoPopupIconWrapper"
          variant="secondary"
          size="normal"
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo.svg')}
            />
          }
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => handleExpand(e, true)}
        />
      ) : (
        <Button
          className="dodoPopupIconWrapper"
          variant="invisible"
          size="normal"
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo.svg')}
            />
          }
          onMouseEnter={() => setIsHovered(true)}
          onClick={(e) => handleExpand(e, true)}
        />
      )}
    </div>
  );
};

export default memo(Popup);
