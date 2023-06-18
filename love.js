function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var emoji = document.getElementById(data);
    var offsetX = event.clientX - emoji.offsetWidth / 2;
    var offsetY = event.clientY - emoji.offsetHeight / 2;
    emoji.style.left = offsetX + "px";
    emoji.style.top = offsetY + "px";
  }
  
  window.addEventListener("DOMContentLoaded", function() {
    var emojis = document.querySelectorAll(".emoji");
    emojis.forEach(function(emoji) {
      var randomX = Math.floor(Math.random() * (window.innerWidth - emoji.offsetWidth));
      var randomY = Math.floor(Math.random() * (window.innerHeight - emoji.offsetHeight));
      emoji.style.left = randomX + "px";
      emoji.style.top = randomY + "px";
      emoji.addEventListener("dragstart", dragStart); // 드래그 앤 드롭 이벤트 핸들러 추가
      emoji.addEventListener("dragover", dragOver); // 드래그 오버 이벤트 핸들러 추가
      emoji.addEventListener("drop", drop); // 드랍 이벤트 핸들러 추가
    });
  });
  
  var _str = "";
var _pause = false;
var customText = "LOVE VILLAIN";

function change() {
  if (_pause) return;

  var element = document.getElementById("gradation");

  var shape = Math.random() < 0.5 ? "heart" : "devil";
  var gradientColors = "";

  if (shape === "heart") {
    gradientColors = "rgba(255, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(255, 255, 255, 1) 100%";
  } else {
    gradientColors = "rgba(255, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) 100%";
  }

  element.style.backgroundImage = "radial-gradient(circle, " + gradientColors + ")";

  var deg = Math.floor(360 * Math.random());
  var num = Math.floor(2 + 10 * Math.random());
  var per = 0;
  var str = "linear-gradient(" + deg + "deg,";
  var width = 100 * Math.random();

  while (true) {
    var perA = Math.floor(per) + "%";
    var col = "";
    col += Math.floor(Math.random() * 255) + ",";
    col += Math.floor(Math.random() * 255) + ",";
    col += Math.floor(Math.random() * 255) + "";

    str += " rgba(" + col + ", 0.7) " + perA;

    per += 1 + width * Math.random();
    if (per > 100) {
      break;
    }

    str += ",";
  }

  var date = new Date();
  var path = "polygon(";
  var len = Math.floor(3 + (date.getSeconds() % 20));
  for (var i = 0; i < len; i++) {
    path += Math.floor(1 + 98 * Math.random()) + "% ";
    path += Math.floor(1 + 98 * Math.random()) + "%";
    if (i == len - 1) {
      path += ")";
    } else {
      path += ",";
    }
  }

  str += ")";
  _str = str;

  var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  var min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  var sec = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();

  var timeStr = customText;
  var time = "/* " + timeStr + " */" + "<br/>";
  document.getElementById("text").innerHTML = "background-image: " + str + ";<br/>" + "clip-path: " + path + ";";

  element.style.backgroundImage = str;
  element.style.clipPath = path;

  // 텍스트를 아예 안 보이도록 스타일 변경
  document.getElementById("text").style.display = "none";
}

change();

var iId = setInterval(change, 1000);

document.body.onclick = function () {
  _pause = !_pause;
  //clearInterval(iId); //document.getElementById("gradation").innerHTML = _str;
};
