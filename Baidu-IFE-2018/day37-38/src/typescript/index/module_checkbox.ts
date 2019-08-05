import {getEle} from '../common/common'

/**
 * 给一组checkbox绑定click事件，实现全选功能
 * @param wapperId 一组复选框容器的元素
 */
export function bindClickHandle(wrapperEle: Element) {
  let elesArr: HTMLInputElement[] = <HTMLInputElement[]>Array.from((getEle(wrapperEle, 'input[data-check="item"]')))
  let checkallEle: HTMLInputElement = <HTMLInputElement>wrapperEle.querySelector('input[data-check="checkall"]')
  // let wrapperEle: Element = document.getElementById(wapperId);

  // 这里需要绑定click事件，不能绑定change事件
  wrapperEle.addEventListener('click', function (event) {
    let targetEle = event.target as Element;
    if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') { return }

    const dataType: string = targetEle.getAttribute('data-check');
    switch (dataType) {
      case 'item':
        itemClick(event, elesArr, checkallEle)
        break;
      case 'checkall':
        setCheckAll(event, elesArr);
        break;
    }
  })

  checkedLen(elesArr) === elesArr.length ? checkallEle.checked = true : checkallEle.checked = false;

}

/**
 * 返回当前子选项 checkbox 中选中的数量
 */
function checkedLen(elesArr: HTMLInputElement[]): number {
  let checkLen: number = 0;
  elesArr.forEach((item) => {
    item.checked && ++checkLen
  })
  return checkLen;
}

/**
 * 点击子选项 checkbox 执行的事件
 * 参数 elesArr 为所有子选项checkbox的元素集合
 */
function itemClick(e: Event, elesArr: HTMLInputElement[], checkallEle: HTMLInputElement) {
  let len = checkedLen(elesArr)
  // 不允许一个都不勾选
  // 因为点击事件开始执行之后，对应的type="checkbox" 的 input 的checked属性变为false；
  // 所以下面应该是 if(len === 0) 而不是 if(len === 1)
  if (len === 0) {
    // 使相应的check变为选中状态
    e.preventDefault();
  }
  const elesLen: number = elesArr.length;
  // 根据被选中的checkbox数量是否等于所有子项目checkbox（去除全选checkbox剩下的checkbox）的数量，来决定是否把全选checkbox给选中
  len === elesLen ? checkallEle.checked = true : checkallEle.checked = false
}

/**
 * 点击全选checkbox执行的方法
 * 参数 elesArr 为所有子选项checkbox的元素集合  
 */
function setCheckAll(e: Event, elesArr: HTMLInputElement[]) {
  // 如果子选项checkbox已经全部被选中（此时全选checkbox也应该已经被选中），则点击全选按钮无反应
  if (checkedLen(elesArr) === elesArr.length) {
    e.preventDefault()
  } else {
    elesArr.forEach(item => {
      item.checked = true;
    })
  }
}
