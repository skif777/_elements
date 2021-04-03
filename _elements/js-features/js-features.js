let coordinatesSliderOffsetTop = this.sliderSelector.getBoundingClientRect().top + window.pageYOffset;

let firstScroll = window.pageYOffset;
let lastScroll = 0;

let translateSize = 0;

window.addEventListener('scroll', () => {

  lastScroll = window.pageYOffset;

  if (window.pageYOffset >= 0 && pageYOffset <= 400) {
    if (firstScroll < lastScroll) {
      translateSize++;
      firstScroll = lastScroll;
    }
    if (lastScroll < firstScroll) {
      translateSize--;
      firstScroll = lastScroll;
    }
  }

  console.log(pageYOffset)

})
