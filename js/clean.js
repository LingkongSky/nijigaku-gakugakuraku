// 主要清除函数
function clean() {

    // 获取遍历元素基础信息
    clean_set();

    for (var i0 = 0; i0 < arr_length; i0++) {

        var $arr = $(arr[i0]);
        var numX = 1;
        var numY = 1;
        var $element_totalX = [];
        var $element_totalY = [];
        var x0 = $arr.data('x');
        var y0 = $arr.data('y');
        var type0 = $arr.data('type');
        var special0 = $arr.data('special');

        var el = '#' + $arr.attr('id');

        if (y0 < 1) {
            continue;
        }

        // X正半轴遍历
        if ($arr.hasClass('cleanX') != true) {
            var times = (line - x0 + 1);

            for (var i = 1; i < times; i++) {

                var $element = '#' + $('.block[data-x=' + (x0 + i) + '][data-y=' + y0 + ']').attr('id');

                if ($($element).data('type') == type0) {

                    $element_totalX.push($element);

                    numX = ++numX;
                }
                else {
                    break;
                }

            }
        } // if

        // Y正半轴遍历

        if ($arr.hasClass('cleanY') != true) {

            var times = (column - y0 + 1);

            for (var i = 1; i < times; i++) {

                var $element = '#' + $('.block[data-x=' + x0 + '][data-y=' + (y0 + i) + ']').attr('id');

                if ($($element).data('type') == type0) {

                    $element_totalY.push($element);

                    numY = ++numY;
                }
                else {
                    break;
                }

            }
        } // if

        // 添加方块到消除数组中
        if (numX > 2) {

            $arr.addClass('clean cleanX');

            $cleanX.push(el);

            var $element_totalX_length = $element_totalX.length;

            for (i1 = 0; i1 < $element_totalX_length; i1++) {

                $($element_totalX[i1]).addClass('clean cleanX');

                $cleanX.push($element_totalX[i1]);

            }

            window['score' + type0] = eval('score' + type0) + numX;

            // 特殊值检测

            /*
            if( special0 !=  0){
            eval( "special" + special0 + "($arr)");
            }
            */

            // eval( "skill" + type0 + "(numX,$cleanX)");

            score = score + numX * (numX - 1) * 50 * clean_times;

            clean_times = clean_times + 0.5;
        }

        if (numY > 2) {

            $arr.addClass('clean cleanY');

            $cleanY.push(el);

            var $element_totalY_length = $element_totalY.length;

            for (i1 = 0; i1 < $element_totalY_length; i1++) {

                $cleanY.push($element_totalY[i1]);

                $($element_totalY[i1]).addClass('clean cleanY');

            }

            window['score' + type0] = eval('score' + type0) + numY;

            // 特殊值检测

            /*
            if( special0 !=  0){
            eval( "special" + special0 + "($arr)");
            }
            */

            // eval( "skill" + type0 + "(numY,$cleanY)");

            score = score + numY * (numY - 1) * 50 * clean_times;

            clean_times = clean_times + 0.5;
        }

    } // for循环

    // 动画部分

    // 方块生成补齐
    var $clean = $('.clean');

    spawn1($clean);

    $clean.css({
        transform: 'scale(0)'
    });

    setTimeout(function () {
        // 删除对应元素
        $clean.remove();
        title2.score = score;

        set_score(true);

        scan();

    }, 310);

    // 阻止点击事件
    arr.css({
        'pointer-events': 'none'
    });

    pointer = false;
} // 总function

// //方块补齐
function scan() {

    clean_set();

    for (var i0 = 0; i0 < arr_length; i0++) {
        var mode = false;
        var x0 = $(arr[i0]).data('x');
        var y0 = $(arr[i0]).data('y');

        while (y0 < column) {

            var $element = $('.block[data-x=' + x0 + '][data-y=' + (y0 + 1) + ']').attr('id');

            if ($element == undefined) {

                var y0 = ++y0;

                $(arr[i0]).attr({
                    'data-y': y0
                });

                $(arr[i0]).data('y', y0);

                var mode = true;
            }
            else {
                break;
            }

        }

        if (mode) {
            $(arr[i0]).css({
                top: 1 / column * (y0 - 1) * $play_area.height() + 'px'
            });
        }

    } // 循环

    for (var i0 = 0; i0 < arr_length; i0++) {

        var mode = false;
        var x0 = $(arr[i0]).data('x');
        var y0 = $(arr[i0]).data('y');

        while (y0 < column) {

            var $element = $('.block[data-x=' + x0 + '][data-y=' + (y0 + 1) + ']').attr('id');

            if ($element == undefined) {

                var y0 = ++y0;

                $(arr[i0]).attr({
                    'data-y': y0
                });

                $(arr[i0]).data('y', y0);

                var mode = true;
            }
            else {
                break;
            }

        }

        if (mode) {
            $(arr[i0]).css({
                top: 1 / column * (y0 - 1) * $play_area.height() + 'px'
            });
        }

    } // 循环

    // 触发精简版clean函数
    var results = found();

    if (results) {

        setTimeout(function () {

            clean();
        }, 300);
    }
    else {
        clean_times = 1;
        setTimeout(function () {
            arr.css({
                'pointer-events': 'auto'
            });

            pointer = true;
            if (time == 0) {
                over();
            }

        }, 310);
    }
} // 总function

function scan1() {

    var $arr = $('.block[data-y=-5]');

    var $arr_length = $arr.length;

    for (var i = 0; i < $arr_length; i++) {

        var arr1 = $($arr[i]);
        // var $bid = $("#block" + id_number );

        var x0 = arr1.data('x');
        var y0 = arr1.data('y');

        while (y0 < column) {

            var $element = $('.block[data-x=' + x0 + '][data-y=' + (y0 + 1) + ']').attr('id');

            if ($element == undefined) {

                var y0 = ++y0;

                arr1.attr({
                    'data-y': y0
                });

                arr1.data('y', y0);
            }
            else {
                break;
            }

        }

        var y0 = arr1.data('y');

        while (y0 < column) {

            var $element = $('.block[data-x=' + x0 + '][data-y=' + (y0 + 1) + ']').attr('id');

            if ($element == undefined) {

                var y0 = ++y0;

                arr1.attr({
                    'data-y': y0
                });

                arr1.data('y', y0);
            }
            else {
                break;
            }

        }

    } // for

} // 总function

// ////开局去除三消

function clean1() {

    // 获取遍历元素基础信息
    clean_set();

    for (var i0 = 0; i0 < arr_length; i0++) {

        var $arr = $(arr[i0]);
        var numX = 1;
        var numY = 1;
        var $element_totalX = [];
        var $element_totalY = [];

        var x0 = $arr.data('x');
        var y0 = $arr.data('y');
        var type0 = $arr.data('type');

        var el = '#' + $arr.attr('id');

        if (y0 <= 0) {
            continue;
        }

        // X正半轴遍历
        // if( x0 < (column -2) ){ 
        var times = (line - x0 + 1);
        for (var i = 1; i < times; i++) {

            var $element = '#' + $('.block[data-x=' + (x0 + i) + '][data-y=' + y0 + ']').attr('id');

            var el_type = $($element).data('type');

            if (el_type == type0) {

                $element_totalX.push($element);

                numX = ++numX;
            }
            else {
                break;
            }

        }

        // Y正半轴遍历
        var times = (column - y0 + 1);

        for (var i = 1; i < times; i++) {

            var $element = '#' + $('.block[data-x=' + x0 + '][data-y=' + (y0 + i) + ']').attr('id');

            var el_type = $($element).data('type');

            if (el_type == type0) {

                $element_totalY.push($element);

                numY = ++numY;
            }
            else {
                break;
            }

        }

        if (numX > 2) {

            $cleanX.push(el);

            var $element_totalX_length = $element_totalX.length;

            for (i1 = 0; i1 < $element_totalX_length; i1++) {
                $cleanX.push($element_totalX[i1]);
            }
        }

        if (numY > 2) {

            $cleanY.push(el);
            var $element_totalY_length = $element_totalY.length;

            for (i1 = 0; i1 < $element_totalY_length; i1++) {
                $cleanY.push($element_totalY[i1]);
            }
        }

    } // for循环

    $cleanX_length = $cleanX.length;

    for (i2 = 1; i2 < $cleanX_length; i2 = i2 + 2) {

        var type1 = $($cleanX[i2]).data('type');

        if (type1 == block_types) {
            var type1 = 1;
        }
        else {
            var type1 = type1 + 1;
        }

        $($cleanX[i2]).data('type', type1);

        $($cleanX[i2]).attr({
            'data-type': type1,
            'src': 'textures/' + type1 + '.png'
        });

    }

    $cleanY_length = $cleanY.length;

    for (i2 = 1; i2 < $cleanY_length; i2 = i2 + 2) {

        var type1 = $($cleanY[i2]).data('type');

        if (type1 == block_types) {
            var type1 = 1;
        }
        else {
            var type1 = type1 + 1;
        }

        $($cleanY[i2]).data('type', type1);

        $($cleanY[i2]).attr({
            'data-type': type1,
            'src': 'textures/' + type1 + '.png'
        });

    }

    var results = found();
    if (results) {
        clean1();
    }
    else {

        /*
        $(".block").css({
        "opacity": "1"
        });*/

    }
} // 总function

var error = error + ' clean';
