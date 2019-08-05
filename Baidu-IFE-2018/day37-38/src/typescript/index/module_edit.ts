import { getEle, dataFormat } from '../common/common'

/**
 * 保存修改后的数据到浏览器
 */
export function saveData() {
  const tableEle = getEle(document, '.data-table')[0];
  const thead_th = getEle(tableEle, '.data-thead .thead-tr th');
  const tbody_tr = getEle(tableEle, '.data-tbody .tbody-tr');

  // let sale:number[] = new Array(12);
  let ife_table_data: dataFormat[] = [];

  for (let i = 0; i < tbody_tr.length; i++) {
    let item = tbody_tr[i];
    let data_index: dataFormat = {
      product: '',
      region: '',
      sale: []
    };

    for (let j = 0; j < thead_th.length; j++) {
      const thItem = thead_th[j];
      switch (thItem.getAttribute('data-type')) {
        case '地区':
          data_index.region = getEle(item, 'td')[j].textContent.trim();
          break;

        case '商品':
          data_index.product = getEle(item, 'td')[j].textContent.trim();
          break;

        default:
          if (thItem.getAttribute('data-month') !== null) {
            const val = getEle(getEle(item, 'td')[j], '.show')[0].textContent.trim();
            data_index.sale.push(Number(val));
          }
          break;
      }
    }
    ife_table_data.push(data_index)
  }

  console.log('保存到本地的 ife_table_data ---> ', ife_table_data)
  window.top.localStorage.setItem('ife_table_data', JSON.stringify(ife_table_data))

}

export function editData() {
  // 取消按钮响应的事件：输入框消失，展示数据的元素显示
  function cancel(td: Element) {
    getEle(td, '.show')[0].classList.remove('hide')
    getEle(td, '.edit-input')[0].classList.remove('block')
    getEle(td, '#cancel')[0].remove();
    getEle(td, '#sure')[0].remove();
  }

  // 确认按钮响应的事件
  function sure(td: Element) {
    let inputVal = (getEle(td, 'input.edit-input')[0] as HTMLInputElement).value;
    if (inputVal.trim() && !isNaN(Number(inputVal))) {
      getEle(td, '.show')[0].textContent = inputVal;
      cancel(td);
    } else {
      alert('请输入数字');
    }
  }

  const tbody = getEle(document, '.data-table .data-tbody')[0];

  // 当鼠标点击某个数字的单元格时，这个数字进入编辑状态，单元格内容变成一个输入框，输入框右边是取消和确定
  tbody.addEventListener('click', function (event) {
    let targetEle = event.target as HTMLElement;
    let parent = targetEle.parentElement;

    if (targetEle.getAttribute('data-id') === 'edit') {
      let editInput = getEle(parent, 'input.edit-input')[0] as HTMLInputElement;
      let showDataEle = getEle(parent, '.show')[0];
      // 如果已经点击过其他td了，就先把那个取消，再继续
      if (document.getElementById('cancel')) {
        // let cancel = document.getElementById('cancel');
        let parentTd = document.getElementById('cancel').parentElement;
        cancel(parentTd);
      }

      const tdEditEle = `<button id="cancel" style="margin-right: 10px;">取消</button><button id="sure">确定</button>`;
      editInput.classList.add('block')
      showDataEle.classList.add('hide')
      parent.insertAdjacentHTML('beforeend', tdEditEle)
    }

    if (targetEle.id === 'cancel') {
      cancel(parent)
    }

    if (targetEle.id === 'sure') {
      sure(parent)
    }
  })

  // 在输入框中，按ESC键等同于按取消,按回车键等同于按确认
  tbody.addEventListener('keydown', function (event: KeyboardEvent) {
    let target = event.target as Element;
    let parentTd = target.parentElement;
    console.log(target);
    if (target.tagName.toLowerCase() === 'input') {
      switch (event.keyCode) {
        case 13:
          // console.log('回车键')
          sure(parentTd)
          break;

        case 27:
          // console.log('esc 键')
          cancel(parentTd);
          break;

        default:
          break;
      }
    }
  })

  // 点击该单元格以外的页面其他任何地方，除了响应对应行为外，同时等同于点击了取消，输入状态消失
  function cancelAnather(domFir, target) {
    // console.log(domFir, target, domFir.contains(target))
    if (!(domFir == target || domFir.contains(target))) {
      let escEle = document.getElementById('cancel')
      if (escEle) {
        let parent = escEle.parentElement;
        cancel(parent)
        console.log('取消取消取消');
      }
    }
  }

  document.addEventListener('click', function (e) {
    cancelAnather(document.getElementsByClassName('data-table')[0], e.target)
  });

}