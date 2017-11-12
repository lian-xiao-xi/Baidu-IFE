var $ = function (selectors) {
  return document.querySelectorAll(selectors);
}

// var showList = [];
var hander = {
  showList: [],
  numVal: function () {
    return $('#num')[0].value;
  },
  errHint: function (desc) {
    alert(desc);
  },
  numJudge: function () {
    return /^[0-9]+$/.test(this.numVal());
  }
}
/**
 *  leftIn
 * 左侧入btn按钮的点击事件处理程序
 */
function leftIn(showList) {
  if (hander.numJudge()) {
    showList.unshift(hander.numVal());
    var listItem = '<li>' + parseInt(hander.numVal()) + '</li>';
    $('#show')[0].insertAdjacentHTML('afterbegin', listItem);
  } else {
    hander.errHint('请输入数字');
  }

}
$('#left-in')[0].addEventListener('click', function () { leftIn(hander.showList) }, false);

/**
 *  rightIn
 * 右侧入btn按钮的点击事件处理程序
 */
function rightIn(showList) {
  if (hander.numJudge()) {
    showList.push(hander.numVal());
    var listItem = '<li>' + parseInt(hander.numVal()) + '</li>';
    $('#show')[0].insertAdjacentHTML('beforeend', listItem);
  }
  else {
    hander.errHint('请输入数字');
  }
}
$('#right-in')[0].addEventListener('click', function () { rightIn(hander.showList) }, false);

/**
 *  leftOut
 * 左侧出btn按钮的点击事件处理程序
 */
function leftOut(showList) {
  if (showList.length > 0) {
    leftNum = showList.shift();
    alert(leftNum);
    $('#show')[0].removeChild($('#show')[0].firstElementChild);
  }
  else {
    hander.errHint('请先在队列中添加项');
  }
}
$('#left-out')[0].addEventListener('click', function () {
  leftOut(hander.showList);
}, false);

/**
 *  rightOut
 * 右侧出btn按钮的点击事件处理程序
 */
function rightOut(showList) {
  if (showList.length > 0) {
    rightNum = showList.pop();
    alert(rightNum);
    $('#show')[0].removeChild($('#show')[0].lastElementChild);
  } else {
    hander.errHint('请先在队列中添加项');
  }

}
$('#right-out')[0].addEventListener('click', function () {
  rightOut(hander.showList);
}, false);

/**
* itemsOut
* 为ul#show添加点击事件处理函数,通过冒泡作用于ul列表中的每一项li
* 点击队列中任何一个元素，则该元素会被从队列中删除
*/
function itemsOut(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    $('#show')[0].removeChild(event.target);
  }
}
$('#show')[0].addEventListener('click', function () { itemsOut(event) }, false);
