const $ = (selectors) => document.querySelectorAll(selectors);
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
// var aqiData = {};
let aqiData = new Map();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    let cityStr = $('#aqi-city-input')[0].value.trim();
    let numStr = $('#aqi-value-input')[0].value.trim();
    if (!/^[a-zA-Z\u4E00-\u9FA5]+$/.test(cityStr)) {
        alert('城市名必须为中英文字符！');
        return;
    }
    if (!/^\d+$/.test(numStr)) {
        alert('空气质量指数必须为整数！');
        return;
    }
    // aqiData[cityStr] = parseInt(numStr);
    aqiData.set(cityStr, parseInt(numStr));

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let htmlStr = ``
    if (aqiData.size !== 0) {
        htmlStr = `<thead><tr><th>城市</th><th>空气质量</th><th>操作</th></tr></thead>`;
        for(let [key, value] of aqiData) {
            htmlStr += `<tr><td>${key}</td><td>${value}</td><td><button data-city="${key}">删除</button></td></tr>`
        }
    }
    $('#aqi-table')[0].innerHTML = htmlStr;
    $('#aqi-city-input')[0].value = '';
    $('#aqi-value-input')[0].value = '';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(cityStr) {
  // do sth.
  aqiData.delete(cityStr);
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn")[0].addEventListener("click", addBtnHandle, false);
$("#aqi-value-input")[0].addEventListener('keyup',function (e) {
    e = event ? event:window.event;
    if(e.keyCode === 13) {addBtnHandle();}
}, false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
$('#aqi-table')[0].addEventListener('click', function (event) {
    event = event?event:window.event;
    if(event.target.nodeName.toLowerCase() === 'button') {delBtnHandle(event.target.dataset.city)}
},false);
}

init();