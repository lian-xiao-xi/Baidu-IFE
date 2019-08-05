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
  Array.from((getEle(document, 'input[data-check="item"]'))).filter((item: HTMLInputElement) => {
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

  // 参数 howShow 用于设置 地区 和 商品 两栏的前后顺序
  function render(howShow: boolean) {
    let bodyData: dataFormat[] = resultData(product, region)
    let varyArr: string[] = howShow ? ['商品', '地区'] : ['地区', '商品'];
    let theadStr = `<thead class="data-thead"><tr class="thead-tr">`
    varyArr.forEach((item) => {
      theadStr += `<th class="thead-td" data-type="${item}">${item}</th>`
    })
    headerData.forEach((item) => {
      theadStr += `<th class="thead-td" data-month="${item}">${item}</th>`
    })
    theadStr += '</tr></thead>';

    let tbodyStr = '<tbody class="data-tbody">';
    bodyData.forEach((itemData, index) => {
      tbodyStr += '<tr class="tbody-tr">';
      if (howShow) {
        if (index % rLen === 0) {
          tbodyStr += `<td class="tbody-td" rowspan="${rLen}">${itemData.product}</td>`
        } else {
          tbodyStr += `<td class="tbody-td" style="display:none;">${itemData.product}</td>`
        }
        tbodyStr += `<td class="tbody-td">${itemData.region}</td>`;
      } else {
        if (index % pLen === 0) {
          tbodyStr += `<td class="tbody-td" rowspan="${pLen}">${itemData.region}</td>`
        } else {
          tbodyStr += `<td class="tbody-td" style="display:none;">${itemData.region}</td>`
        }
        tbodyStr += `<td class="tbody-td">${itemData.product}</td>`;
      }
      itemData.sale.forEach((saleItem => {
        tbodyStr += `<td><span data-id="edit" class="show">${saleItem}</span><img src="./assets/images/edit.png" class="img" data-id="edit"><input type="text" class="edit-input" value="${saleItem}"></td>`
      }))
      tbodyStr += '</tr>'
    })
    tbodyStr += '</tbody>'
    table.innerHTML = theadStr + tbodyStr;
  }
  
}

