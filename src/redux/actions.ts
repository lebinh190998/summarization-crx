import { LANGUAGE_CODES } from '../constant';
import {
  getLanguage,
  updateLanguage,
  summarizeText,
  getPageContent,
} from '../ajax';
import { setLanguage, setSummarization, setTranslateTerm } from './popup';
import { Dispatch } from 'redux';
import { Utils } from '../utils';

/**
 * Load token from chrome storage to state
 */

export const loadLanguage = async (dispatch: Dispatch) => {
  const lang = await getLanguage();
  dispatch(setLanguage(lang));
};

export const toggleLanguage = async (
  dispatch: Dispatch,
  currentLanguage: string
) => {
  if (currentLanguage === LANGUAGE_CODES.VIETNAMESE) {
    const res = await updateLanguage(LANGUAGE_CODES.ENGLISH);
    dispatch(setLanguage(res));
  } else {
    const res = await updateLanguage(LANGUAGE_CODES.VIETNAMESE);
    dispatch(setLanguage(res));
  }
};

export const redirect = (
  dispatch: Dispatch,
  text: string,
  previousText?: string
) => {
  dispatch(
    setTranslateTerm({
      previous: previousText ?? '',
      current: text.trim(),
    })
  );
};

export const summarize = async (dispatch: Dispatch, text: string) => {
  const summarizedText = await summarizeText(text);
  dispatch(
    setSummarization({
      original: text,
      summarized: summarizedText,
    })
  );
};

export const getCurrentPageContent = async (dispatch: Dispatch) => {
  const pageContent = await getPageContent();
  dispatch(
    setSummarization({
      original: pageContent,
      summarized: '',
    })
  );
};
