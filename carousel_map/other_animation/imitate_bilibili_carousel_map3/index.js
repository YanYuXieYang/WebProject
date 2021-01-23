/*
 * @Author: your name
 * @Date: 2021-01-21 14:42:44
 * @LastEditTime: 2021-01-23 11:15:50
 * @LastEditors: Please set LastEditors
 * @Description: 可优化之处：1.快速点击，时间差导致两图片之间出现背景空隙                   
 * @FilePath: \WebProject\carousel_map\other_animation\imitate_bilibili_carousel_map2\index.js
 */
$(function () {
  //找到a标签
  var $as = $("#banner").find("li");
  //找到a标签所对应的的span标签
  var $slider_btn = $(".slider-btn").find("span");
  //设置轮播图中当前的图片为第一张图片
  var current_index = 0;
  var timerInv = 2000;
  var width = $as.eq(0).width();
  console.log("a width=" + width + ", height=" + $as.eq(0).height());
  console.log("slider-img width=" + $(".slider-img").width() + ", height=" + $(".slider-img").height());
  //图片位置初始化，将除了第一张图片之外的图片全部移到.slider-img类范围之外进行隐藏
  for (var i = 1; i < $as.length; i++) {
    $($as[i]).css({ left: width });
  }

  //开启定时器，每隔3秒钟进行滚动
  var auto_rotation = setInterval(Rotation_auto, timerInv);

  //当鼠标移入时停止自动轮播，响应鼠标单击事件
  $("#banner").mouseover(function () {
    clearInterval(auto_rotation);
    $slider_btn.click(Rotation_click);
  });

  //当鼠标移出时开启自动轮播
  $("#banner").mouseout(function () {
    auto_rotation = setInterval(Rotation_auto, timerInv);
  });

  //设置右下角小图标的样式
  function index_change (index) {
    $slider_btn.removeClass("current_span");
    $slider_btn.eq(index).addClass("current_span")
  }


  function forward (next_index) {//往前
    $as.eq(next_index).css({ left: width });
    $as.eq(next_index).stop().animate({ left: 0 });//将下一张图片移入区域
    $as.eq(current_index).stop().animate({ left: -width });//将当前图片移出区域
  }
  function back (next_index) {//后退
    $as.eq(next_index).css({ left: -width });
    $as.eq(next_index).stop().animate({ left: 0 });
    $as.eq(current_index).stop().animate({ left: width });
  }

  /**
   * @description: 图片轮播逻辑。原理：设置jquery的animate动画的目标left值，设置jquery的css属性值
   * @param {*} next_index
   * @return {*}
   */
  function Rotation (next_index, func) {
    //如果点击的按钮是当前按钮的话，什么也不做
    if (next_index == current_index) {
      return;
    }

    //每个event的个性画动画效果
    func(next_index);

    // sleep(30).then(() => {
    //   console.log("sleep end");
    //   $as.eq(next_index).stop().animate({ left: 0 });
    // });
    // //将下一张图片移入区域
    // // $as.eq(next_index).stop().animate({ left: 0 });
  }

  function sleep (time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  //自动轮播事件
  function Rotation_auto () {
    var index = (current_index + 1) % $slider_btn.length;
    index_change(index);
    Rotation(index, function (next_index) {
      if (next_index > current_index) {//向右边轮播，将当前图片移出区域
        forward(next_index);
      }
      else if (0 === next_index && current_index === $as.length - 1) {//进行下一个循环，向右边轮播
        forward(next_index);
      }
      else {//向左边轮播
        back(next_index);
      }
    });
    current_index = index;
  }

  //圆点单击的轮播时间
  function Rotation_click () {
    var index = $(this).index();
    //改变小图标所在位置
    index_change(index);
    //轮播图效果
    Rotation(index, function (next_index) {
      if (next_index > current_index) {//向右边轮播
        forward(next_index);
      }
      else {//向左边轮播
        back(next_index);
      }
    });
    current_index = index;
  }

  //上一张
  $(".last").on('click', function () {
    var index = current_index - 1 < 0 ? $as.length - 1 : current_index - 1;
    //改变小图标所在位置
    index_change(index);
    //轮播图效果
    Rotation(index, function (next_index) {
      if (next_index === $as.length - 1 && 0 === current_index) {//点击上一张，向左边轮播
        back(next_index);
      } else if (next_index > current_index) {//向右边轮播
        forward(next_index);
      }
      else {//向左边轮播
        back(next_index);
      }
    });
    current_index = index;
  });

  //下一张
  $(".next").on('click', function () {
    var index = current_index + 1 >= $as.length ? 0 : current_index + 1;
    //改变小图标所在位置
    index_change(index);
    //轮播图效果
    Rotation(index, function (next_index) {
      if (next_index > current_index) {//向右边轮播
        forward(next_index);
      }
      else if (0 === next_index && current_index === $as.length - 1) {//进行下一个循环，向右边轮播
        forward(next_index);
      }
      else {//向左边轮播
        back(next_index);
      }
    });
    current_index = index;
  });
})