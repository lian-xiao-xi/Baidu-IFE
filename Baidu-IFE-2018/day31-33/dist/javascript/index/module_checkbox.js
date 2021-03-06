define(["require", "exports", "../common/common"], function (require, exports, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 给一组checkbox绑定click事件，实现全选功能
     * @param wapperId 一组复选框容器的id
     */
    function bindClickHandle(wapperId) {
        var wrapperEle = document.getElementById(wapperId);
        var elesArr = Array.prototype.slice.call(common_1.getEle(wrapperEle, 'input[data-check="item"]'));
        var checkallEle = wrapperEle.querySelector('input[data-check="checkall"]');
        // 这里需要绑定click事件，不能绑定change事件
        wrapperEle.addEventListener('click', function (event) {
            var targetEle = event.target;
            if (targetEle.tagName.toLocaleLowerCase() !== 'input' || targetEle.getAttribute('type') !== 'checkbox') {
                return;
            }
            var dataType = targetEle.getAttribute('data-check');
            switch (dataType) {
                case 'item':
                    itemClick(event, elesArr, checkallEle);
                    break;
                case 'checkall':
                    setCheckAll(event, elesArr);
                    break;
            }
        });
    }
    exports.bindClickHandle = bindClickHandle;
    /**
     * 返回当前子选项 checkbox 中选中的数量
     */
    function checkedLen(elesArr) {
        var checkLen = 0;
        elesArr.forEach(function (item) {
            item.checked && ++checkLen;
        });
        return checkLen;
    }
    /**
     * 点击子选项 checkbox 执行的事件
     * 参数 elesArr 为所有子选项checkbox的元素集合
     */
    function itemClick(e, elesArr, checkallEle) {
        var len = checkedLen(elesArr);
        // 不允许一个都不勾选
        // 因为点击事件开始执行之后，对应的type="checkbox" 的 input 的checked属性变为false；
        // 所以下面应该是 if(len === 0) 而不是 if(len === 1)
        if (len === 0) {
            // 使相应的check变为选中状态
            e.preventDefault();
        }
        var elesLen = elesArr.length;
        // 根据被选中的checkbox数量是否等于所有子项目checkbox（去除全选checkbox剩下的checkbox）的数量，来决定是否把全选checkbox给选中
        len === elesLen ? checkallEle.checked = true : checkallEle.checked = false;
    }
    /**
     * 点击全选checkbox执行的方法
     * 参数 elesArr 为所有子选项checkbox的元素集合
     */
    function setCheckAll(e, elesArr) {
        // 如果子选项checkbox已经全部被选中（此时全选checkbox也应该已经被选中），则点击全选按钮无反应
        if (checkedLen(elesArr) === elesArr.length) {
            e.preventDefault();
        }
        else {
            elesArr.forEach(function (item) {
                item.checked = true;
            });
        }
    }
});

//# sourceMappingURL=../maps/index/module_checkbox.js.map
