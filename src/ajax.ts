import { COMMAND_MESSAGES } from './constant';
import { Utils } from './utils';

export const updateLanguage = async (language: string) => {
  const {
    data: { languageRes },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.SET_LANGUAGE, {
    language: language,
  })) as { data: { languageRes: string } };
  return languageRes;
};

export const getLanguage = async () => {
  const {
    data: { languageRes },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.GET_LANGUAGE)) as {
    data: { languageRes: string };
  };
  return languageRes;
};

export const getAutoCompleteWords = async (word: string) => {
  const {
    data: { autocompleteWords },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.GET_AUTOCOMPLETE_WORDS, {
    word: word,
  })) as { data: { autocompleteWords: string[] } };

  return autocompleteWords;
};

export const summarizeText = async (text: string) => {
  const {
    data: { summarizedText },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.SUMMARIZE_TEXT, {
    text: text,
  })) as {
    data: { summarizedText: string };
  };
  return summarizedText;
};

export const savePageContent = async (pageContent: string) => {
  const {
    data: { isSaved },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.SAVE_CONTENT, {
    pageContent,
  })) as {
    data: { isSaved: boolean };
  };
  return isSaved;
};

export const getPageContent = async () => {
  const {
    data: { pageContent },
  } = (await Utils.sendBgMessage(COMMAND_MESSAGES.GET_CONTENT)) as {
    data: { pageContent: string };
  };
  return pageContent;
};
