function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scrollPos) {
  document.querySelectorAll('.just-a-box').forEach(function(item) {
    item.style.transform = "rotate(" + scrollPos + "deg)";
    item.style.backgroundColor = getRandomColor();
  })
  document.querySelectorAll('.just-another-box').forEach(function(item) {
    item.style.backgroundColor = getRandomColor();
  })
}

window.addEventListener('scroll', function(e) {

  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {

    window.requestAnimationFrame(function() {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;

  }
  
});




document.querySelector('.giphy-body').addEventListener('touchend', function(event) {
  getRandomGiphy('beautiful', '.giphy-box');
  getRandomGiphy('explosion', '.stuck-giphy-box');
  jiggle();
})


document.querySelector('.giphy-body').addEventListener('click', function(event) {
  event.preventDefault();
  getRandomGiphy('beautiful', '.giphy-box');
  getRandomGiphy('explosion', '.stuck-giphy-box');
  jiggle();
})

function removeJiggle() {
  document.querySelector('.giphy-box').classList.remove('jiggle-animation');
  document.querySelector('.stuck-giphy-box').classList.remove('jiggle-animation');
}

function jiggle() {
  document.querySelector('.giphy-box').classList.add('jiggle-animation');
  document.querySelector('.stuck-giphy-box').classList.add('jiggle-animation');
  window.setTimeout(removeJiggle, 500);
}



function changeBoxImage(image, giphyBox) {
  document.querySelector(giphyBox + ' img').src = image;

}



function getRandomGiphy(tag, giphyBox) {
  fetch("https://api.giphy.com/v1/gifs/random?api_key=mdOEurpRKHYZZilfsXO7DV1vbdDsZSdU&tag=" + tag)
  .then(function(response) { return response.json() })
  .then(function(data) {
    changeBoxImage(data.data.image_url, giphyBox)
  });
}



