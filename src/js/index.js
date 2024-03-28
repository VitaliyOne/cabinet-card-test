const setupProductImageTooltips = () => {
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

const updateTotalPriceVisibility = (totalPrice) => {
  const productNoComponents = document.querySelector('.productNoComponents');
  const productSomeComponents = document.querySelector('.productSomeComponents');

  if (productNoComponents && productSomeComponents) {
    if (totalPrice !== 0) {
      productNoComponents.style.display = 'none';
      productSomeComponents.style.display = 'flex';
    } else {
      productNoComponents.style.display = 'flex';
      productSomeComponents.style.display = 'none';
    }
  }
}

const updateTotalPrice = () => {
  const totalPriceElement = document.getElementById('totalPrice');
  let totalPrice = 0;
  document.querySelectorAll('.productItemCounter').forEach(item => {
    const price = item.querySelector('.productItemInput').getAttribute('price')
    const quantity = parseInt(item.querySelector('.productItemInput').value);
    if (price && quantity) {
      totalPrice += price * quantity;
    }
  });
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice.toLocaleString('ru-RU') + ' руб';
    updateTotalPriceVisibility(totalPrice)
  }
};

const addCounterButtonsEventListeners = () => {
  const counterPlusButtons = document.querySelectorAll('.productItemCounterArrowTop');
  const counterMinusButtons = document.querySelectorAll('.productItemCounterArrowBottom')
  if (counterPlusButtons.length > 0) {
    counterPlusButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.parentNode.querySelector('.productItemInput');
        if (input) {
          input.value = parseInt(input.value) + 1;
          updateTotalPrice();
        }
      });
    })
  }
  if (counterMinusButtons.length > 0) {
    counterMinusButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.parentNode.querySelector('.productItemInput');
        if (input && parseInt(input.value) > 0) {
          input.value = parseInt(input.value) - 1;
          updateTotalPrice();
        }
      });
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupProductImageTooltips();
  productDescriptionShowOnClick();
  updateTotalPrice();
  addCounterButtonsEventListeners();
});