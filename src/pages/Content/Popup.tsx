import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './Popup.scss';
import '../../styles.scss';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { Button, Icon, TextStatic } from '../../components';
import { Utils } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import { loadLanguage } from '../../redux/actions';

interface PopupType {
  textContent: string;
}

const GamePopup = ({ textContent }: PopupType) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();

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
            className={classNames('dodoGamePopupContainer', 'dodoZIndex')}
            style={{
              position: 'absolute',
              left: defaultPosition.x - 300,
              top: defaultPosition.y,
            }}
          >
            <GamePopupDetails
              textContent={textContent}
              handleExpand={handleExpand}
            />
          </div>
        </Draggable>
      ) : (
        <Draggable bounds="body" onDrag={eventControl} onStop={eventControl}>
          <div
            className={classNames('dodoGamePopupContainer', 'dodoZIndex')}
            style={{
              position: 'absolute',
              left: defaultPosition.x,
              top: defaultPosition.y,
            }}
          >
            <GamePopupIcon handleExpand={handleExpand} />
          </div>
        </Draggable>
      )}
    </>
  );
};

interface GamePopupDetails {
  textContent: string;
  handleExpand: (event: any, expand: boolean) => void;
}

export const GamePopupDetails = ({
  textContent,
  handleExpand,
}: GamePopupDetails) => {
  // global state
  const { language } = useSelector((state: RootState) => state.popup);

  const dispatch = useDispatch();

  return (
    <div className={'dodoGamePopup'}>
      <div className="dodoGamePopupHeader">
        <Icon
          className="dodoGameIcon"
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
      <div className="dodoGamePopupBody">{textContent}</div>
    </div>
  );
};

interface GamePopupIconType {
  handleExpand: (event: any, expand: boolean) => void;
}

const GamePopupIcon = ({ handleExpand }: GamePopupIconType) => {
  // global state
  const { language } = useSelector((state: RootState) => state.popup);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isHovered ? (
        <Button
          className="dodoPopupIconWrapper"
          variant="primary"
          size="normal"
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo.svg')}
            />
          }
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => handleExpand(e, true)}
        >
          <span className="dodoPopupLabel">
            {Utils.translateText(`${language}.general.revise`)}
          </span>
        </Button>
      ) : (
        <Button
          className="dodoPopupIconCircle dodoPopupIconWrapper"
          variant="invisible"
          size="normal"
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo-transparent.svg')}
            />
          }
          onMouseEnter={() => setIsHovered(true)}
          onClick={(e) => handleExpand(e, true)}
        />
      )}
    </>
  );
};

export default memo(GamePopup);
