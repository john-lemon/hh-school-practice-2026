const slider = document.getElementById("slider");
const sliderIndicator = document.getElementById("slider_indicator");
const sliderIndicatorPins = sliderIndicator.children;

let sliderCurrentItem = 0;
let sliderItems = slider.childElementCount;

const updateIndicator = () => {
  for (let i = 0; i < sliderIndicatorPins.length; i++) {
    sliderIndicatorPins[i].style.backgroundColor = "#dfdedd";
  }
  sliderIndicatorPins[sliderCurrentItem].style.backgroundColor = "black";
}

const scroll = () => {
  slider.scrollTo({
    top: 0,
    left: sliderCurrentItem * slider.clientWidth,
    behavior: "smooth",
  });
}

updateIndicator();

const scrollToRight = () => {
  if (sliderCurrentItem < sliderItems - 1) {
    sliderCurrentItem++;
  } else {
    sliderCurrentItem = 0;
  }

  updateIndicator();
  scroll();
};

const scrollToLeft = () => {
  if (sliderCurrentItem > 0) {
    sliderCurrentItem--;
  } else {
    sliderCurrentItem = sliderItems - 1;
  }

  updateIndicator();
  scroll();
};

const sliderInterval = setInterval(() => {scrollToRight()}, 5000);

let touchStartX = 0;
let senseValue = 20;

slider.ontouchstart = (event) => {
  touchStartX = event.changedTouches[0].clientX;
}

slider.ontouchend = (event) => {
  if (event.changedTouches[0].clientX - touchStartX > senseValue) {
    scrollToLeft();
  } else if (event.changedTouches[0].clientX - touchStartX < -senseValue) {
    scrollToRight();
  }
}

slider.onmousedown = (event) => {
  touchStartX = event.clientX;
}

slider.onmouseup = (event) => {
  if (event.clientX - touchStartX > senseValue) {
    scrollToLeft();
  } else if (event.clientX - touchStartX < -senseValue) {
    scrollToRight();
  }
}