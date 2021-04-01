//方块类型对应关系 艾雪霞果彼
function skill1(num, clean) {
  //艾玛
  if (num < 4) {
    return over;
  }
  $spe = $(clean[1]);
  $spe.removeClass("clean cleanX cleanY");

  $spe.data("special", 1);
  $spe.attr({
    "data-special": 1,
    src: "textures/special1.png",
  });
}
function skill2() {
  //雪菜
}
function skill3() {
  //霞
}
function skill4() {
  //果林
}
function skill5() {
  //彼方
}
function special1($arr) {
  //艾玛
  var x0 = $arr.data("x");
  var y0 = $arr.data("y");
  boom(x0, y0);
}
function special2() {
  //雪菜
}
function special3() {
  //霞
}
function special4() {
  //果林
}
function special5() {
  //彼方
}

function boom(x0, y0) {
  $(".block[data-x=" + (x0 + 1) + "][data-y=" + y0 + "]").addClass("clean");
  $(".block[data-x=" + (x0 - 1) + "][data-y=" + y0 + "]").addClass("clean");
  $(".block[data-x=" + x0 + "][data-y=" + (y0 + 1) + "]").addClass("clean");
  $(".block[data-x=" + x0 + "][data-y=" + (y0 - 1) + "]").addClass("clean");
}

var error = error + " skill";
