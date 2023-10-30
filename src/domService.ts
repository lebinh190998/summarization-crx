const parser = new DOMParser();

export const getAllTextContent = (element: Element | null) => {
  if (!element) {
    return '';
  }

  // Exclude 'script' tags
  if (element.tagName && element.tagName.toLowerCase() === 'script') {
    return '';
  }

  let textContent = '';

  // If the element is a text node, add its content to the result
  if (element.nodeType === Node.TEXT_NODE && element.textContent !== null) {
    textContent += `${element.textContent.trim()}. `;
  }

  // If the element has child nodes, recursively process them
  if (element.childNodes.length > 0) {
    for (const childNode of element.childNodes) {
      textContent += getAllTextContent(childNode as Element);
    }
  }

  return textContent;
};
