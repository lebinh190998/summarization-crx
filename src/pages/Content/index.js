import React from 'react';
import ReactDOM from 'react-dom';

import store from '../../redux/store';
import { Provider } from 'react-redux';
import { COMMAND_MESSAGES } from '../../constant';
import Popup from './Popup';
import { getAllTextContent } from '../../domService';

import '../../styles.scss';
import { Utils } from '../../utils';
import { savePageContent } from '../../ajax';

/***
 *
 * GLOBAL VARIABLES
 *
 * */
const DODO_CLASSNAME = {
  DODO_GAME: 'dodo-game',
};

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

const renderPopup = (textContent) => {
  const popupElement = document.createElement('div');
  popupElement.setAttribute('id', DODO_CLASSNAME.DODO_GAME);
  ReactDOM.render(
    <Provider store={store}>
      <Popup textContent={textContent} />
    </Provider>,
    popupElement
  );
  return popupElement;
};

const addEmbedGame = async () => {
  const currentPopupElement = document.getElementById(DODO_CLASSNAME.DODO_GAME);
  if (currentPopupElement) {
    removePopup(currentPopupElement);
  }

  const rawText = getAllTextContent(document.body);
  const textContent = Utils.preprocessText(rawText);
  await savePageContent(textContent);

  showPopup(renderPopup(textContent), DODO_CLASSNAME.DODO_GAME);

  return;
};

const showPopup = (popupElement, popupId) => {
  const element = document.getElementsByTagName('body')[0];
  element.appendChild(popupElement);
  document.getElementById(popupId).focus();
};

/***
 *
 * DOM MANIPULATION
 *
 * */
if (document.readyState !== 'loading') {
  addEmbedGame();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === COMMAND_MESSAGES.CHANGE_URL) {
    addEmbedGame();
  }
});

if (module.hot) module.hot.accept();
