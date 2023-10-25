import { secrets } from 'secrets';
import { HOST_URL, STAGING_URL, LANGUAGE_CODES } from '../../constant';
import { v4 as uuidv4 } from 'uuid';
import { FEATURE_FLAGS } from '../../flag';
import { Utils } from '../../utils';

/**
 * HELPERS
 */
const sendRequest = async ({
  url,
  method = 'GET',
  headers,
  body,
  isJson = false,
  isBlob = false,
}: {
  url: string;
  method: any;
  headers: any;
  body?: any;
  isJson?: boolean;
  isBlob?: boolean;
}) => {
  const response = await fetch(url, { method, headers, body });
  let responseData;
  if (isJson) {
    responseData = await response.json();
  } else if (isBlob) {
    responseData = await response.blob();
  } else {
    responseData = await response.text();
  }
  return responseData;
};

const requestUpdateLanguage = async (
  language: string,
  sendReponse: (respose: any) => void
) => {
  chrome.storage.local.set({ language: language });
  chrome.storage.local.get(['language'], async (result) => {
    sendReponse({
      data: {
        languageRes: result.language,
      },
    });
  });
};

const requestGetLanguage = async (sendReponse: (respose: any) => void) => {
  chrome.storage.local.get(['language'], async (result) => {
    if (result.language) {
      sendReponse({
        data: {
          languageRes: result.language,
        },
      });
    } else {
      sendReponse({
        data: {
          languageRes: LANGUAGE_CODES.VIETNAMESE,
        },
      });
    }
  });
};

const requestAutocompleteWords = async (
  word: string,
  sendReponse: (respose: any) => void
) => {
  const autocompleteResponse = await crawlCambridgeAutocomplete(word);
  const autocompleteWords = autocompleteResponse
    .map((res: { word: string }) => res.word)
    .filter((word: string) => word.split(' ').length < 2);
  sendReponse({
    data: {
      autocompleteWords,
    },
  });
};
const crawlCambridgeAutocomplete = async (word: string) => {
  const myHeaders = new Headers();

  const response = await sendRequest({
    url: `https://dictionary.cambridge.org/autocomplete/amp?dataset=english-vietnamese&q=${word}&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org`,
    method: 'GET',
    headers: myHeaders,
    isJson: true,
  });
  return response;
};

export const Serivces = {
  requestUpdateLanguage,
  requestGetLanguage,
  requestAutocompleteWords,
};
