// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var inputWrapper = document.querySelector('#email-input');
var tipListWrapper = document.querySelector('#email-sug-wrapper');
// 最基本的邮箱格式
var reg = /^([^@]+)@([^@]+|$)$/;
// 定义一个变量用来保存当前被选中的index
var activedIndex = 0;
// 获取用户输入的内容
function getInputVal() {
    return inputWrapper.value.trim();
}
// 生成提示框中的提示内容
function createTipList() {
    var inputVal = htmlEncode(getInputVal());
    var spliceStr = inputVal;
    var copyData = postfixList.concat();
    if (inputVal.match(reg)) {
        tipListWrapper.style.display = 'block';
        var matchRes = inputVal.match(reg);
        if (matchRes[2] !== '') {
            var postStr = matchRes[2];
            var startRegx_1 = new RegExp("^" + postStr);
            if (postfixList.some(function (item) {
                // ts 中不支持es6的startsWith方法
                // return item.startsWith(postStr)
                return startRegx_1.test(item);
            })) {
                copyData = postfixList.filter(function (item) {
                    // return item.startsWith(postStr)
                    return startRegx_1.test(item);
                });
            }
        }
        spliceStr = matchRes[1];
    }
    else {
        if (!/^[^@]+$/.test(inputVal)) {
            tipListWrapper.style.display = 'none';
        }
        else {
            tipListWrapper.style.display = 'block';
        }
    }
    var listHtmlStr = '';
    activedIndex = 0;
    copyData.forEach(function (item, index) {
        if (index === activedIndex) {
            listHtmlStr += "<li class=\"tip-item actived\" data-type=\"tip_item\">" + spliceStr + "@" + item + "</li>";
        }
        else {
            listHtmlStr += "<li class=\"tip-item\" data-type=\"tip_item\">" + spliceStr + "@" + item + "</li>";
        }
    });
    return listHtmlStr;
}
// 将提示内容添加到#email-sug-wrapper元素中
function addToTip() {
    tipListWrapper.innerHTML = createTipList();
}
// 当input输入框内容变化时，重新渲染提示内容
inputWrapper.addEventListener('input', function (event) {
    addToTip();
});
function tipToInput(text) {
    inputWrapper.value = htmlDecode(text);
    tipListWrapper.style.display = 'none';
}
// 点击提示内容时，将提示内容填到输入框中
tipListWrapper.addEventListener('click', function (event) {
    if (!(event.target instanceof Element))
        return;
    var target = event.target;
    if (target.getAttribute('data-type') === 'tip_item') {
        tipToInput(target.textContent);
        inputWrapper.focus();
    }
});
// 通过键盘操作（回车和上下键）进行提示框的选择
inputWrapper.addEventListener('keydown', function (event) {
    var tipListDisplay = document.defaultView.getComputedStyle(tipListWrapper, null).display;
    if (tipListDisplay === 'none')
        return;
    var keyCode = event.keyCode;
    var tipList = tipListWrapper.querySelectorAll('[data-type="tip_item"]');
    switch (keyCode) {
        // 上键
        case 38:
            tipList[activedIndex].classList.remove('actived');
            if (--activedIndex < 0) {
                activedIndex = tipList.length - 1;
            }
            tipList[activedIndex].classList.add('actived');
            break;
        // 下键
        case 40:
            tipList[activedIndex].classList.remove('actived');
            // ++activedIndex;
            if (++activedIndex >= tipList.length) {
                activedIndex = 0;
            }
            tipList[activedIndex].classList.add('actived');
            break;
        // 回车键
        case 13:
            tipToInput(tipList[activedIndex].textContent);
            break;
        case 27:
            inputWrapper.select();
            break;
    }
});
/**
 * 对html字符转义
 */
function htmlEncode(html) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}
/**
 * 对html字符反转义
 */
function htmlDecode(text) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent;
    temp = null;
    console.log(text, output);
    return output;
}

//# sourceMappingURL=../maps/index/index.js.map
