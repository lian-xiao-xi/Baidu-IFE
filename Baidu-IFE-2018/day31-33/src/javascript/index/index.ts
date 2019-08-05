import {getEle} from '../common/common'
import {bindClickHandle} from './module_checkbox'
import {renderData} from './module_render'

renderData()
bindClickHandle('region-radio-wrapper')
bindClickHandle('product-radio-wrapper')
formChangeHandle('#page-form')

/**
 * 给form表单绑定change事件
 */
function formChangeHandle(eleId: string) {
  getEle(document, eleId)[0].addEventListener('change', function (event) {
    let targetEle = event.target as Element;
    if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') { return; }
    renderData()
  })
}

