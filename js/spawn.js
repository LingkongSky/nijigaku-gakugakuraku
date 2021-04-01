//行列数
var line = 9;

var column = 9;

var numbers = line * column;

var $vue_area = new Vue({
  el: "#play_area1",
  data: {
    tag: "",
  },
});

size();

function size() {
  if (line >= column) {
    mode = true;
  } else {
    mode = false;
  }

  if (screen_type == "mobile") {
    //游戏区域
    if (mode) {
      $play_area.css({
        width: page_width * 0.7 + "px",
        height: ((page_width * 0.7) / line) * column + "px",
      });
    } else {
      $play_area.css({
        height: page_width * 0.7 + "px",
        width: ((page_width * 0.7) / column) * line + "px",
      });
    }
  } else {
    if (mode) {
      $play_area.css({
        width: page_height * 0.5 + 5 + "px",
        height: ((page_height * 0.5) / line) * column + 5 + "px",
      });
    } else {
      $play_area.css({
        height: page_height * 0.5 + 5 + "px",
        width: ((page_height * 0.5) / column) * line + 5 + "px",
      });
    }
  }
}

/*生成结果模板: <img class="block" id="block1" style="height:100px;width:100px;top:100px;left:100px;" src="textures/1.png" data-x="0" data-y="0" data-type="1" data-special="0" @click="clicked($event)/>
 */

//方块生成
function spawn() {
  size();

  //方块大小
  if (mode) {
    var block_heights = (100 / line) * 0.01 * $play_area.width() + "px";
    var block_widths = "auto";
  } else {
    var block_widths = (100 / column) * 0.01 * $play_area.height() + "px";
    var block_heights = "auto";
  }

  block_size = "height:" + block_heights + ";" + "width:" + block_widths + ';"';

  for (var i = column * -3; i < numbers; i++) {
    id_number = id_number + 1;
    //方块id
    var imgid = "id='block" + id_number + "' ";

    //方块材质路径与类型
    var img_random = Math.floor(Math.random() * block_types + 1);

    var img_src = 'src="textures/' + img_random + '.png"';

    //方块坐标
    var block_position =
      'style="top: ' +
      (1 / column) * Math.floor(i / line) * $play_area.height() +
      "px; " +
      "left: " +
      (1 / line) * (Math.abs(i) % line) * $play_area.width() +
      "px;opacity:0;";

    var block_data1 = 'data-x="' + (1 + (Math.abs(i) % line)) + '" ';

    if (i >= 0) {
      var block_data2 = 'data-y="' + (1 + Math.floor(i / line)) + '" ';
    } else {
      var block_data2 = 'data-y="' + Math.floor(i / line) + '" ';
    }

    var block_data3 = 'data-type="' + img_random + '"';

    var block_data4 = 'data-special="0"';

    var block_vue = '@click="clicked($event)"';

    if (i > column * -3) {
      var block_tag =
        '<img class="block' +
        '" ' +
        img_src +
        imgid +
        block_position +
        block_size +
        block_data1 +
        block_data2 +
        block_data3 +
        block_data4 +
        block_vue +
        ">" +
        block_tag;
    } else {
      var block_tag =
        '<img class="block' +
        '" ' +
        img_src +
        imgid +
        block_position +
        block_size +
        block_data1 +
        block_data2 +
        block_data3 +
        block_data4 +
        block_vue +
        ">";
    }

    //方块标签写入html

    //document.getElementById("play_area1").innerHTML =  block_tag;

    //var img_id = "#block" + i;
  }

  $vue_area.tag = block_tag;
} //总function

function spawn1(Clean) {
  var arr = [];

  var Clean_length = Clean.length;

  for (var i = 0; i < Clean_length; i++) {
    var block_x = $(Clean[i]).data("x");

    id_number = id_number + 1;

    arr.push(id_number);

    var imgid = "id='block" + id_number + "' ";

    //方块材质路径与类型
    var img_random = Math.floor(Math.random() * block_types + 1);

    var img_src = 'src="textures/' + img_random + '.png"';

    //方块坐标
    var block_position =
      'style="top: ' +
      (1 / column) * -9 * $play_area.height() +
      "px; " +
      "left: " +
      (1 / line) * (block_x - 1) * $play_area.width() +
      "px;";

    var block_data1 = 'data-x="' + block_x + '" ';

    var block_data2 = 'data-y="' + '-5"';

    var block_data3 = 'data-type="' + img_random + '"';

    var block_data4 = 'data-special="0"';

    var block_vue = '@click="clicked($event)"';

    if (i > 0) {
      var block_tag =
        '<img class="block' +
        '" ' +
        img_src +
        imgid +
        block_position +
        block_size +
        block_data1 +
        block_data2 +
        block_data3 +
        block_data4 +
        block_vue +
        ">" +
        block_tag;
    } else {
      var block_tag =
        '<img class="block' +
        '" ' +
        img_src +
        imgid +
        block_position +
        block_size +
        block_data1 +
        block_data2 +
        block_data3 +
        block_data4 +
        block_vue +
        ">";
    } //if
  } //for

  $("#play_area1").append(block_tag);

  scan1();

  var arr_length = arr.length;

  for (var i = 0; i < arr_length; i++) {
    new_set(arr[i]);
  }
}

function new_set(id_number) {
  var block = new Vue({
    el: "#block" + id_number, //"#block0"
    data: {},
    methods: {
      clicked(e) {
        var $el = $("#" + e.currentTarget.id);

        if ($el.data("y") < 1) {
        } else {
          if ($el.hasClass("check")) {
            $el.css({
              border: "0px solid #FFFFFF",
            });

            $el.removeClass("check");
          } else {
            $el.css({
              border: "5px solid #FFFFFF",
            });

            $el.addClass("check");

            change1($el);
          }
        } //if
      },
    },
  });
}

var error = error + " spawn";

/*
//行列数
var line = $('#line option:selected').val();

var column = $('#column option:selected').val();

var numbers = line * column;


//检测行列变化
$("#line").change(function() {
line = $('#line option:selected').val();

$(".block").remove();
spawn();
setTimeout (function(){
changed();
clean1();
},50);

});

$("#column").change(function() {
column = $('#column option:selected').val();

$(".block").remove();
spawn();
setTimeout (function(){
changed();
clean1();
},50);

});

*/
