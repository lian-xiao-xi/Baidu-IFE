let childList = [];
let timer;
const [preBtn,inBtn,postBtn,treeRoot] = 
[document.getElementById('preOrder'),document.getElementById('inOrder'),document.getElementById('postOrder'),document.getElementsByClassName('sec1')[0]];

/**
 * preOrder(node)
 * 前序遍历
 */
function preOrder(node) {
  if (!(node == null)) {
    childList.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}

/**
 * inOrder(node)
 * 中序遍历
 */
function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.firstElementChild);
    childList.push(node);
    inOrder(node.lastElementChild);
  }
}

/**
 * postOrder(node)
 * 后序遍历
 */
function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    childList.push(node);
  }
}

/**
 * reset()
 * 重置元素样式和 childList 数组
 */
function reset() {
  childList = [];
  clearInterval(timer);
  const treeNodes = document.getElementsByClassName('flex-box');
  for (let i = 0,len = treeNodes.length; i < len; i++) {
    treeNodes[i].style.backgroundColor = '#fff';
  }
}

/**
 * changeColor()
 * 改变当前被遍历到的节点背景色为yellow，
 * 同时让上一个被遍历到的节点背景色恢复为#fff
 */
function changeColor() {
  let i = 0;
  childList[i].style.backgroundColor = 'yellow';
  timer = setInterval(function () {
    i++;
    if (i < childList.length) {
      childList[i].style.backgroundColor = 'yellow';
      // i++;
      childList[i - 1].style.backgroundColor = '#fff';
    } else {
      clearTimeout(timer);
      childList[i - 1].style.backgroundColor = '#fff';
    }
  }, 800)
}

/**
 * 为各个按钮绑定相应的时间函数
 */
preBtn.addEventListener('click', function () {
  reset();
  preOrder(treeRoot);
  changeColor();
  console.log(childList);
}, false);

inBtn.addEventListener('click', function () {
  reset();
  inOrder(treeRoot);
  changeColor();
  console.log(childList);
}, false);

postBtn.addEventListener('click', function () {
  reset();
  postOrder(treeRoot);
  changeColor();
  console.log(childList);
}, false);
