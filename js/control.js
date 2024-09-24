$start.click(function () {
   start();
});


$upload.click(function () {
   upload();
});



var title2 = new Vue({
   el: '#title2',
   data: {
      score: 0,
      time: "",
   }
});


//初次挂载到vue
function changed() {

   var arr = $(".block");

   var arr_length = arr.length;

   for (var i = 0; i < arr_length; i++) {

      var block = new Vue({
         el: arr[i],//"#block0"
         data: {},
         methods: {

            clicked(e) {

               var $el = $("#" +
                  e.currentTarget.id);


               if ($el.data("y") < 1) { } else {


                  if ($el.hasClass("check")) {


                     $el.css(border0(0));

                     $el.removeClass('check')

                  } else {

                     $el.css(border0(5));

                     $el.addClass('check');

                     change1($el);
                  }

               }//if

            }

         }

      });

   }

}



function change1($el) {


   var $check = $(".checked");

   if ($check.attr("id") == $el.attr("id")) {
      return 0;
   }

   var i = 0;

   if ($check.height() != "undefined") {

      var x0 = $el.data("x");
      var y0 = $el.data("y");

      //邻近检测
      if (
         (Math.abs(x0 - $check.data("x")) == 1) && ((y0 - $check.data("y")) == 0)) { var i = ++i; }

      if ((Math.abs(y0 - $check.data("y")) == 1) && ((x0 - $check.data("x")) == 0)) { var i = ++i; }

      //邻近判定
      if (i == 1) {
         //获取坐标
         var x1 = $el.data("x");
         var y1 = $el.data("y");
         var x2 = $check.data("x");
         var y2 = $check.data("y");

         //坐标互换

         $el.attr({
            "data-x": x2,
            "data-y": y2
         });


         $el.data("x", x2);
         $el.data("y", y2);


         $(".checked").attr({
            "data-x": x1,
            "data-y": y1
         });


         $check.data("x", x1);
         $check.data("y", y1);

         //获取位置
         var X1 = $el.position().left;
         var Y1 = $el.position().top;
         var X2 = $check.position().left;
         var Y2 = $check.position().top;
         //坐标检验
         var results = found();

         if (results) {
            //互换成立
            $el.css({
               "left": X2,
               "top": Y2
            });
            $check.css({
               "left": X1,
               "top": Y1
            });

            setTimeout(function () { clean(); }, 300);

         } else {
            //互换不成立
            $el.attr({
               "data-x": x1,
               "data-y": y1
            });
            $el.data("x", x1);
            $el.data("y", y1);

            $check.attr({
               "data-x": x2,
               "data-y": y2
            });
            $check.data("x", x2);
            $check.data("y", y2);

         }//互换if

         $el.css(border0(0));
         $check.css(border0(0));


         $el.removeClass('checked check');

         $check.removeClass('checked check');



      } else {
         //非邻近

         $check.css(border0(0));

         $check.removeClass('checked check');

         $el.addClass('checked');

      }


   } else {
      $el.addClass('checked');
   }


}//总function



//方块扫描
function found() {
   //获取遍历元素基础信息
   var arr = $(".block");
   var arr_length = arr.length;

   for (var i0 = 0; i0 < arr_length; i0++) {

      var $arr = $(arr[i0]);
      var numX = 1;
      var numY = 1;
      var x0 = $arr.data("x");
      var y0 = $arr.data("y");
      var type0 = $arr.data("type");
      var el = "#" + $arr.attr("id");


      if (y0 <= 0) {
         continue;
      }
      //X正半轴遍历

      var times = (line - x0 + 1);

      for (var i = 1; i < times; i++) {

         var $element = "#" + $(".block[data-x=" + (x0 + i) + "][data-y=" + y0 + "]").attr("id");

         var el_type = $($element).data("type");

         if (el_type == type0) {

            numX = ++numX;

         } else { break; }

      }



      //Y正半轴遍历

      var times = (column - y0 + 1)

      for (var i = 1; i < times; i++) {

         var $element = "#" + $(".block[data-x=" + x0 + "][data-y=" + (y0 + i) + "]").attr("id");

         var el_type = $($element).data("type");

         if (el_type == type0) {

            numY = ++numY;

         } else { break; }

      }


      if (numX > 2 || numY > 2) {

         return true;
      }

   }

   return false;
}//总function




//游戏开始部分
function start() {


   $start.addClass("hide");
   $upload.addClass("hide");

   $play_area1.empty();
   spawn();

   setTimeout(function () {
      changed();
      clean1();
      $(".block").css({ "opacity": "1" });
   }, 50);


   //定时器

   score = 0;
   title2.score = 0;
   time = Time;

   set_score(false);

   clock = setInterval(function () {

      if (time != 0) {
         time = time - 1;
         title2.time = time;
      }

      if (time == 0 && pointer) {
         over();
      }

   }, 1000);


}

function over() {

   /*
   $("#play_area1").css({
   "display": "none"
   });
   $("#upload").show();
   $("#start").show();
   */

   $(".block").addClass("hide");
   $start.removeClass("hide");
   $upload.removeClass("hide");

   clearInterval(clock);

}




//分数上传
function upload() {

   var scores = title2.score;

   var name1 = $("#player_name").val();

   var player1 = $("#player_id").val();



   if (scores && name1 && player1) {

      var mydate = new Date();

      var toyear = mydate.getYear() + 1900;

      var tomonth = mydate.getMonth() + 1;

      var today = mydate.getDate();

      var tohour = mydate.getHours();

      var tominute = mydate.getMinutes();

      var tosecond = mydate.getSeconds();

      var now = toyear + "-" + tomonth + "-" + today + "_" + tohour + ":" + tominute + ":" + tosecond;


      //分数请求
      $.post("../main.php", {
         names: name1,
         scores: scores,
         dates: now,
         players: player1
      },
         function (data, status) {
            $("#list").empty();
            $("#list").append(data);
            alert(status);

         });

   } else { alert("请输入昵称与id"); }



}


function set_score(mode1) {

   if (mode1) {
      c_score.data1 = score1;
      c_score.data2 = score2;
      c_score.data3 = score3;
      c_score.data4 = score4;
      c_score.data5 = score5;
      c_score.data6 = score6;
      c_score.data7 = score7;
      c_score.data8 = score8;
      c_score.data9 = score9;
      c_score.data10 = score10;

   } else {

      score1 = 0;
      score2 = 0;
      score3 = 0;
      score4 = 0;
      score5 = 0;
      score6 = 0;
      score7 = 0;
      score8 = 0;
      score9 = 0;
      score10 = 0;

      c_score.data1 = 0;
      c_score.data2 = 0;
      c_score.data3 = 0;
      c_score.data4 = 0;
      c_score.data5 = 0;
      c_score.data6 = 0;
      c_score.data7 = 0;
      c_score.data8 = 0;
      c_score.data9 = 0;
      c_score.data10 = 0;

   }

}


var error = error + " control";
