const $ = (selectors) => document.querySelector(selectors);

let tagArr = []; // 用于存储tag输入框的值，用于判断输入的值是否重复
let hobArr = []; // 用于存储hob输入框的值

/**
 * tagTextToArr()
 * tag 输入框中遇到空格，逗号，回车即取出输入框的值并渲染为 DOM 元素
 */
function tagTextToArr() {
    let text = $('#tag_input').value.trim().replace(/[,，]+/g, '');
    $('#tag_input').value = '';

    if (text.length === 0) {
        alert('请在tag输入框中输入合理的值');
        return false;
    }
    if (tagArr.includes(text)) {
        alert('输入的值不能于下面已经存在的内容相同');
        return false;
    }

    tagArr.push(text);

    render(text, tagArr, $('#tag_show'));
    console.log(tagArr);

}

/**
 * hobRender()
 * 将每次输入到 textarea 中的内容以特定的间隔符分割储存到 textArr 数组中，
 * 然后将 textArr 合并到 hobArr 中
 * 然后利用 ES6 的 set 对 hobArr 数组去重
 */
function hobRender() {
    // array_diff 函数用于去除a数组中与b数组中的值相同的元素,返回a数组
    let array_diff = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < a.length; j++) {
                if (a[j] == b[i]) {
                    a.splice(j, 1);
                    j = j - 1;
                }
            }
        }
        return a;
    };

    let text = $('#hobby_text').value.trim();
    $('#hobby_text').value = '';
    let textArr = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g).filter(
        (item, index) => (item.length > 0)
    );
    if (textArr.length === 0) {
        alert('输入合法字符并用符号隔开');
        return false;
    }
    /* 下面将 textArr 进行去重是防止第一次输入时 hobArr 为空，
     造成使用 array_diff() 后返回的 textArr 中存在相同元素 */
    textArr = array_diff([...new Set(textArr)], hobArr);

    render(textArr, hobArr, $('#hob_show'));
    hobArr = hobArr.concat(textArr);
    console.log(hobArr);

}

/**
 * render()
 * 功能：渲染 DOM 结构
 * 参数 str_strArr 是 tag 输入框中的文本字符串或者 hob 输入框存储多个字符串的数组，
 * shiftArr 是保存各个输入框中全部字符串的数组，
 * parentEle 是需要将元素插入到的目标父元素
 */
function render(str_strArr, shiftArr, parentEle) {
    // 将传入的不同类型的第二个参数存到 renderArr 数组中
    let renderArr = [].concat(str_strArr);
    let eleClone;
    const itemEle = document.createElement('li');
    itemEle.className = 'item';
    itemEle.textContent = '爱好';
    renderArr.forEach(function (item, index) {
        eleClone = itemEle.cloneNode(false);
        eleClone.textContent = item;
        parentEle.appendChild(eleClone);
    });
    if (parentEle.children.length > 10) {
            parentEle.children[0].remove();
            shiftArr.shift();
        }
}

/**
 * delItem()
 * 删除 ul.show 中的子元素及相应的数组项
 */
function delItem(event, arr) {
    let index;
    let targetEle = event.target;
    for (let i = 0, len = targetEle.parentNode.children.length; i < len; i++) {
        if (targetEle === targetEle.parentNode.children[i]) {
            index = i;
            break;
        }
    }
    console.log(index, arr);
    targetEle.remove();
    arr.splice(index, 1);
}

/**
 * 下面为元素绑定相应事件函数
 */
$('#tag_input').addEventListener('keyup', function (e) {
    // e = event ? event : window.event;
    if (e.keyCode === 13 || e.keyCode === 188 || e.keyCode === 32) {
        tagTextToArr();
    }
}, false);

$('#tag_show').addEventListener('click', function (e) {
    // e = event ? event : window.event;
    if (e.target.tagName.toLowerCase() === 'li') {
        delItem(e, tagArr);
    }
}, false);

$('#hob_show').addEventListener('click', function (e) {
    // e = event ? event : window.event;
    if (e.target.tagName.toLowerCase() === 'li') {
        delItem(e, hobArr);
    }
}, false);

$('#hob_btn').addEventListener('click', function () {
    hobRender();
}, false);
