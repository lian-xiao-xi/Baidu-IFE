var childList = [],
  timer,
  preBtn = document.getElementById('preOrder'),
  inBtn = document.getElementById('inOrder'),
  postBtn = document.getElementById('postOrder'),
  treeRoot = document.getElementsByClassName('sec1')[0];

function preOrder(node) {
  if (!(node == null)) {
    childList.push(node);
    if (!(node.firstElementChild == null)) { preOrder(node.firstElementChild); }
    if (!(node.lastElementChild == null)) { preOrder(node.lastElementChild); }
  }
}
function inOrder(node) {
  if (!(node == null)) {
    if (!(node.firstElementChild == null)) { inOrder(node.firstElementChild); }
    childList.push(node);
    if (!(node.lastElementChild == null)) { inOrder(node.lastElementChild); }
  }
}
function postOrder(node) {
  if (!(node == null)) {
    if (!(node.firstElementChild == null)) { postOrder(node.firstElementChild); }
    if (!(node.lastElementChild == null)) { postOrder(node.lastElementChild); }
    childList.push(node);
  }
}

function reset() {
  childList = [];
  clearInterval(timer);
  var treeNodes = document.getElementsByClassName('flex-box');
  for (let i = 0; i < treeNodes.length; i++) {
    treeNodes[i].style.backgroundColor = '#fff';
  }
}

function changeColor() {
  var i = 0;
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
  }, 1000)
}

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
