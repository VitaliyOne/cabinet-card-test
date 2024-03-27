const productDescriptionShowOnClick = () => {
  const element = document.querySelector('.productDescriptionShow');
  const description = document.querySelector('.productDescriptionActive');
  if (element && description) {
    element.addEventListener('click', () => {
      description.classList.toggle('productDescriptionDisable');
      description.classList.toggle('productDescriptionActiveDisable');
      element.textContent === 'Читать полностью' ? element.textContent = 'Свернуть' : element.textContent = 'Читать полностью';
    });
  }
}
productDescriptionShowOnClick();