import tabClick from './src/tabClick';
import disabledDocumentOutline from './src/disabledDocumentOutline';

export function addTabularEvents() {
  // outline events
  document.addEventListener('keyup', tabClick);
  document.addEventListener('mousedown', disabledDocumentOutline);
}

export function removeTabularEvents() {
  // outline events
  document.removeEventListener('keyup', tabClick);
  document.removeEventListener('mousedown', disabledDocumentOutline);
}
