window.addEventListener('load', () => {
  addParallaxEffect()
})

function addParallaxEffect() {
  window.onscroll = function (e) {
    const elemLeft = document.querySelector('.bg__left'),
          elemRight = document.querySelector('.bg__right');

    elemLeft.style.transform = `translateY(${window.pageYOffset/3}px)`;
    elemRight.style.transform = `translateY(${window.pageYOffset/3}px)`;

    console.log(e)
  }
}