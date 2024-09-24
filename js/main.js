/*
流程图:
spawn() 生成img标签并加载
changed() 将block元素全部挂载到vue
clean1() found() clean1().... 清除原始三消


游戏中:
change1 检测点击两个相邻元素
found判断互换 
不成立 结束
成立 互换 clean() scan() 开始遍历元素并消除，下落 循环此过程直到无法消除
每一次clean都会在被消除元素的x上生成一个新block spawn1()并且由scan1()定位，new_set进行vue挂载

*/

/*
main.js 负责网页布局及基础变量声明
spawn.js 负责初次生成及补齐方块
control.js 管理游戏交互部分
clean.js 对方块进行消除和下落
skill.js 特殊技能

咲咲乐原理:
将整个play_area作为画布
利用data标签对方块建立二维坐标系
通过vue控制点击交互部分
检验，然后消除，计分，下

特殊内容:
jsmin中的内容是js进行压缩后的发布包(大部分内容基本没啥用)
fastclick.min.js是一种可以消去web自带的300ms点击延迟的js，且我将fps检测的部分也放了进去。
error请在index.html取消注释，进入页面后会弹出一个消息框，用于显示是否有js加载失败
*/

//方块类型对应关系 艾雪霞果彼

var error = "";//调试用参数
var block_types = 5;//方块类型，目前上限为五
var score = 0;//分数
var id_number = 0;//方块id
var clean_times = 1;//基础清除分数倍率
var Time = 90;//游戏时间

var $start = $("#start");
var $upload = $("#upload");
var pointer = true;
var pointers = false;


var border0 = n => ({
  "border": n + "px solid #FFFFFF"
});

var clean_set = () => {
  arr = $(".block");
  arr_length = arr.length;
  $cleanX = [];
  $cleanY = [];
}




//各角色方块消除数
var score1 = 0;
var score2 = 0;
var score3 = 0;
var score4 = 0;
var score5 = 0;
var score6 = 0;
var score7 = 0;
var score8 = 0;
var score9 = 0;
var score10 = 0;


$upload.addClass("hide");

//页面适配

var page_width = document.body.clientWidth;

var page_height = document.body.clientHeight;

if (page_height > page_width) {
  var screen_type = "mobile";
}
else { var screen_type = "PC"; }


//页面自适配
window.onresize = function () {

  if (screen_type == "mobile" && document.body.clientWidth > document.body.clientHeight) {
    window.location.reload();
  }

  if (screen_type == "PC" && document.body.clientWidth < document.body.clientHeight) {
    window.location.reload();
  }

}


var title1 = new Vue({
  el: '#title1',
  data: {
    msg: 'Fightだよ'
  }
});


var c_score = new Vue({
  el: '#c_score',
  data: {
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    data5: 0,
    data6: 0,
    data7: 0,
    data8: 0,
    data9: 0,
    data10: 0
  }
});


var $play_area = $("#play_area");
var $play_area1 = $("#play_area1");


var $bottom = $("#bottom");
var $title1 = $("#title1");
var $title2 = $("#title2");


if (screen_type == "mobile") {

  $bottom.css({
    "transform": "translateY(-100%)",
    "top": "100%",
    "left": "0%",
    "width": "100%",
    "height": "auto"
  });

  $title1.css({
    "top": "10%",
    "left": "50%",
    "font-size": page_width * 0.08 + "px"
  });

  $title2.css({
    "top": "20%",
    "left": "50%",
    "font-size": page_width * 0.05 + "px"
  });


  $play_area.css({
    "height": page_height * 0.7 + "px",
    "width": page_height * 0.7 + "px"
  });


  $(".input").css({
    "height": "1%",
    "width": "5%"
  });

} else {

  $bottom.css({
    "transform": "translateY(-100%) translateX(-50%)",
    "top": "100%",
    "left": "50%",
    "width": page_height * 0.5 + 20 + "px",
    "height": "auto"
  });


  $title1.css({
    "top": "2%",
    "left": "50%",
    "font-size": page_height * 0.08 + "px"
  });

  $title2.css({
    "top": "13%",
    "left": "50%",
    "font-size": page_height * 0.04 + "px"
  });

  $play_area.css({
    "height": page_height * 0.5 + "px",
    "width": page_height * 0.5 + "px"
  });

  $(".input").css({
    "height": "1%",
    "width": "3%"
  });

}

var error = error + "main";