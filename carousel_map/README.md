# carousel_map
轮播图

## 1.交互点
### next & preview
通过下一个和上一个箭头可以直接跳转到下一张、上一张，绑定相应的click事件；
### 索引小圆圈
轮播图下方的索引圈来直接跳转到相应的index位置
## 2. 逻辑关系
### 自动播放
自动播放： `setInterval()` 固定时间跳转下一张
### 动画思路
两种思路：
  1. 原生JS： 利用CSS3的transition属性，实现一个动画效果，js控制left值
  2. Jquery： 利用 animate()实现动画效果
### 具体位置
  将每一张图的left值保存在数组中index = []，索引即其序号
## 3. 两种动画效果
  transition: left 1s; // 可视过渡过程，但动画结束会倒退过渡到原始状态 
  transition: left 1s ease 1 forwards; // 无可视过渡过程，但动画结束会进入下一个循环 
## 函数说明
```
  略
```
