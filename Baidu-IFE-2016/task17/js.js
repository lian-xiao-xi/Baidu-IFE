
const $ = function (selectors) {
  return document.querySelectorAll(selectors);
}

/**
 * js 生成随机颜色值得几种方法
 */
const getRandomColor1 = function () {
    return '#' + (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16 + 0)])
        && (color.length === 6) ? color : arguments.callee(color);
    })('');
};

const getRandomColor2 = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

const getRandomColor3 = function () {
    return (function (num) {
        return (num ? arguments.callee(num-1) : '#') +
        '0123456789abcdef'[Math.floor(Math.random() * 16 + 0)];
    })(5);
};

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(date = new Date('2016-01-01')) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  let returnData = {};
  let dataStr = '';
  let date = new Date('2016-01-01');
  for (var i = 0; i < 91; i++) {
    dataStr = getDateStr(date);
    returnData[dataStr] = Math.floor(Math.random() * seed + 1);
    date.setDate(date.getDate() + 1);
  }
  return returnData;
}

let aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
console.log(aqiSourceData);

// 记录当前页面的表单选项
let pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  let week_monthData = function (num = 7, dataArr = []) {
    let dataArr2 = dataArr.concat();
    let week_mothDataArr = [];
    while (dataArr2.length > 0) {
      let delArr = dataArr2.splice(0, num);
      let sum = delArr.reduce(function (pre, cur, index, arr) {
        return pre + cur;
      });
      console.log(sum / num, dataArr2.length, dataArr.length);
      week_mothDataArr.push(sum / num);
    }
    console.log(week_mothDataArr);
    return week_mothDataArr;
  }

  let chartData = null;
  let dataKeyArr = Object.keys(aqiSourceData); // 获得城市列表的数组形式
  let selectCity = dataKeyArr[pageState.nowSelectCity]; // 获得当前选中的城市

  let dayData = aqiSourceData[selectCity]; // 获得当前城市空气质量数据的对象形式
  let dataArr = Object.values(dayData);
  chartData = [dataArr, week_monthData(7, dataArr), week_monthData(31, dataArr)];
  console.log(chartData);
  return chartData;

}


/**
 * 渲染图表
 */
function renderChart() {
  let renderData = initAqiChartData();

  // 渲染dom结构
  $('.aqi-chart-wrap')[0].innerHTML = '';
  let createDOM = function (whichData = 0, divWidth = '0.55%') {
    // let domEle = null;
    let htmlStr = ``;
    for (let i = 0, len = renderData[whichData].length; i < len; i++) {
      // domEle = document.createElement('div');
      // domEle.className = 'data-show';
      // domEle.style.transition = `0.2s ${i*0.05}s`;
      // domEle.style.height = renderData[whichData][i] + 'px';
      // domEle.style.width = divWidth;
      // $('.aqi-chart-wrap')[0].appendChild(domEle);
      htmlStr += `<div style="width:${divWidth};height:${Math.round(renderData[whichData][i])}px;background-color:${getRandomColor1()}" class="data-show";></div>`
    }
    $('.aqi-chart-wrap')[0].innerHTML = htmlStr;
  };
  switch (pageState.nowGraTime) {
    case 'day':
      createDOM(0, '0.55%');
      break;
    case 'week':
      createDOM(1, '5.3%');
      break;
    case 'month':
      createDOM(2, '20%');
      break;
    default:
      createDOM(0, '0.55%');
      break;
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  let radioEles = document.getElementsByName('gra-time');
  for (let i = 0; i < radioEles.length; i++) {
    let curRadio = radioEles[i];
    if (curRadio.checked) {
      // 确定是否选项发生了变化 
      if (curRadio.value === pageState.nowGraTime) {
        return;
      } else { // 设置对应数据
        pageState.nowGraTime = curRadio.value;
      }
    }
  }

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  let selectedOptIndex = $('#city-select')[0].selectedIndex;
  // 确定是否选项发生了变化 
  if (selectedOptIndex === pageState.nowSelectCity) {
    return;
  } else {  // 设置对应数据
    pageState.nowSelectCity = selectedOptIndex;
  }
  // 调用图表渲染函数
  renderChart();
}


renderChart();
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
let radioEles = $('input[type="radio"][name="gra-time"]');
for (let i = 0, len = radioEles.length; i < len; i++) {
  radioEles[i].addEventListener('click', function () {
    graTimeChange();
  }, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */

// 给select设置事件，当选项发生变化时调用函数citySelectChange
$('#city-select')[0].addEventListener('click', function () {
  citySelectChange();
}, false);
