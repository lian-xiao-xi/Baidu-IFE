
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */

/*
data = [
  ["北京", 90],
  ["北京", 90]
  ……
]
*/
function getData() {
    let data = [];
    let listItems = document.getElementById('source').children;
    for (let i = 0, len = listItems.length; i < len; i++) {
        // data.push(listItems[i].textContent.trim().split('空气质量：'));
        let text = listItems[i].textContent.trim();
        let cityStr = text.split('空气质量')[0];
        let numStr = listItems[i].firstElementChild.textContent;
        data.push([cityStr, numStr]);
    }

    console.log(data);
    return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    return data.sort((a, b) => b[1] - a[1]);
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    let htmlStr = ``;
    data.forEach(function (item, index) {
        htmlStr += `<li>第${index + 1}名：${item[0]}空气质量：<b>${item[1]}</b>`
    });
    document.getElementById('resort').innerHTML = htmlStr;
}

function btnHandle() {
    let aqiData = sortAqiData(getData());
    render(aqiData);
    document.getElementById('sort-btn').setAttribute('disabled', 'disabled');
}


function init() {
    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    document.getElementById('sort-btn').addEventListener('click', btnHandle, false);
}

init();
