/**
 * 使用 ES6 语法对js.js文件进行重写
 */

const $ = (selectors) => (document.querySelectorAll(selectors));

class TreeWalker {
    constructor(stack, root) {
        this.stack = stack;
        this.root = root;
        this.timer = null;
    }

    /**
     * 深度优先遍历函数
     * @param {function} callback 
     * @param {node} rootNode 
     */
    DF(callback, rootNode) {
        (function recurse(curNode) {
            if (curNode == null) { return false; }

            callback(curNode);
            for (let i = 0, len = curNode.children.length; i < len; i++) {
                recurse(curNode.children[i]);
            }
        })(rootNode);
    }

    /**
     * 广度优先遍历函数
     * @param {function} callback 
     * @param {node} rootNode 
     */
    BF(callback, rootNode) {
        let nodeList = [];
        nodeList.push(rootNode);
        let curNode = nodeList.shift();
        if (curNode == null) { return false; }

        while (!!curNode) {
            callback(curNode);
            for (let i = 0, len = curNode.children.length; i < len; i++) {
                nodeList.push(curNode.children[i]);
            }
            curNode = nodeList.shift();
        }

    }

    /**
     * anim()
     * 以动画的形式呈现遍历的过程
     */
    anim(searchText) {
        let resultArr = this.stack;
        let i = 0;
        let startTime = Date.now(),
            stopTime;
        let self = this;
        // let timer;
        resultArr[i].style.backgroundColor = 'palevioletred';

        this.timer = setInterval(function (params) {
            if (!!searchText && searchText === resultArr[i].firstChild.textContent.trim()) {
                stopTime = Date.now();
                alert(`查询到目标元素，耗时${stopTime - startTime}毫秒`);
                clearInterval(self.timer);
                resultArr[i].style.backgroundColor = 'yellow';
                return;
            }
            i++;
            if (i < resultArr.length) {
                resultArr[i - 1].style.backgroundColor = '#fff';
                resultArr[i].style.backgroundColor = 'palevioletred';
            } else {
                resultArr[i - 1].style.backgroundColor = '#fff';
                clearInterval(self.timer);
            }
        }, 800);
    }

    /**
     * reset()
     * 重置 stack 数组、树中节点的样式并取消由 setInterval() 设置的 timer
     */
    reset() {
        this.stack = [];
        this.DF(function (node) {
            node.style.backgroundColor = '#fff';
            node.removeAttribute('data-selected');
        }, this.root);
        clearInterval(this.timer);
    }

    /**
     * nodeClickHander()
     * 标记点击节点的 dataset
     */
    nodeClickHander() {
        this.reset();
        event.target.dataset.selected = 'true';
    }

    /**
     * getSelNodes()
     * 得到当前被选中的节点并使用 callback 函数改变被选中节点的样式
     */
    getSelNodes(callback) {
        let selectedNodes = [];
        this.DF(function (node) {
            if (node.dataset.selected === 'true') {
                selectedNodes.push(node);
            }
        }, this.root);
        callback(selectedNodes);
        console.log(selectedNodes);
    }

}

const treeWalker = new TreeWalker([], $('.root')[0]);

$('#df')[0].addEventListener('click', function () {
    treeWalker.reset();
    treeWalker.DF(function (node) {
        treeWalker.stack.push(node);
    }, treeWalker.root);
    treeWalker.anim();
}, false);
$('#bf')[0].addEventListener('click', function () {
    treeWalker.reset();
    treeWalker.BF(function (node) {
        treeWalker.stack.push(node);
    }, treeWalker.root);
    treeWalker.anim();
}, false);
$('#df-search')[0].addEventListener('click', function () {
    treeWalker.reset();
    treeWalker.DF(function (node) {
        treeWalker.stack.push(node);
    }, treeWalker.root);
    treeWalker.anim($('#search')[0].value);
}, false);
$('#bf-search')[0].addEventListener('click', function () {
    treeWalker.reset();
    treeWalker.BF(function (node) {
        treeWalker.stack.push(node);
    }, treeWalker.root);
    treeWalker.anim($('#search')[0].value);
}, false);

treeWalker.root.addEventListener('click', function (event) {
    treeWalker.nodeClickHander();
    treeWalker.getSelNodes(function (selectedNodes) {
        selectedNodes.forEach(function (item, index) {
            item.style.backgroundColor = 'lightskyblue';
        });
    });
}, false);

$('.btnGroup-right button')[0].addEventListener('click', function () {
    treeWalker.getSelNodes(function (selectedNodes) {
        selectedNodes.forEach(function (item, index) {
            item.remove();
        });
    });
}, false);

$('.btnGroup-right button')[1].addEventListener('click', function () {
    treeWalker.getSelNodes(function (selectedNodes) {
        let addNode = document.createElement('div');
        addNode.textContent = $('.btnGroup-right input')[0].value;
        addNode.classList.add('add');
        selectedNodes.forEach(function (item, index) {
            item.appendChild(addNode);
        });
    });
}, false);