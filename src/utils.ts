import { language } from './language';

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

const capitalizeFirstLetter = (str: string) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const preprocessText = (inputText: string) => {
  // Replace consecutive dots (2 or more) with a space
  const cleanedText = inputText.replace(/\.{2,}/g, ' ');

  // Replace any remaining single dots with a space
  const cleanedTextWithSingleDots = cleanedText.replace(/\./g, ' ');

  // Split the input text by spaces
  const words = cleanedTextWithSingleDots.split(' ');

  // Filter and join only the words that are not empty
  const meaningfulWords = words.filter((word) => word.trim() !== '');

  // Join the meaningful words with spaces to form the resulting text
  const resultText = meaningfulWords.join(' ');

  return resultText;
};

export const Utils = {
  sendBgMessage,
  onScrollSuggestion,
  getRandomInt,
  translateText,
  shuffle,
  removeValuesFromArray,
  capitalizeFirstLetter,
  preprocessText,
};
