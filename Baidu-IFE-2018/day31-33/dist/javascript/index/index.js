define(["require", "exports", "../common/common", "./module_checkbox", "./module_render"], function (require, exports, common_1, module_checkbox_1, module_render_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    module_render_1.renderData();
    module_checkbox_1.bindClickHandle('region-radio-wrapper');
    module_checkbox_1.bindClickHandle('product-radio-wrapper');
    formChangeHandle('#page-form');
    /**
     * 给form表单绑定change事件
     */
    function formChangeHandle(eleId) {
        common_1.getEle(document, eleId)[0].addEventListener('change', function (event) {
            var targetEle = event.target;
            if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') {
                return;
            }
            module_render_1.renderData();
        });
    }
});

//# sourceMappingURL=../maps/index/index.js.map
