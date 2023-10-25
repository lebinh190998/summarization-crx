import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

import store from '../../redux/store';
import { Provider } from 'react-redux';
import { COMMAND_MESSAGES } from '../../constant';

import '../../styles.scss';
import { Utils } from '../../utils';

/***
 *
 * GLOBAL VARIABLES
 *
 * */
const DODO_CLASSNAME = {
  DODO_CSS_PREFIX: 'dodo',
  DODO_DICT: 'dodo-dict',
  DODO_WRITING_TRANSLATION: 'dodo-writing-translation',
};

let IS_EMBEDED = false;

let fontAnton = new FontFace(
  'Anton-Regular',
  `url('chrome-extension://${chrome.runtime.id}/Anton-Regular.ttf')`
);
document.fonts.add(fontAnton);
let fontPrompt = new FontFace(
  'Prompt-Regular',
  `url('chrome-extension://${chrome.runtime.id}/Prompt-Regular.ttf')`
);
document.fonts.add(fontPrompt);
let fontPromptBold = new FontFace(
  'Prompt-Bold',
  `url('chrome-extension://${chrome.runtime.id}/Prompt-Bold.ttf')`
);
document.fonts.add(fontPromptBold);

const WRITING_POPUP_URL_BLACLKLIST = {
  'www.notion.so': 'notion',
};

const embedSelector = {
  facebook: {
    largeScreen: "div[role='complementary']",
    smallScreen: "div[role='main']",
  },
  google: "div[id='rcnt']",
  youtube: {
    homepage: '#contents .ytd-rich-grid-row',
    watch: '#related',
  },
  instagram: {
    homepage: "[role^='main']>:first-child>section",
  },
  stackoverflow: "[role='main']",
  tiktok: "[data-e2e='nav-foryou']",
  shopee: "div[role='main']",
  lazada: {
    homepage: "[class='page']",
    productPage: '#root',
  },
  tiki: '#main-header',
  default: {
    sidebar: "[class^='sidebar']",
    main: "[class^='main']",
  },
};

/***
 *
 * HELPER FUNCTIONS
 *
 * */
const removePopup = (currentPopupElement) => {
  if (currentPopupElement) {
    currentPopupElement.parentNode.removeChild(currentPopupElement);
  }
};

const renderPopup = (selectedString, rightPosition, bottomPosition) => {
  const popupElement = document.createElement('div');
  popupElement.setAttribute('id', DODO_CLASSNAME.DODO_DICT);
  ReactDOM.render(
    <Provider store={store}>
      <Popup
        xPosition={rightPosition}
        yPosition={bottomPosition}
        translate={selectedString}
      />
    </Provider>,
    popupElement
  );
  return popupElement;
};

const showPopup = (popupElement, popupId) => {
  const element = document.getElementsByTagName('body')[0];
  element.appendChild(popupElement);
  document.getElementById(popupId).focus();
};

const isFocusClick = (e) => {
  const clickTargetClassname = e.target.className;
  const targetElement = e.target;

  if (!clickTargetClassname || !targetElement) {
    return false;
  }

  if (
    Object.values(DODO_CLASSNAME).includes(clickTargetClassname) ||
    clickTargetClassname.startsWith(DODO_CLASSNAME.DODO_CSS_PREFIX) ||
    targetElement?.closest(`[class*="${DODO_CLASSNAME.DODO_CSS_PREFIX}"]`)
  ) {
    return true;
  }

  return false;
};

const getString = () => {
  const selectedString = window.getSelection().toString();
  return selectedString;
};

const getStringPosition = (e) => {
  const selectedElement = window.getSelection().getRangeAt(0);
  const { right: rightPosition, bottom: bottomPosition } =
    selectedElement.getBoundingClientRect();
  const cursorX = e.pageX;
  const cursorY = e.pageY;
  const distance = Math.sqrt(
    Math.pow(rightPosition - cursorX, 2) + Math.pow(bottomPosition - cursorY, 2)
  );
  if (distance > 300) {
    const padding = 10;
    const { x, y } = document.body.getBoundingClientRect();
    return {
      rightPosition: cursorX + x + padding,
      bottomPosition: cursorY + y + padding,
    };
  } else {
    return { rightPosition, bottomPosition };
  }
};

/***
 *
 * DOM MANIPULATION
 *
 * */
document.addEventListener('mouseup', (e) => {
  try {
    // No action if clicking action is inside the Popup
    if (isFocusClick(e)) {
      return;
    }

    // Remove all current Popups
    const currentPopupElement = document.getElementById(
      DODO_CLASSNAME.DODO_DICT
    );
    if (currentPopupElement) {
      removePopup(currentPopupElement);
    }

    // No action if string empty
    const selectedString = getString();
    if (selectedString === '') {
      return;
    }

    const { rightPosition, bottomPosition } = getStringPosition(e);

    const popupElement = renderPopup(
      selectedString,
      rightPosition + window.scrollX,
      bottomPosition + window.scrollY
    );
    showPopup(popupElement, DODO_CLASSNAME.DODO_DICT);
  } catch (e) {
    console.log('There is an error');
    console.error(e);
  }
});

if (module.hot) module.hot.accept();
