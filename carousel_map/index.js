/*
 * @Author: yanyuxieyang
 * @Date: 2021-01-12 22:53:37
 * @LastEditTime: 2021-01-17 00:26:00
 * @LastEditors: Please set LastEditors
 * @Description: carousel map
 * @FilePath: \WebProject\carousel_map\index.js
 */
var timer = null,//定时器
  timerInv = 2000,//时间间隔
  index = 0,//图片索引
  img_count = 5,//图片数量
  locatArr = [0, -230, -460, -690, -920];//图片列表left属性值，与图片张数有关
var box = document.getElementsByClassName('box')[0];
var dot = document.getElementsByClassName('dot')[0];
var li = dot.getElementsByTagName('li');
var last = document.getElementsByClassName('last')[0];
var next = document.getElementsByClassName('next')[0];
/**
 * @description: 轮播图片展示函数(最新，利用CSS3)，根据索引值到达相应地方
 * @param {*}
 * @return {*}
 */
function disPlay() {
  if (index === img_count - 1) {
    moveTo(0);
    index = 0;
  }
  else {
    moveTo(++index);
  }
}
/**
 * @description: 上一张图片
 * @param {*}
 * @return {*}
 */
function lastPlay() {
  if (index === 0) {
    index = img_count - 1;
    moveTo(img_count - 1);
  }
  else {
    moveTo(--index);
  }
}
/**
 * @description: 下一张图片
 * @param {*}
 * @return {*}
 */
function nextPlay() {
  if (index === img_count - 1) {
    index = 0;
    moveTo(0);
  }
  else {
    moveTo(++index);
  }
}
/**
 * @description: 设置被选中圆点的背景
 * @param {*}
 * @return {*}
 */
function setDotActBackground() {
  for (var i = 0; i < img_count; i++) {
    li[i].className = '';
  }
  li[index].className = 'act';
}
/**
 * @description: 跳转到某张图片
 * @param {*} location 索引值，具体位置存储在locatArr数组中
 * @return {*}
 */
function moveTo(location) {
  box.style.left = locatArr[location] + "px";
  setDotActBackground();
}
/**
 * @description: 绑定时间，包括小圆点、箭头的click事件
 * @param {*}
 * @return {*}
 */
function bindEvent() {
  next.addEventListener('click', () => {
    clearInterval(timer);
    nextPlay();
    timer = window.setInterval(disPlay, timerInv);
  });
  last.addEventListener('click', () => {
    clearInterval(timer);
    lastPlay();
    timer = window.setInterval(disPlay, timerInv);
  });
  for (var i = 0; i < img_count; i++) {
    ((j) => {
      li[j].addEventListener('click', () => {
        clearInterval(timer);
        index = j;
        moveTo(index);
        timer = window.setInterval(disPlay, timerInv);
      });
    })(i);//定义一个形参的匿名函数，并调用。实参为i
  }
}
/**
 * @description: 主函数入口
 * @param {*}
 * @return {*}
 */
function main() {
  timer = window.setInterval(disPlay, timerInv);
  bindEvent();
}

main();