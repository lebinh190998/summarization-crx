import React from 'react';
import ReactDOM from 'react-dom';

import store from '../../redux/store';
import { Provider } from 'react-redux';
import { COMMAND_MESSAGES } from '../../constant';
import GamePopup from './Popup';

import '../../styles.scss';
import { Utils } from '../../utils';

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
const getAllTextContent = (element) => {
  if (!element) {
    return '';
  }

  // Exclude 'script' tags
  if (element.tagName && element.tagName.toLowerCase() === 'script') {
    return '';
  }

  let textContent = '';

  // If the element is a text node, add its content to the result
  if (element.nodeType === Node.TEXT_NODE) {
    textContent += `${element.textContent.trim()}. `;
  }

  // If the element has child nodes, recursively process them
  if (element.childNodes.length > 0) {
    for (const childNode of element.childNodes) {
      textContent += getAllTextContent(childNode);
    }
  }

  return textContent;
};

const removePopup = (currentPopupElement) => {
  if (currentPopupElement) {
    currentPopupElement.parentNode.removeChild(currentPopupElement);
  }
};

const renderPopup = (textContent) => {
  const gamepopupElement = document.createElement('div');
  gamepopupElement.setAttribute('id', DODO_CLASSNAME.DODO_GAME);
  ReactDOM.render(
    <Provider store={store}>
      <GamePopup textContent={textContent} />
    </Provider>,
    gamepopupElement
  );
  return gamepopupElement;
};

const addEmbedGame = () => {
  const currentPopupElement = document.getElementById(DODO_CLASSNAME.DODO_GAME);
  if (currentPopupElement) {
    removePopup(currentPopupElement);
  }

  const textContent = getAllTextContent(document.body);
  console.log(textContent);

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
} else {
  document.addEventListener('DOMContentLoaded', function () {
    addEmbedGame();
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === COMMAND_MESSAGES.CHANGE_URL) {
    addEmbedGame();
  }
});

if (module.hot) module.hot.accept();
