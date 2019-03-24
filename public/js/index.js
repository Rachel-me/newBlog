$(function () {

    //获取表单内容
    $(".submit").click(function () {
        var data = $(".search").val();
        // console.log();
        var dataSet = {
            "value": data
        }
        $.ajax({
            //几个参数需要注意一下
            //headers : {'Access-Control-Allow-Origin':'*'},
            /*xhrFields: {
                withCredentials: true // 设置运行跨域操作
            },*/
            type: "GET",//方法类型
            // dataType: "json",//预期服务器返回的数据类型
            url: "/api/getMessage",//接口url
            data: dataSet, //数据源
            success: function (result) {
                console.log(result);
                //打印服务端返回的数据(调试用)
                // if (result.resultCode == 200) {
                //     alert("SUCCESS");
                // }
                // ;
                alert(result)
            },
            error: function () {
                alert("异常！");
            }
        });
    })


    //导航栏
    ;(function () {
        $(".li-study").mouseover(function () {
            // $(".ul-study").css("display","block")
            $(this).find(".ul-study").toggle()
        })
            .mouseout(function () {
                // $(".ul-study").css("display","none")
                $(this).find(".ul-study").toggle()
            })
        $(".li-idea").mouseover(function () {
            // $(".ul-idea").css("display","block")
            $(this).find(".ul-idea").toggle()

        })
            .mouseout(function () {
                $(this).find(".ul-idea").toggle()

            })
        $(".li-progress").mouseover(function () {
            $(".ul-progress").css("display", "block")
        })
            .mouseout(function () {
                $(".ul-progress").css("display", "none")
            })
    })()


    //轮播图
    ;(function () {
        //1.左右按钮点击事件移动图片
        $(".prev").click(function () {
            animate(800);
        })
        $(".next").click(function () {
            animate(-800);
        })

        function animate(offset) {
            var newLeft = parseInt($(".photos").css("left")) + offset;
            //利用photos的left属性值移动图片
            $(".photos").css("left", newLeft + 'px');
            // console.log(newLeft);
            //判断是第一张还是最后一张
            if (newLeft < -2400) {
                $(".photos").css("left", 0 + "px")
            }
            if (newLeft > 0) {
                $(".photos").css("left", -2400 + "px")
            }
        }

        //2.定时器自动播放图片
        var timer

        function play() {
            timer = setInterval(function () {
                $(".next").click();
            }, 2000)
        }

        play();

        //3.鼠标进入轮播区域，图片停止播放
        function stop() {
            clearInterval(timer);
        }

        $(".cars").on('mouseover', function () {
            stop()
        })
        $(".cars").mouseout(function () {
            play()
        })

        //4.图片移动时，对应的小圆点也跟着动
        var $dots = $(".dots span")
        // console.log($dots);
        //变量index，index是小圆点们的自定义属性
        var index = 1;
        // console.log($("span[index]"));
        //dotsShow函数控制小圆点样式
        function dotsShow(index) {
            for (var i = 0; i < $dots.length; i++) {
                // console.log(1);
                // console.log($dots[i]);
                // console.log($($dots[i]));
                // console.log($($dots[0]).hasClass("on"));
                //清除之前的圆点样式
                if ($($dots[i]).hasClass("on")) {
                    $dots.removeClass("on")
                }
                //数组从0开始，所以index要减一
                $($dots[index - 1]).addClass("on")
                // console.log(index);
            }
        }

        $(".prev").click(function () {
            index = index - 1;
            if (index < 1) {
                index = 4;
            }
            dotsShow(index);
        })
        $(".next").click(function () {
            index = index + 1;
            if (index > 4) {
                index = 1;
            }
            dotsShow(index);
        })

        // console.log(JSON.parse(xhr.response))
        //5.点击小数点，跳转到对应的图片
    })();


})