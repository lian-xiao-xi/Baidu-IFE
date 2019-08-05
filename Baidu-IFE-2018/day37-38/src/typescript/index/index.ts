import { getEle } from '../common/common'
import { bindClickHandle } from './module_checkbox'
import { renderData, getCheckVal } from './module_render'
import { saveData, editData } from './module_edit'

inspectState()
bindClickHandle(document.getElementById('region-radio-wrapper'))
bindClickHandle(document.getElementById('product-radio-wrapper'))

function inspectState() {
  const historyState = window.history.state;
  
  if (Object.prototype.toString.call(historyState) === '[object Object]' && historyState.checkboxState) {
    let state = historyState.checkboxState;
    console.log('url 状态 ---> ', state)
    // 下面注释的部分应该有问题
    let times: number = 0;
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const element: any[] = state[key];
        if(Array.isArray(element)) {
          const groupWrappper = getEle(document, '#page-form .radio-wrapper')[times];
          checkCheckbox(element, Array.from(getEle(groupWrappper, '.checkbox-group')));
          times++;
        }

      }
    }
  } else {
    getEle(document, '#page-form .radio-wrapper').forEach(item => {
      (<HTMLInputElement>getEle(item, '.checkbox-group input[type="checkbox"]')[0]).checked = true;
    })
  }

}

function checkCheckbox(state: any[], checkGroup: Element[]) {
  for (const item of state) {
    for (const checkbox of checkGroup) {
      let input: HTMLInputElement = getEle(checkbox, 'input[type="checkbox"]')[0] as HTMLInputElement;
      if (input.value.trim() === item) {
        input.checked = true;
      } 
    }
  }
}


renderData()
formChangeHandle()
editData()

/**
 * 给页面中的元素绑定相关事件
 */
function formChangeHandle() {
  // 给form表单绑定change事件
  getEle(document, '#page-form')[0].addEventListener('change', function (event) {
    const targetEle = event.target as Element;
    if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') { return; }
    window.history.replaceState({checkboxState: getCheckVal()}, document.title, '');
    renderData()
    editData()
  });
  // 给保存按钮绑定click事件
  getEle(document, '#save-table')[0].addEventListener('click', function (event) {
    saveData()
  })
  // 给取消按钮绑定click事件
  getEle(document, '#esc-save')[0].addEventListener('click', function () {
    renderData()
  })
}

