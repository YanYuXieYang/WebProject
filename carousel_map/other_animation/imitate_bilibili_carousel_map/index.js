/*
 * @Author: YanYuXieYang
 * @Date: 2021-01-17 21:32:25
 * @LastEditTime: 2021-01-17 22:48:51
 * @LastEditors: Please set LastEditors
 * @Description: YanYuXieYang
 * @FilePath: \WebProject\carousel_map\other_animation\imitate_bilibili_carousel_map\index.js
 */

/*轮播图切换*/
$(function () {
    var imgWidth = $('.pic-content li').width();
    var imgHeight = $('.pic-content li').height();
    var offsetWidth = 40;// 手动调整宽度
    var offsetHeight = 16;// 手动调整高度。pic-content比img的height多16px
    var top_pic = $('.pic').offset().top;
    var top_pic_content = $('.pic-content').offset().top;
    console.log("top_pic:" + top_pic + ", top_pic_content:" + top_pic_content);
    var index = 0;
    var pContent = $(".pic-content");
    var imgLen = $(".pic-content li").length;
    var last = $(".pic-content li").last().clone();
    var first = $(".pic-content li").first().clone();
    var clock = null;
    pContent.append(first);
    pContent.prepend(last);
    /*添加导航小圆点*/
    for (var i = 0; i < imgLen; i++) {
        $('.triger').append("<span></span>");
    }
    $(".triger span").eq(0).addClass('active');
    // 设置多个 CSS 属性。宽度加2个img的宽。手动调整top，pic-content比pic的下移了16px。
    pContent.css({ width: (imgLen + 2) * 100 + '%', left: -imgWidth - offsetWidth, top: -offsetHeight });
    /*自动轮播*/
    /**
     * @description: 当鼠标在图片上停留时，停止自动轮播
     * @param {*}
     * @return {*}
     */
    $(".carousel").on("mouseenter", function () {
        clearInterval(clock)
    })
    /**
     * @description: 当鼠标离开时，开始自动轮播
     * @param {*}
     * @return {*}
     */
    $(".carousel").on("mouseleave", function () {
        timeClock()
    })
    /**
     * @description: 自动播放
     * @param {*} len
     * @return {*}
     */
    function autoPlay(len) {
        pContent.animate({
            left: '-=' + len * imgWidth
        }, function () {
            index += len;
            if (index === imgLen) {
                index = 0;
                pContent.css({ left: -imgWidth - offsetWidth })
            }
            setBullet();
            setTitle();
        })
    }
    /**
     * @description: 圆点点击事件
     * @param {*}
     * @return {*}
     */
    $(".triger span").on('click', function () {
        var currentIndex = $(this).index();
        autoPlay(currentIndex - index);
    })
    /**
     * @description: 设置圆点active激活选中状态
     * @param {*}
     * @return {*}
     */
    function setBullet() {
        $(".triger span").removeClass('active').eq(index).addClass('active')
    }
    /**
     * @description: 设置当前页面对应的title
     * @param {*}
     * @return {*}
     */
    function setTitle() {
        $(".title a").removeClass('onTitle').eq(index).addClass('onTitle')
    }
    /**
     * @description: 自动轮播
     * @param {*}
     * @return {*}
     */
    function timeClock() {
        clock = setInterval(function () {
            autoPlay(1)
        }, 2000)
    }

    timeClock();
})