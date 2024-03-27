const circles = document.querySelectorAll('.productImgRound');
const tooltips = document.querySelectorAll('.productRoundTooltip');
if (circles.length > 0 && tooltips.length > 0) {
  circles.forEach((circle, index) => {
    let tooltipVisible = false;
    circle.addEventListener('click', () => {
      if (tooltips[index]) {
        if (tooltipVisible) {
          tooltips[index].style.opacity = '0';
          tooltipVisible = false;
        } else {
          tooltips.forEach(tooltip => {
            tooltip.style.opacity = '0';
          });
          tooltips[index].style.opacity = '1';
          tooltipVisible = true;
        }
      }
    });
  });
}

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