var timer = null,//定时器
  timerInv = 2000,//时间间隔
  index = 0,//图片索引
  img_count = 5,//图片数量
  locatArr = [0, -230, -460, -690, -920];//图片列表left属性值，与图片张数有关
var box = document.getElementsByClassName('box')[0];
var dot = document.getElementsByClassName('dot')[0];
var li = dot.getElementsByTagName('li');
var next = document.getElementsByClassName('next')[0];
var last = document.getElementsByClassName('last')[0];
/**
*轮播图片展示函数(最新，利用CSS3)，根据索引值到达相应地方
*@param none
*@return none
*/
function disPlay () {
  if (index == img_count - 1) {
    moveTo(0);
    index = 0;
  } else {
    moveTo(++index);
  }
}

/**
*上一张/下一章图片
*Function lastPlay/nextPlay
*@param none
*@return none
*/
function lastPlay () {
  if (index == 0) {
    moveTo(img_count - 1);
    index = img_count - 1;
  } else {
    moveTo(--index);
  }
}
function nextPlay () {
  if (index == img_count - 1) {
    moveTo(0);
    index = 0;
  } else {
    moveTo(++index);
  }
}
/**
*绑定时间，包括小圆点、箭头的click事件
*@function bindEvent
*@param none
*@return none
*/
function bindEvent () {
  next.addEventListener('click', function () {
    clearInterval(timer);
    nextPlay();
    timer = setInterval(disPlay, timerInv);
  });
  last.addEventListener('click', function () {
    clearInterval(timer);
    lastPlay();
    timer = setInterval(disPlay, timerInv);
  });
  for (var i = 0; i < img_count; i++) {
    (function (j) {
      li[j].addEventListener('click', function () {
        clearInterval(timer);
        index = j;
        moveTo(index);
        timer = setInterval(disPlay, timerInv);
      })
    }(i))//定义一个形参的匿名函数，并调用。实参为i

  }
}
/**
*跳转到某张图片
*@function moveTo
*@param location 索引值，具体位置存储在locatArr数组中
*@return none
*/
function moveTo (location) {
  box.style.left = locatArr[location] + 'px';
}
function start () {

  timer = setInterval(disPlay, timerInv);
  var timerDot = setInterval(function () {
    var dots = document.getElementsByClassName('dot')[0];
    var singledot = dots.getElementsByTagName('li');
    for (var i = 0; i < img_count; i++) {
      singledot[i].className = '';
    }
    singledot[index].className = 'act';

  }, 20)
  bindEvent();
}

start();

