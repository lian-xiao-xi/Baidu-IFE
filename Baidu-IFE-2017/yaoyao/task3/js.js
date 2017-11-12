var $ = function(selects) {
    return document.querySelectorAll(selects);
};

var radioStu = $('#radioStu')[0],
    radioNostu = $('#radioNo_stu')[0],
    inSchool_cont = $('.select-container .inSchool')[0],
    outSchool_cont = $('.select-container .outSchool')[0],
    selSchool = $('#sel-school')[0],
    selCity = $('#sel-city')[0];

// 两个单选radio绑定 change 事件,change 事件可以冒泡
$('.radio-select')[0].addEventListener('change', radioChange, false);

// 为id="sel-city" 的城市选择框绑定change事件
selCity.addEventListener('change', selectChange, false);

/**
* radioChange()
* 选择不同的单选按钮时，让 class="select-container" 的元素显示不同内容
*/
function radioChange() {
    if (radioNostu.checked) {
        inSchool_cont.classList.add('hidden');
        outSchool_cont.classList.remove('hidden');
    } else {
        inSchool_cont.classList.remove('hidden');
        outSchool_cont.classList.add('hidden');
    }
}

/**
* optChange(cityStr)
* @Parameter string
* 比较 city_school中定义的城市中的学校的个数和此时 id="sel-school" 的学校选择框中option的个数，
* 然后使学校选择框中的option个数刚好能够盛放 city_school[cityStr] 中的school
*/
function optChange(cityStr) {
    // 定义每个城市及其对应的几所大学
    var city_school = {
        '上海': ['复旦大学', '上海交大', '同济大学', '华东师范大学', '上海财经大学', '东华大学'],
        '北京': ['北京大学', '清华大学', '中国人民大学', '北京邮电大学', '北京航空航天大学', '中国农业大学', '北京理工大学'],
        '广州': ['中山大学', '华南理工大学', '暨南大学', '广州大学'],
        '天津': ['南开大学', '天津大学', '天津工业大学']
    };
    
    var schoolOptLen = selSchool.options.length,
    cityArrLen = city_school[cityStr].length;

    if (schoolOptLen < cityArrLen) {
        for (var i = 0; i < cityArrLen - schoolOptLen; i++) {
            selSchool.add((new Option('', '')), undefined);
        }
    } else if (schoolOptLen > cityArrLen) {
        for (var a = 1; a <= schoolOptLen - cityArrLen; a++) {
            selSchool.remove(schoolOptLen - a);
        }
    } else {
        return;
    }

    for (var z = 0; z < cityArrLen; z++) {
        selSchool.options[z].textContent = city_school[cityStr][z];
        selSchool.options[z].value = city_school[cityStr][z];
        selSchool.options[z].removeAttribute('checked');
    }
}

/**
* selectChange()
* 选择城市选择框中不同的option对应不同的学校option
*/
function selectChange() {
    var cityStr = selCity.options[selCity.selectedIndex].value;
    optChange(cityStr);
}
