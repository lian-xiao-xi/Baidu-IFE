define(["require", "exports", "../common/common"], function (require, exports, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 保存修改后的数据到浏览器
     */
    function saveData() {
        const tableEle = common_1.getEle(document, '.data-table')[0];
        const thead_th = common_1.getEle(tableEle, '.data-thead .thead-tr th');
        const tbody_tr = common_1.getEle(tableEle, '.data-tbody .tbody-tr');
        // let sale:number[] = new Array(12);
        let ife_table_data = [];
        for (let i = 0; i < tbody_tr.length; i++) {
            let item = tbody_tr[i];
            let data_index = {
                product: '',
                region: '',
                sale: []
            };
            for (let j = 0; j < thead_th.length; j++) {
                const thItem = thead_th[j];
                switch (thItem.getAttribute('data-type')) {
                    case '地区':
                        data_index.region = common_1.getEle(item, 'td')[j].textContent.trim();
                        break;
                    case '商品':
                        data_index.product = common_1.getEle(item, 'td')[j].textContent.trim();
                        break;
                    default:
                        if (thItem.getAttribute('data-month') !== null) {
                            const val = common_1.getEle(common_1.getEle(item, 'td')[j], '.show')[0].textContent.trim();
                            data_index.sale.push(Number(val));
                        }
                        break;
                }
            }
            ife_table_data.push(data_index);
        }
        console.log('保存到本地的 ife_table_data ---> ', ife_table_data);
        window.top.localStorage.setItem('ife_table_data', JSON.stringify(ife_table_data));
    }
    exports.saveData = saveData;
    function editData() {
        // 取消按钮响应的事件：输入框消失，展示数据的元素显示
        function cancel(td) {
            common_1.getEle(td, '.show')[0].classList.remove('hide');
            common_1.getEle(td, '.edit-input')[0].classList.remove('block');
            common_1.getEle(td, '#cancel')[0].remove();
            common_1.getEle(td, '#sure')[0].remove();
        }
        // 确认按钮响应的事件
        function sure(td) {
            let inputVal = common_1.getEle(td, 'input.edit-input')[0].value;
            if (inputVal.trim() && !isNaN(Number(inputVal))) {
                common_1.getEle(td, '.show')[0].textContent = inputVal;
                cancel(td);
            }
            else {
                alert('请输入数字');
            }
        }
        const tbody = common_1.getEle(document, '.data-table .data-tbody')[0];
        // 当鼠标点击某个数字的单元格时，这个数字进入编辑状态，单元格内容变成一个输入框，输入框右边是取消和确定
        tbody.addEventListener('click', function (event) {
            let targetEle = event.target;
            let parent = targetEle.parentElement;
            if (targetEle.getAttribute('data-id') === 'edit') {
                let editInput = common_1.getEle(parent, 'input.edit-input')[0];
                let showDataEle = common_1.getEle(parent, '.show')[0];
                // 如果已经点击过其他td了，就先把那个取消，再继续
                if (document.getElementById('cancel')) {
                    // let cancel = document.getElementById('cancel');
                    let parentTd = document.getElementById('cancel').parentElement;
                    cancel(parentTd);
                }
                const tdEditEle = `<button id="cancel" style="margin-right: 10px;">取消</button><button id="sure">确定</button>`;
                editInput.classList.add('block');
                showDataEle.classList.add('hide');
                parent.insertAdjacentHTML('beforeend', tdEditEle);
            }
            if (targetEle.id === 'cancel') {
                cancel(parent);
            }
            if (targetEle.id === 'sure') {
                sure(parent);
            }
        });
        // 在输入框中，按ESC键等同于按取消,按回车键等同于按确认
        tbody.addEventListener('keydown', function (event) {
            let target = event.target;
            let parentTd = target.parentElement;
            console.log(target);
            if (target.tagName.toLowerCase() === 'input') {
                switch (event.keyCode) {
                    case 13:
                        // console.log('回车键')
                        sure(parentTd);
                        break;
                    case 27:
                        // console.log('esc 键')
                        cancel(parentTd);
                        break;
                    default:
                        break;
                }
            }
        });
        // 点击该单元格以外的页面其他任何地方，除了响应对应行为外，同时等同于点击了取消，输入状态消失
        function cancelAnather(domFir, target) {
            // console.log(domFir, target, domFir.contains(target))
            if (!(domFir == target || domFir.contains(target))) {
                let escEle = document.getElementById('cancel');
                if (escEle) {
                    let parent = escEle.parentElement;
                    cancel(parent);
                    console.log('取消取消取消');
                }
            }
        }
        document.addEventListener('click', function (e) {
            cancelAnather(document.getElementsByClassName('data-table')[0], e.target);
        });
    }
    exports.editData = editData;
});

//# sourceMappingURL=../maps/index/module_edit.js.map
