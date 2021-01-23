<!--
 * @Author: YanYuXieYang
 * @Date: 2021-01-09 11:08:58
 * @LastEditTime: 2021-01-23 11:49:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WebProject\carousel_map\README.md
-->
# carousel_map
轮播图

# 两种动画思路
  1. 原生JS： 利用CSS3的transition属性，实现一个动画效果，js控制left值
  2. Jquery： 利用 animate()实现动画效果

# 目录结构说明
  1. img - 图片文件夹
  2. lib - 引用第三方js库
  3. carousel_css_transition - 利用CSS的transition属性实现的动画
  4. carousel_jquery_animate - 使用jquery的animate()执行CSS属性集的自定义动画
  5. other_animation - 其他动画效果
        carousel_jquery_animate_1_abandon - carousel_jquery_animate的过渡版本，已废弃
        carousel_jquery_animate_2_abandon - jquery animate实现的另一个版本，“图片标题超链接”可做参考，存在宽高显示bug，已废弃
        transform - CSS3 transform变换示例（翻面动画）
        translate3d - translate3d(tx, ty, tz)的一个示例。CSS 函数在3D空间内移动一个元素的位置
        walking_animation - animation实现走路动画（一张精灵图）
  6. README.md 说明文件

# 优化
  1. carousel_css_transition 优化“快速点击，时间差导致两图片之间出现背景空隙”
  2. 模仿bilibili实现动画。使用transition和transform:translate3d()实现。后台js代码动态修改样式，每张图有3个left坐标取值，一轮后就递增一次z-index值。（算法类似 carousel_css_transition 项目）



## 一.交互点
### next & preview
  通过下一个和上一个箭头可以直接跳转到下一张、上一张，绑定相应的click事件；
### 索引小圆圈
  轮播图下方的索引圈来直接跳转到相应的index位置
## 二. 逻辑关系
### 自动播放
  自动播放： `setInterval()` 固定时间跳转下一张
### 具体位置
  将每一张图的left值保存在数组中index = []，索引即其序号
## 三. CSS transition的两种动画效果
  1. transition: left 1s; // 可视过渡过程，但动画结束会倒退过渡到原始状态 
  2. transition: left 1s ease 1 forwards; // 无可视过渡过程，但动画结束会进入下一个循环 
## 函数说明
```
  略
```

## 参考bilibili的轮播图动画
### 1.代码
```
<div class="item"
  style="z-index: 31; transition: none 0s ease 0s; transform: translate3d(459px, 0px, 0px);">
  <a data-loc-id="3197" target="_blank" href="https://www.bilibili.com/bangumi/play/ss36722">
    <img src="//i0.hdslb.com/bfs/archive/2a92e6a1f536569e9d12f7ed7162cc1ee7ea0166.jpg@880w_388h_1c_95q"
      alt="耗时56年记录14个孩子的人生" onload="reportfs()">
    <p class="title">
      <!---->
      耗时56年记录14个孩子的人生
    </p>
  </a>
</div>
```
### 2. 原理
使用transition和transform实现，后台js代码动态修改样式。
思路：每张图有3个left坐标取值，一轮后就递增一次z-index值。
```
//img 459x202
//图一的style，当前图：1
element.style {
    z-index: 281;
    transition: all 0.25s ease 0s;
    transform: translate3d(0px, 0px, 0px);
//图一的style，当前图：2
element.style {
    z-index: 281;
    transition: all 0.55s ease 0s;
    transform: translate3d(-459px, 0px, 0px);
//图一的style，当前图：3 
element.style {
    z-index: 281;
    transition: none 0s ease 0s;
    transform: translate3d(459px, 0px, 0px);
}
```