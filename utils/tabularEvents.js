const tabClick = e => {
  // добавление outline
  if (document.body.contains(e.target)) {
    // если tab на элементе
    if (e.key === 'Tab') {
      document.body.classList.add('utility-focus');
    } else {
      document.body.classList.remove('utility-focus');
    }
  } else {
    // если на body
    document.body.classList.remove('utility-focus');
  }
};

const disabledDocumentOutline = e => {
  // отключение outline при клике
  if (document.body.contains(e.target)) {
    document.body.classList.remove('utility-focus');
  }
};

export const addTabularEvents = function() {
  // outline events
  document.addEventListener('keyup', tabClick);
  document.addEventListener('mousedown', disabledDocumentOutline);
};
export const removeTabularEvents = function() {
  // outline events
  document.removeEventListener('keyup', tabClick);
  document.removeEventListener('mousedown', disabledDocumentOutline);
};
