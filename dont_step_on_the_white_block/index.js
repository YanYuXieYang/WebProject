/*
 * @Author: your name
 * @Date: 2021-03-03 20:27:36
 * @LastEditTime: 2021-03-03 20:47:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WebProject\dont_step_on_the_white_block\index.js
 */
function Index () {
  this.score = 0;
  this.lastScore = 0;
  this.speed = 2;
  this.color = ['#cc66cc', '#99ff66', '#66ffcc', '#FF7F24'];
  this.dom = {
    title: $('.title'),
    main: $('.main'),
    author: $('.Author')
  };
  this.bindEvent();
  this.timer1 = {};//动态产生DIV定时器，用于产生动画
  this.timer2 = {};//动态检测得分，增加速度
}
/**
 * @description: 绑定事件
 * @param {*}
 * @return {*}
 */
Index.prototype.bindEvent = function () {

}