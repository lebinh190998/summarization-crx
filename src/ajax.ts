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