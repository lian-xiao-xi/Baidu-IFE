define(["require", "exports", "../common/common", "./module_checkbox", "./module_render", "./module_edit"], function (require, exports, common_1, module_checkbox_1, module_render_1, module_edit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    inspectState();
    module_checkbox_1.bindClickHandle(document.getElementById('region-radio-wrapper'));
    module_checkbox_1.bindClickHandle(document.getElementById('product-radio-wrapper'));
    function inspectState() {
        const historyState = window.history.state;
        if (Object.prototype.toString.call(historyState) === '[object Object]' && historyState.checkboxState) {
            let state = historyState.checkboxState;
            console.log('url 状态 ---> ', state);
            // 下面注释的部分应该有问题
            let times = 0;
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    const element = state[key];
                    if (Array.isArray(element)) {
                        const groupWrappper = common_1.getEle(document, '#page-form .radio-wrapper')[times];
                        checkCheckbox(element, Array.from(common_1.getEle(groupWrappper, '.checkbox-group')));
                        times++;
                    }
                }
            }
        }
        else {
            common_1.getEle(document, '#page-form .radio-wrapper').forEach(item => {
                common_1.getEle(item, '.checkbox-group input[type="checkbox"]')[0].checked = true;
            });
        }
    }
    function checkCheckbox(state, checkGroup) {
        for (const item of state) {
            for (const checkbox of checkGroup) {
                let input = common_1.getEle(checkbox, 'input[type="checkbox"]')[0];
                if (input.value.trim() === item) {
                    input.checked = true;
                }
            }
        }
    }
    module_render_1.renderData();
    formChangeHandle();
    module_edit_1.editData();
    /**
     * 给页面中的元素绑定相关事件
     */
    function formChangeHandle() {
        // 给form表单绑定change事件
        common_1.getEle(document, '#page-form')[0].addEventListener('change', function (event) {
            const targetEle = event.target;
            if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') {
                return;
            }
            window.history.replaceState({ checkboxState: module_render_1.getCheckVal() }, document.title, '');
            module_render_1.renderData();
            module_edit_1.editData();
        });
        // 给保存按钮绑定click事件
        common_1.getEle(document, '#save-table')[0].addEventListener('click', function (event) {
            module_edit_1.saveData();
        });
        // 给取消按钮绑定click事件
        common_1.getEle(document, '#esc-save')[0].addEventListener('click', function () {
            module_render_1.renderData();
        });
    }
});

//# sourceMappingURL=../maps/index/index.js.map
