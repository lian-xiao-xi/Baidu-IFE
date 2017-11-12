const $ = (selectors) => document.querySelector(selectors);

let result = [];

function insertHtml() {
    let text = $('#textarea').value.trim();
    let strToArr = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(
        (item, index) => (item.length > 0)
    );
    if (strToArr.length === 0) {
        alert('输入的字符不合法');
        return false;
    }
    result = result.concat(strToArr);
    console.log(result);
    renderHtml();
    $('#textarea').value = '';
}

function renderHtml(searText) {
    let strHtml = ``;
    result.forEach(function (item, index) {
        if (searText) {
            item = item.replace(new RegExp(searText, 'g'), `<span class="selected">${searText}</span>`);
        }
        strHtml += `<li class="item">${item}</li>`;
    });
    $('#result').innerHTML = strHtml;
}

$('#insert').addEventListener('click', insertHtml, false);
$('#search').addEventListener('click', function () {
    let searText = $('#search_text').value.trim();
    if (searText.length === 0) {
        alert('请输入要搜索的值');
        return false;
    }
    renderHtml(searText);
}, false);
