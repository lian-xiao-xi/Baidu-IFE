define(["require", "exports", "../common/common", "./module_checkbox", "./module_render", "./module_edit"], function (require, exports, common_1, module_checkbox_1, module_render_1, module_edit_1) {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    inspectState();
    module_checkbox_1.bindClickHandle(document.getElementById('region-radio-wrapper'));
    module_checkbox_1.bindClickHandle(document.getElementById('product-radio-wrapper'));
    function inspectState() {
        var historyState = window.history.state;
        if (Object.prototype.toString.call(historyState) === '[object Object]' && historyState.checkboxState) {
            var state = historyState.checkboxState;
            console.log('url 状态 ---> ', state);
            // 下面注释的部分应该有问题
            var times = 0;
            for (var key in state) {
                if (state.hasOwnProperty(key)) {
                    var element = state[key];
                    if (Array.isArray(element)) {
                        var groupWrappper = common_1.getEle(document, '#page-form .radio-wrapper')[times];
                        checkCheckbox(element, Array.from(common_1.getEle(groupWrappper, '.checkbox-group')));
                        times++;
                    }
                }
            }
        } else {
            common_1.getEle(document, '#page-form .radio-wrapper').forEach(function (item) {
                common_1.getEle(item, '.checkbox-group input[type="checkbox"]')[0].checked = true;
            });
        }
    }
    function checkCheckbox(state, checkGroup) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = state[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = checkGroup[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var checkbox = _step2.value;

                        var input = common_1.getEle(checkbox, 'input[type="checkbox"]')[0];
                        if (input.value.trim() === item) {
                            input.checked = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
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
            var targetEle = event.target;
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
//# sourceMappingURL=../maps/index/index.js.map
