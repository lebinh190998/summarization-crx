import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

import store from '../../redux/store';
import { Provider } from 'react-redux';

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

render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  window.document.getElementsByTagName('body')[0]
);

if (module.hot) module.hot.accept();
