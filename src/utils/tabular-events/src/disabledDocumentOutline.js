export default function disabledDocumentOutline(e) {
  // отключение outline при клике
  if (document.body.contains(e.target)) {
    document.body.classList.remove('utility-focus');
  }
}
