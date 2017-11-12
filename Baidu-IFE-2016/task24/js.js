var $ = function (selectors) {
  return document.querySelectorAll(selectors);
};

var treeWalker = new TreeWalker(),
treeRoot = $('.root')[0],
timer = null; //setInterval 定时器的ID

function TreeWalker() {
  this.stack = [];
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
};

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
};

/**
 * 重置树的相关数据
 */
TreeWalker.prototype.reset = function () {
  this.DF(function (node) {
    node.style.backgroundColor = '#fff';
    node.removeAttribute('data-current');
  }, treeRoot);
  this.stack = [];
  clearInterval(timer);
};

/**
 * 遍历时的动画
 */
TreeWalker.prototype.anim = function () {
  var resultArr = this.stack,
    self = this,
    startTime,
    stopTime,
    i = 0;

  // this.stack = [];
  startTime = Date.now();
  resultArr[i].style.backgroundColor = 'palevioletred';
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
        resultArr[i].style.backgroundColor = 'palevioletred';
      } else {
        resultArr[i - 1].style.backgroundColor = '#fff';
        clearInterval(timer);
      }
    }
  }, 800);
};

/**
 * 点击某个节点元素，则该节点元素呈现一个特殊被选中的样式
 */
TreeWalker.prototype.nodeClickHander = function (event) {
  // console.log(event.target);
  this.reset();
  event.target.style.backgroundColor = 'lightskyblue';
  event.target.dataset.current = 'true';
};

/**
* 得到当前被选中的树节点
*/
TreeWalker.prototype.seleNodes = function () {
  var selectedNode = [];
  this.DF(function (node) {
    if (node.dataset.current === 'true') {
      // return node;
      selectedNode.push(node);
    }
  }, treeRoot);
  return selectedNode;
};

/**
* 删除选中节点及其后代节点
*/
TreeWalker.prototype.delNode = function () {
  this.seleNodes().forEach(function (item,index,array) {
    item.parentNode.removeChild(item);
  });
};

/**
* 在当前选中的节点下增加一个子节点，节点内容为输入框中内容，插入在其子节点的最后一个位置
*/
TreeWalker.prototype.addNode = function () {
  // 添加新的节点到选中节点后
  var newNode = document.createElement('div');
  newNode.textContent = $('.btnGroup-right input')[0].value.trim();
  newNode.classList.toggle('add');
  this.seleNodes().forEach(function (item, index, array) {
    item.appendChild(newNode);
  });
};

$('.btnGroup-left')[0].addEventListener('click', function (event) {
  if (event.target.dataset.name === 'shendu') {
    treeWalker.reset();
  treeWalker.DF(function (node) {
    treeWalker.stack.push(node);
  }, treeRoot);
  treeWalker.anim();
  } else if (event.target.dataset.name === 'guangdu') {
    treeWalker.reset();
  treeWalker.BF(function (node) {
    treeWalker.stack.push(node);
  }, treeRoot);
  treeWalker.anim();
  } else {
    return;
  }
},false);
$('.btnGroup-right button')[0].addEventListener('click', function () {treeWalker.delNode();}, false);
$('.btnGroup-right button')[1].addEventListener('click', function () {treeWalker.addNode();}, false);

treeRoot.addEventListener('click', function (event) {
  treeWalker.nodeClickHander(event);
},false);
