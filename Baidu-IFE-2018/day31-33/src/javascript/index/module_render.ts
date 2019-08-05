import {getEle, dataFormat, checkVal} from '../common/common'
import {resultData} from './module_data'


/**
 * 获取checkbox所选择的数据
 */
export function getCheckVal(): checkVal {
  let result: checkVal = {
    region: [],
    product: []
  };
  [].slice.call(getEle(document, 'input[data-check="item"]')).filter((item: HTMLInputElement) => {
    return item.checked === true
  }).forEach((item: HTMLInputElement) => {
    if (item.classList.contains('region-checkbox')) {
      result.region.push(item.value)
    } else if (item.classList.contains('product-checkbox')) {
      result.product.push(item.value)
    }
  });
  console.log(result)
  return result;
}

/**
 * 渲染表格
 */
export function renderData() {
  let formData: checkVal = getCheckVal();

  let headerData: string[] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  getEle(document, '.table-wrapper')[0].innerHTML = ''
  let table = document.createElement('table');
  table.className = 'data-table';
  getEle(document, '.table-wrapper')[0].appendChild(table)

  const product = formData.product, region = formData.region;
  const pLen = product.length, rLen = region.length;

  if (pLen === 1 && rLen === 1) {
    render(true)
  } else if (pLen === 1 && rLen > 1) {
    render(true)
  } else if (pLen > 1 && rLen === 1) {
    render(false)
  } else if (pLen > 1 && rLen > 1) {
    render(true)
  }

  function render(howShow: boolean) {
    let bodyData: dataFormat[] = resultData(product, region)
    let headArr: string[] = [];
    let varyArr: string[] = howShow ? ['商品', '地区'] : ['地区', '商品'];
    headArr = varyArr.concat(headerData);
    let theadStr = `<thead><tr class="thead-tr">`
    headArr.forEach((item) => {
      theadStr += `<th class="thead-td">${item}</th>`
    })
    theadStr += '</tr></thead>'

    let tbodyStr = '<tbody>';
    bodyData.forEach((itemData, index) => {
      tbodyStr += '<tr class="tbody-tr">';
      if (howShow) {
        if (index % rLen === 0) {
          tbodyStr += `<td class="tbody-td" rowspan="${rLen}">${itemData.product}</td>`
        }
        tbodyStr += `<td class="tbody-td">${itemData.region}</td>`;
      } else {
        if (index % pLen === 0) {
          tbodyStr += `<td class="tbody-td" rowspan="${pLen}">${itemData.region}</td>`
        }
        tbodyStr += `<td class="tbody-td">${itemData.product}</td>`;
      }
      itemData.sale.forEach((saleItem => {
        tbodyStr += `<td>${saleItem}</td>`
      }))
      tbodyStr += '</tr>'
    })
    tbodyStr += '</tbody>'
    table.innerHTML = theadStr + tbodyStr;
  }
  
}