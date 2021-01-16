var box = document.getElementsByClassName("box")[0]
var index = 0,
  img_count = 5,
  locatArr = [0, -720, -1440, -2160, -2880];
function disPlay () {
  var initLeft = parseInt(window.getComputedStyle(box).left);
  if (index == img_count - 1) {
    moveTo(0);
    index = 0;
  } else {
    moveTo(++index);
  }
}

function moveTo (location) {
  var target_position = parseInt(window.getComputedStyle(box).left) - locatArr[location];
  box.style.left = locatArr[location] + 'px';
  box.style.display = "block"
}

window.setInterval(disPlay, 2000);