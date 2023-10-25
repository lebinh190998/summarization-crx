import { WORD_LIMIT } from './constant';
import { language } from './language';

interface TokenPayload {
  sub: string;
  exp: number;
}

const sendBgMessage = (msg: string, args = {}): Promise<any> => {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ command: msg, ...args }, (response) => {
      if (isErrorAvailableInResponse(response)) return reject(response);
      return resolve(response);
    });
  });
};

const isErrorAvailableInResponse = (response: any) =>
  response && response.errorMessage;

const checkIsWord = (text: string) => {
  const wordsArray = text.split(' ');
  if (wordsArray.length > 1) {
    return false;
  }
  return true;
};

const checkWordCount = (text: string) => {
  const wordsArray = text.split(' ');
  if (wordsArray.length > WORD_LIMIT) {
    return false;
  }
  return true;
};

const onScrollSuggestion = (xpath: string, idx: number) => {
  const element = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as ParentNode;
  if (element != null && element.children.length > 0) {
    if (idx < 0) element.children[0].scrollIntoView(false);
    if (element.children[idx + 1])
      element.children[idx + 1].scrollIntoView(false);
    if (!element.children[idx + 1]) element.children[idx].scrollIntoView(false);
  }
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const removeValuesFromArray = (valuesArray: string[], value: string) => {
  const valueIndex = valuesArray.findIndex((entry) => entry === value);
  if (valueIndex === -1) {
    return;
  }
  valuesArray.splice(valueIndex, 1);
};

const translateText = (text: string) => {
  let obj = language;
  const arr = text.split('.');
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    value = value.toLowerCase();
    if (obj && typeof obj == 'object') {
      obj = (obj as any)[value as keyof typeof obj];
    } else {
      return null;
    }
  }
  return obj;
};

const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const compareWordsTenseInsensitive = (word: string, originalWord: string) => {
  let a = word.toLowerCase().replace(/[^a-zA-Z]/, '');
  let b = originalWord.toLowerCase();

  if (
    a === b ||
    a.slice(0, -1) === b || // 'cars' & 'car'
    a.slice(0, -2) === b || // 'passed' & 'pass'
    a.slice(0, -3) === b || // 'passing' & 'pass'
    a.includes(b) || // 'non-matching' & 'matching'
    a.slice(0, -3) === b.slice(0, -1) // 'replies' & 'reply'
  ) {
    return true;
  }

  return false;
};

const getTokenSubject = (token: string) => {
  const tokenWithoutBearer = token.replace(/^Bearer\s+/i, '');

  // Split the token into its three parts: header, payload, and signature
  const parts = tokenWithoutBearer.split('.');
  if (parts.length !== 3) {
    // Invalid token format
    return false;
  }

  // Decode the payload (part 1)
  const payload: TokenPayload = JSON.parse(atob(parts[1]));
  return payload.sub;
};

const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  const tokenWithoutBearer = token.replace(/^Bearer\s+/i, '');

  // Split the token into its three parts: header, payload, and signature
  const parts = tokenWithoutBearer.split('.');
  if (parts.length !== 3) {
    // Invalid token format
    return false;
  }

  // Decode the payload (part 1)
  const payload: TokenPayload = JSON.parse(atob(parts[1]));

  // Check the token's expiration time (exp)
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (payload.exp <= currentTimestamp) {
    return false;
  }

  return true;
};

const capitalizeFirstLetter = (str: string) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Utils = {
  sendBgMessage,
  checkIsWord,
  onScrollSuggestion,
  checkWordCount,
  getRandomInt,
  translateText,
  shuffle,
  removeValuesFromArray,
  compareWordsTenseInsensitive,
  isTokenValid,
  getTokenSubject,
  capitalizeFirstLetter,
};
