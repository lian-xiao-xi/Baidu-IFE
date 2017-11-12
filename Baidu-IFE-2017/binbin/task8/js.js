var $ = function (selectors) {
  return document.querySelectorAll(selectors);
}

var treeWalker = new TreeWalker();
var timer = null; //setInterval 定时器的ID

function TreeWalker() {
  this.stack = [];
  // this.root = $('.root')[0];
}
/**
 * 深度优先遍历函数
 */
TreeWalker.prototype.DF = function (callback, rootNode) {
  (function recurse(currentNode) {
    // console.log(this == window); // true
    if (!(currentNode == null)) {
      callback(currentNode);
      for (var i = 0; i < currentNode.children.length; i++) {
        recurse(currentNode.children[i]);
      }
    }
  })(rootNode);
}

/**
 * 广度优先遍历函数
 */
TreeWalker.prototype.BF = function (callback, rootNode) {
  var queue = [],
    currentNode;
  if (!(rootNode == null)) {
    queue.push(rootNode);
    currentNode = queue.shift();
    while (!!currentNode) {
      for (var i = 0; i < currentNode.children.length; i++) {
        queue.push(currentNode.children[i]);
      }
      callback(currentNode);
      currentNode = queue.shift();
    }
  }
}

TreeWalker.prototype.reset = function () {
  this.DF(function (node) {
    node.style.backgroundColor = '#fff';
  }, $('.root')[0]);
  this.stack = [];
  clearInterval(timer);
}

TreeWalker.prototype.anim = function () {
  var resultArr = this.stack,
    self = this,
    startTime,
    stopTime,
    i = 0;

  // this.stack = [];
  startTime = Date.now();
  resultArr[i].style.backgroundColor = 'red';
  timer = setInterval(function () {
    // i++;
    if (!!$('#search')[0].value.trim() && resultArr[i].firstChild.textContent.trim() === $('#search')[0].value.trim()) {
      stopTime = Date.now();
      clearInterval(timer);
      resultArr[i].style.backgroundColor = 'yellow';
      alert('已经查询到目标元素,用时'+(stopTime-startTime)+'毫秒');
    } else {
      i++;
      if (i < resultArr.length) {
        resultArr[i - 1].style.backgroundColor = '#fff';
        resultArr[i].style.backgroundColor = 'red';
      } else {
        resultArr[i - 1].style.backgroundColor = '#fff';
        clearInterval(timer);
      }
    }
  }, 800);
}

$('#btnGroup')[0].addEventListener('click', function (event) {
  if (event.target.dataset.name === 'shendu') {
    treeWalker.reset();
  treeWalker.DF(function (node) {
    treeWalker.stack.push(node);
  }, $('.root')[0]);
  treeWalker.anim();
  } else if (event.target.dataset.name === 'guangdu') {
    treeWalker.reset();
  treeWalker.BF(function (node) {
    treeWalker.stack.push(node);
  }, $('.root')[0]);
  treeWalker.anim();
  } else {
    return;
  }
},false);
