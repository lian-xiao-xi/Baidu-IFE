var $ = function(selects) {
    return document.querySelectorAll(selects);
};

class Box {
    constructor(row, col, rotate, boxNode, input, btn) {
        this.row = row;
        this.col = col;
        this.rotate = rotate;
        this.boxNode = boxNode;
        this.input = input;
        this.btn = btn;
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
        var new_boxEle = this.boxNode.children[index -1 - 10];
        if (index / this.col <= 1) return false;
        else {
            
            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) {$('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)';}
        }
    }

    // 向右移动一格
    moveRight(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index -1 + 1];
        if (index % this.col === 0) return false;
        else {
            
            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) {$('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)';}
        }
    }

    // 向下移动一格
    moveBottom(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index -1 + 10];
        if (index / this.col > this.row - 1) return false;
        else {
            
            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) {$('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)';}
        }
    }

    // 向左移动一格
    moveLeft(item, boxEle, cloneBoxEle, index, ifRotate = false) {
        var new_boxEle = this.boxNode.children[index -1 - 1];
        if (index % this.col === 1) return false;
        else {
            
            this.boxNode.replaceChild(cloneBoxEle, new_boxEle);
            this.boxNode.replaceChild(item, boxEle);
            if (ifRotate) {$('.container .block')[0].style.transform = 'rotate(' + this.rotate + 'deg)';}
        }
    }

    // 获取blockBox朝向
    getDri() {
        var dir = (this.rotate / 90) % 4;
        if (dir === -1) dir = 3;
        if (dir === -2) dir = 2;
        if (dir === -3) dir = 1;
        return dir;
    }

    allMove() {
        var text = this.input.value;
        var mainEle = this.getEle();
        var item = document.createElement('li');
        console.log(mainEle,this.getDri());

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

        }
    }
}

var box = new Box(10, 10, 0, $('.box ul.container')[0], $('.hander .hander-input')[0], $('.hander button')[0]);

box.boxNode.children[Box.selectFrom(0, box.boxNode.children.length - 1)].classList.add('block');

box.btn.addEventListener('click', function() {
    box.allMove();
}, false);

box.input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {box.allMove();}
}, false);
