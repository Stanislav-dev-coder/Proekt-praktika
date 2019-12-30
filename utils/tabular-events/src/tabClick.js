export default function tabClick(e) {
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
}
