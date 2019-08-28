var $ = function (selects) {
    return document.querySelectorAll(selects);
};

class Box {
    constructor(row, col, rotate, boxNode, commandText, runBtn, refreshBtn) {
        this.row = row; // 一行多少个方块
        this.col = col; // 一列多少个方块
        this.rotate = rotate; // 初始角度
        this.boxNode = boxNode; // 包裹盒的DOM元素
        this.commandText = commandText; // 命令所在的输入框
        this.runBtn = runBtn; // 执行按钮
        this.refreshBtn = refreshBtn; // 重置按钮
    }

    /**
     * 静态方法
     * selectFrom(lowerValue, upperValue)
     * 接受两个参数：返回值的可能最大最小值，
     * 返回一个介于最大最小值（包含最大最小值）的随机数值
     */
    static selectFrom(lowerValue, upperValue) {
        var choices = upperValue - lowerValue + 1;
        return Math.floor(Math.random() * choices + lowerValue);
    }
    /**
     * nodeIndexOf( targetNode)
     * 接受一个参数：要查找的目标元素
     * 返回目标元素在元素集合中的索引值
     */
    nodeIndexOf(targetNode) {
        var index;
        for (var i = 0, len = this.boxNode.children.length; i < len; i++) {
            if (targetNode === this.boxNode.children[i]) {
                index = i;
                break; // 遇到 break ，跳出循环，break后的语句将不再执行
            }
        }
        return index + 1;
    }

    /**
     * getEle()
     * 以数组形式返回包含 .block 类的元素、对其的拷贝、以及其在元素集合中的索引
     */
    getEle() {
        var boxEle = $('.container li.block')[0];
        var cloneNode = boxEle.cloneNode();
        var index = this.nodeIndexOf(boxEle);

        return [boxEle, cloneNode, index];
    }

    // 向上移动一格
    moveTop(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index - 1 - 10];
        // console.log(cloneBoxEle, new_boxEle, item, boxEle);
        if (index / this.col <= 1) return false;
        else {
            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) { $('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)'; }
        }
    }

    // 向右移动一格
    moveRight(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index - 1 + 1];
        if (index % this.col === 0) return false;
        else {

            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) { $('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)'; }
        }
    }

    // 向下移动一格
    moveBottom(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index - 1 + 10];
        if (index / this.col > this.row - 1) return false;
        else {

            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) { $('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)'; }
        }
    }

    // 向左移动一格
    moveLeft(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index - 1 - 1];
        if (index % this.col === 1) return false;
        else {

            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) { $('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)'; }
        }
    }

    // 获取blockBox朝向
    getDri() {
        let dir = (this.rotate / 90) % 4;
        if (dir === -1) dir = 3;
        if (dir === -2) dir = 2;
        if (dir === -3) dir = 1;
        return dir;
    }

    allMove() {
        // 点击执行按钮时清除行号上的样式

        const oneCommandMove = (text, i) => {
            let mainEle = this.getEle();
            let item = document.createElement('li');
            switch (text) {
                case 'GO':
                    var dir = this.getDri();
                    switch (dir) {
                        case 0:
                            this.moveTop(item, mainEle[0], mainEle[1], mainEle[2]);
                            break;
                        case 1:
                            this.moveRight(item, mainEle[0], mainEle[1], mainEle[2]);
                            break;
                        case 2:
                            this.moveBottom(item, mainEle[0], mainEle[1], mainEle[2]);
                            break;
                        case 3:
                            this.moveLeft(item, mainEle[0], mainEle[1], mainEle[2]);
                            break;
                        default:
                    }
                    break;
                case 'TUN LEF':
                    this.rotate -= 90;
                    mainEle[0].style.transform = 'rotate(' + this.rotate + 'deg)';
                    break;
                case 'TUN RIG':
                    this.rotate += 90;
                    mainEle[0].style.transform = 'rotate(' + this.rotate + 'deg)';
                    break;
                case 'TUN BAC':
                    this.rotate += 180;
                    mainEle[0].style.transform = 'rotate(' + this.rotate + 'deg)';
                    break;
                case 'TRA LEF':
                    this.moveLeft(item, mainEle[0], mainEle[1], mainEle[2]);
                    break;
                case 'TRA TOP':
                    this.moveTop(item, mainEle[0], mainEle[1], mainEle[2]);
                    break;
                case 'TRA RIG':
                    this.moveRight(item, mainEle[0], mainEle[1], mainEle[2]);
                    break;
                case 'TRA BOT':
                    this.moveBottom(item, mainEle[0], mainEle[1], mainEle[2]);
                    break;
                case 'MOV LEF':
                    this.rotate = -90;
                    this.moveLeft(item, mainEle[0], mainEle[1], mainEle[2], true);
                    break;
                case 'MOV RIG':
                    this.rotate = 90;
                    this.moveRight(item, mainEle[0], mainEle[1], mainEle[2], true);
                    break;
                case 'MOV TOP':
                    this.rotate = 0;
                    this.moveTop(item, mainEle[0], mainEle[1], mainEle[2], true);
                    break;
                case 'MOV BOT':
                    this.rotate = 180;
                    this.moveBottom(item, mainEle[0], mainEle[1], mainEle[2], true);
                    break;
                default:
                    // return false;
                    $('.show .line')[0].children[i].classList.add('error');
                    break;
            }
        };

        const command = (arrItem, i) => {
            let arr = arrItem.split(' ');
            console.log(arr);
            let finalItem = arr[arr.length - 1];
            let curCmd;
            if (!isNaN(finalItem)) {
                let numStr = arr.pop();
                curCmd = arr.join(' ');
                console.log(curCmd, i);
                for (let a = 0; a < parseInt(numStr); a++) {
                    oneCommandMove(curCmd, i);
                }
            } else {
                curCmd = arr.join(' ');
                console.log(curCmd, i);
                oneCommandMove(curCmd, i);
            }
        };
        let textArr = this.commandText.value.split(/\n/);
        let i = 1; // 第i条命令
        command(textArr[0], 0);
        let timer = setInterval(() => {
            if (i < textArr.length) {
                console.log(textArr[i], i);
                command(textArr[i], i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 1000);



    }
}

var box = new Box(10, 10, 0, $('.box ul.container')[0], $('#command')[0], $('#btn-run')[0]);

box.boxNode.children[Box.selectFrom(0, box.boxNode.children.length - 1)].classList.add('block');

box.runBtn.addEventListener('click', function () {
    box.allMove();
}, false);

/**
 * areaHandle
 * 文本输入框#command 的事件函数
 */

let lineNum = 1;
function areaHandle(e) {
    e = event || window.event;
    switch (e.type) {
        case 'keyup':
            let arr = [];
            let commandArr = $('#command')[0].value.split(/\n/);
            commandArr.forEach((item, index) => {
                arr.push(`<li class="line-num">${index + 1}</li>`);
            });
            $('.line')[0].innerHTML = arr.join('');
            $('.line')[0].scrollTop = $('#command')[0].scrollTop;
            break;
        case 'scroll':
            $('.show .line')[0].scrollTop = this.scrollTop;
            break;
        default:
            break;
    }
}


// 为textarea#command绑定事件
$('#command')[0].addEventListener('keyup', areaHandle, false);
$('#command')[0].addEventListener('scroll', areaHandle, false);