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
  const productNoComponents = document.getElementById('NoComponents');
  const productSomeComponents = document.getElementById('SomeComponents');

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

const telephoneNumberMask = () => {
  const mask = (event) => {
    const input = event.target;
    const keyCode = event.keyCode;
    let pos = input.selectionStart;
    if (pos < 3) {
      event.preventDefault();
    }
    const matrix = "+7 (___) ___ ____";
    let i = 0;
    const val = input.value.replace(/\D/g, "");
    let new_value = matrix.replace(/[_\d]/g, (a) => i < val.length ? val.charAt(i++) : a);
    i = new_value.indexOf("_");
    if (i !== -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i);
    }
    const reg = new RegExp("^" + matrix.substr(0, input.value.length).replace(/_+/g, (a) => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&") + "$");
    if (!reg.test(input.value) || input.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
      input.value = new_value;
    }
    if (event.type === "blur" && input.value.length < 5) {
      input.value = "";
    }
  };
  const telInputs = document.querySelectorAll('.modalInput');
  telInputs.forEach((input) => {
    input.addEventListener("input", mask);
    // input.addEventListener("focus", mask);
    input.addEventListener("blur", mask);
    input.addEventListener("keydown", mask);
  });
}

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

document.addEventListener('DOMContentLoaded', () => {
  setupProductImageTooltips();
  productDescriptionShowOnClick();
  updateTotalPrice();
  addCounterButtonsEventListeners();
  telMask();
});