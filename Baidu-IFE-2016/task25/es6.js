// ========== 封装 TreeNode ========== 
class TreeNode {
    constructor(obj) {
        this.parent = obj.parent;
        this.childs = obj.childs || [];
        this.data = obj.data || '';
        this.selfNode = obj.selfNode; // 访问对应的DOM节点
        this.selfNode.TreeNode = this; // 对应的DOM节点访问回来
    }
    // 判断是否是叶节点
    isLeaf() {
        return this.childs.length === 0;
    }

    // 判断节点是否处于折叠状态
    isFolded() {
        if (this.isLeaf()) { return false };
        if (this.childs[0].selfNode.classList.contains('nodebody-visible')) { return false };
        return true;
    }

    // 展开、合拢节点
    toggleFold() {
        if (this.isLeaf()) { return this; } // 叶节点，无需操作
        // 改变所有子节点的可见状态
        for (let i = 0; i < this.childs.length; i++) {
            this.childs[i].render(false, true);
        }
        // 改变本节点的箭头
        this.render(true);
        return this; // 返回自身，以便链式操作
    }

    // 增加子节点
    addChild(text) {
        if (text == null) { return this }
        if (text.trim() === '') {
            alert('节点内容不能为空');
            return this;
        }
        // 若当前节点处于折叠状态，则将其展开
        if (this.isFolded()) {
            this.toggleFold();
        }
        // 创建新的 DOM 节点并添加
        let newNode = document.createElement('div');
        newNode.classList.add('nodebody-visible');
        newNode.dataset.name = 'nodebody';
        this.selfNode.appendChild(newNode);
        let label = document.createElement('label');
        label.classList.add('node-header');
        label.dataset.name = 'nodeheader';
        newNode.appendChild(label);
        label.innerHTML = `<div class="arrow empty-arrow" data-name="arrow"></div>
        <span class="node-title" data-name="nodetitle">${text}</span>
        <span>&nbsp&nbsp</span>
        <img class="addIcon" src="images/add.png" data-name="add">
        <img class="deleteIcon" src="images/delete.png" data-name="delete">`;

        // 创建对应的TreeNode对象并添加到子节点队列
        this.childs.push(new TreeNode({
            parent: this,
            childs: [],
            data: text,
            selfNode: newNode,
        }));
        // 渲染自身样式
        this.render(true);
        return this; // 返回自身，方便链式调用
    }

    // 删除结点，DOM会自动递归删除子节点，TreeNode递归手动删除子节点
    deleteNode() {
        if (!this.isLeaf()) {
            for (let i = 0; i < this.childs.length; i++) {
                this.childs[i].deleteNode();
            }
        }
        this.selfNode.remove();
        for (let i = 0, len = this.parent.childs.length; i < len; i++) {
            if (this === this.parent.childs[i]) {
                this.parent.childs.splice(i, 1);
                break;
            }
        }
        
        // 调整父节点箭头样式
        this.parent.render(true);

    }

    // 改变节点样式，四个参数分别表示是否改变箭头、可见性、改为高亮、改为普通
    render(arrow, visibility, toHighlight, noHighlight) {
        // if (arguments.length < 3) {}
        if (arrow === true) {
            if (this.isLeaf()) { // 是个叶节点，设为空箭头
                this.selfNode.querySelectorAll('label .arrow')[0].classList.remove('right-arrow', 'down-arrow');
                this.selfNode.querySelectorAll('label .arrow')[0].classList.add('empty-arrow');
            } else if (this.isFolded()) { // 折叠状态
                this.selfNode.querySelectorAll('label .arrow')[0].classList.remove('empty-arrow', 'down-arrow');
                this.selfNode.querySelectorAll('label .arrow')[0].classList.add('right-arrow');
            } else { // 展开状态，设为向下的箭头
                this.selfNode.querySelectorAll('label .arrow')[0].classList.remove('empty-arrow', 'right-arrow');
                this.selfNode.querySelectorAll('label .arrow')[0].classList.add('down-arrow');
            }
        }

        if (visibility === true) {
            if (this.selfNode.classList.contains('nodebody-hidden')) { // 本不可见，变为可见
                this.selfNode.classList.remove('nodebody-hidden');
                this.selfNode.classList.add('nodebody-visible');
            } else if (this.selfNode.classList.contains('nodebody-visible')) { // 本可见，变为不可见
                this.selfNode.classList.remove('nodebody-visible');
                this.selfNode.classList.add('nodebody-hidden');
            }
        }

        if (noHighlight) { // 设为普通
            this.selfNode.querySelectorAll('label .node-title')[0].classList.remove('node-title-highlight');
        }

        if (toHighlight) { // 设为高亮
            this.selfNode.querySelectorAll('label .node-title')[0].classList.add('node-title-highlight');
        }

    }
}
// ========== 以上是封装 TreeNode 的代码 ========== 

// 创建 RootNode 类继承 TreeNode 类
class RootNode extends TreeNode {
    constructor(obj) {
        super(obj);
    }
    BFsearch(searchText) {
        // if (this == null) { return false; }

        let resultArr = [];
        let queue = []; // 辅助数组，依次存储访问的结点
        queue.push(this);
        let current = queue.shift();

        while (!!current) {
            current.render(false, false, false, true);
            if (current.data === searchText) {
                resultArr.push(current);
            }
            for (let i = 0, len = current.childs.length; i < len; i++) {
                queue.push(current.childs[i]);
            }
            current = queue.shift();
        }
        return resultArr;
    }
}

// 创建根节点对应的 RootNode 对象
const root = new RootNode({
    parent: null,
    childs: [],
    data: '前端小白菜鸟',
    selfNode: document.querySelectorAll('.nodebody-visible')[0]
});
// 动态生成 DOM 树结构
root.addChild('技术').addChild('语言').addChild('娱乐活动');
root.childs[0].addChild('HTML5').addChild('CSS3').addChild('javascript').addChild('PHP').addChild('Node.JS').toggleFold();
root.childs[0].childs[4].addChild('后端开发').toggleFold();
root.childs[1].addChild('Go').addChild('C++').toggleFold();
root.childs[2].addChild('K歌').addChild('滑雪').addChild('吃吃吃').toggleFold();
root.childs[2].childs[2].addChild('吃什么啊').toggleFold();

// 为root根节点绑定事件代理，处理所有节点的点击事件
root.selfNode.addEventListener('click', function (event) {
    const target = event.target || event.srcElement;
    let domNode = target;
    // 找到 data-name = 'nodebody' 的 DOM 节点
    while (domNode.dataset.name !== 'nodebody') {
        domNode = domNode.parentNode;
    }
    let selectedNode = domNode.TreeNode; // 获取此节点对应的 RootNode 对象
    switch (target.dataset.name) {
        case 'arrow':
        case 'nodetitle':
            selectedNode.toggleFold();
            break;
        case 'add':
            selectedNode.addChild(prompt('请输入新添加节点的文本内容', '一个新节点'));
            break;
        case 'delete':
            selectedNode.deleteNode();
            break;
        default:
            break;
    }
}, false);

// 为搜索按钮绑定事件
document.querySelectorAll('#search')[0].addEventListener('click', function (event) {
    const text = document.querySelectorAll('#searchText')[0].value.trim();
    if (text === '') {
        document.querySelectorAll('#result')[0].textContent = '请输入要查询的内容';
        return;
    }
    let resultArr = root.BFsearch(text);
        console.log(resultArr)
    if (resultArr.length === 0) {
        document.querySelectorAll('#result')[0].textContent = '未查询到符合条件的节点';
    } else {
        document.querySelectorAll('#result')[0].textContent = `查询到${resultArr.length}个符合条件的节点`;
        resultArr.forEach(function (item, index, arr) {
            item.render(false, false, true, false);
            while (item.parent != null) {
                if (item.parent.isFolded()) {
                    item.parent.toggleFold();
                }
                item = item.parent;
            }
        });
    }
}, false);

// 为清除按钮绑定事件
document.querySelectorAll('#clear')[0].addEventListener('click', function () {
    document.getElementById("searchText").value = "";
    root.BFsearch(null); // 清除高亮样式
    document.getElementById("result").innerHTML = "";
}, false);
