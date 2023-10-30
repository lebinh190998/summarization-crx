import * as he from 'he';
const parser = new DOMParser();

const meaningfulElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const getAllTextContent = (
  element: Element | null,
  maxTokens: number = 500
) => {
  if (!element) {
    return '';
  }

  // Exclude 'script' and 'style' tags
  if (
    element.tagName &&
    (element.tagName.toLowerCase() === 'script' ||
      element.tagName.toLowerCase() === 'style')
  ) {
    return '';
  }

  let textContent = '';

  // If the element is a text node, add its content to the result
  const isPriorityTag =
    element.parentElement &&
    meaningfulElements.includes(
      element.parentElement?.tagName.toLocaleLowerCase()
    );
  if (
    element.nodeType === Node.TEXT_NODE &&
    element.textContent !== null &&
    isPriorityTag
  ) {
    const trimmedText = element.textContent.trim();
    if (trimmedText.length > 0) {
      textContent += `${trimmedText} `;
    }
  }

  // If the element has child nodes, recursively process them
  if (element.childNodes.length > 0) {
    for (const childNode of element.childNodes) {
      const childText = getAllTextContent(
        childNode as Element,
        maxTokens - textContent.split(' ').length
      );
      if (childText.length > 0) {
        textContent += childText;
      }
      if (textContent.split(' ').length >= maxTokens) {
        break;
      }
    }
  }

  // Truncate the text to the specified maxTokens
  const words = textContent.trim().split(/\s+/);
  if (words.length > maxTokens) {
    textContent = words.slice(0, maxTokens).join(' ');
  }

  // Some extra cleansing
  textContent = he.decode(textContent);
  textContent = textContent.replace(/\s+/g, ' ');

  return textContent;
};
