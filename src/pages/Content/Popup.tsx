import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ErrorPage from './ErrorPage';
import './Popup.scss';
import '../../styles.scss';
import { Searchbar, Icon, Button } from '../../components';
import { Utils } from '../../utils';
import { LANGUAGE_CODES } from '../../constant';
import classNames from 'classnames';
import { RootState } from '../../redux/types';
import { setTranslateTerm } from '../../redux/popup';
import { useDispatch, useSelector } from 'react-redux';
import { PositionCssType } from '../../types';
import { loadLanguage, redirect, toggleLanguage } from '../../redux/actions';

interface PopupType {
  xPosition: number;
  yPosition: number;
  translate: string;
}

const Popup = ({ xPosition, yPosition, translate }: PopupType) => {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    loadLanguage(dispatch);
  }, []);

  const openPopupDetails = () => {
    setIsShowPopup(!isShowPopup);
    dispatch(
      setTranslateTerm({
        previous: '',
        current: translate,
      })
    );
  };

  const generatePositionCSS = (xPosition: number, yPosition: number) => {
    const cssObj: PositionCssType = { position: 'absolute' };

    if (window.innerWidth - xPosition - 20 < window.innerWidth / 3) {
      cssObj.right = window.innerWidth - xPosition - 20;
    } else {
      cssObj.left = xPosition;
    }

    if (window.innerHeight - yPosition + 15 < window.innerHeight / 3) {
      cssObj.bottom = window.innerHeight - yPosition + 15;
    } else {
      cssObj.top = yPosition;
    }
    return cssObj as React.CSSProperties;
  };

  const postionStyle: React.CSSProperties = generatePositionCSS(
    xPosition,
    yPosition
  );
  return (
    <>
      {isShowPopup ? (
        <PopupDetails postionStyle={postionStyle} />
      ) : (
        <PopupIcon
          postionStyle={postionStyle}
          openPopupDetails={openPopupDetails}
          translate={translate}
        ></PopupIcon>
      )}
    </>
  );
};

interface PopupDetails {
  postionStyle: React.CSSProperties;
}

const PopupDetails = ({ postionStyle }: PopupDetails) => {
  // global state
  const { translateTerm, language } = useSelector(
    (state: RootState) => state.popup
  );

  const dispatch = useDispatch();

  // local state
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classNames('dodoPopup', 'dodoZIndex')} style={postionStyle}>
      <div className="dodoNavBar">
        <Searchbar
          defaultTerm={translateTerm.current || ''}
          onSearch={(text) => redirect(dispatch, text)}
          showAutocomplete={true}
        ></Searchbar>
        <Button
          variant="invisible"
          size="normal"
          onClick={() => toggleLanguage(dispatch, language)}
          accessories={
            language === LANGUAGE_CODES.VIETNAMESE ? (
              <Icon src={chrome.runtime.getURL('vietnam.svg')} />
            ) : (
              <Icon src={chrome.runtime.getURL('usa.svg')} />
            )
          }
        />
      </div>
      <div className="dodoPopupContents">
        <div>Content</div>
      </div>
    </div>
  );
};

interface PopupIcon {
  postionStyle: React.CSSProperties;
  openPopupDetails: () => void;
  translate: string;
}

const PopupIcon = ({
  postionStyle,
  openPopupDetails,
  translate,
}: PopupIcon) => {
  const [isHovered, setIsHovered] = useState(false);
  // global state
  const { language } = useSelector((state: RootState) => state.popup);

  const handleClick = () => {
    const lessThanMaxinum = Utils.checkWordCount(translate);
    if (lessThanMaxinum) {
      openPopupDetails();
    }
  };

  const renderLabel = () => {
    return (
      <span className="dodoPopupLabel">
        {Utils.checkWordCount(translate)
          ? Utils.translateText(`${language}.general.translate`)
          : Utils.translateText(`${language}.popup.word_limit`)}
      </span>
    );
  };

  return (
    <div className="dodoZIndex" style={postionStyle}>
      {isHovered ? (
        <Button
          className="dodoPopupIconWrapper"
          variant="secondary"
          size="normal"
          disabled={!Utils.checkWordCount(translate)}
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo.svg')}
            />
          }
          onMouseLeave={() => setIsHovered(false)}
          children={renderLabel()}
          onClick={handleClick}
        />
      ) : (
        <Button
          className="dodoPopupIconWrapper"
          variant="invisible"
          size="normal"
          disabled={!Utils.checkWordCount(translate)}
          accessories={
            <Icon
              className="dodoPopupIcon"
              src={chrome.runtime.getURL('logo.svg')}
            />
          }
          onMouseEnter={() => setIsHovered(true)}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default memo(Popup);
