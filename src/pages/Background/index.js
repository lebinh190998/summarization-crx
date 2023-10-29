import { COMMAND_MESSAGES, CAMBRIGE, LABAN } from '../../constant';
import { Serivces } from './Services';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: COMMAND_MESSAGES.CHANGE_URL,
      url: changeInfo.url,
    });
  }
});

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponseToContentScript) => {
    const tabId = sender?.tab?.id;
    console.log(message, tabId);

    switch (message.command) {
      case COMMAND_MESSAGES.SET_LANGUAGE:
        Serivces.requestUpdateLanguage(
          message.language,
          sendResponseToContentScript
        );
        break;
      case COMMAND_MESSAGES.GET_LANGUAGE:
        Serivces.requestGetLanguage(sendResponseToContentScript);
        break;
      case COMMAND_MESSAGES.GET_AUTOCOMPLETE_WORDS:
        Serivces.requestAutocompleteWords(
          message.word,
          sendResponseToContentScript
        );
        break;
      case COMMAND_MESSAGES.SUMMARIZE_TEXT:
        Serivces.requestSummarizeText(
          message.text,
          sendResponseToContentScript
        );
        break;
      default:
        break;
    }
    return true;
  }
);
