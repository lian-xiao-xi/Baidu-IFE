define(["require", "exports", "../common/common", "./module_data"], function (require, exports, common_1, module_data_1) {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取checkbox所选择的数据
     */
    function getCheckVal() {
        var result = {
            region: [],
            product: []
        };
        Array.from(common_1.getEle(document, 'input[data-check="item"]')).filter(function (item) {
            return item.checked === true;
        }).forEach(function (item) {
            if (item.classList.contains('region-checkbox')) {
                result.region.push(item.value);
            } else if (item.classList.contains('product-checkbox')) {
                result.product.push(item.value);
            }
        });
        console.log(result);
        return result;
    }
    exports.getCheckVal = getCheckVal;
    /**
     * 渲染表格
     */
    function renderData() {
        var formData = getCheckVal();
        var headerData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        common_1.getEle(document, '.table-wrapper')[0].innerHTML = '';
        var table = document.createElement('table');
        table.className = 'data-table';
        common_1.getEle(document, '.table-wrapper')[0].appendChild(table);
        var product = formData.product,
            region = formData.region;
        var pLen = product.length,
            rLen = region.length;
        if (pLen === 1 && rLen === 1) {
            render(true);
        } else if (pLen === 1 && rLen > 1) {
            render(true);
        } else if (pLen > 1 && rLen === 1) {
            render(false);
        } else if (pLen > 1 && rLen > 1) {
            render(true);
        }
        // 参数 howShow 用于设置 地区 和 商品 两栏的前后顺序
        function render(howShow) {
            var bodyData = module_data_1.resultData(product, region);
            var varyArr = howShow ? ['商品', '地区'] : ['地区', '商品'];
            var theadStr = "<thead class=\"data-thead\"><tr class=\"thead-tr\">";
            varyArr.forEach(function (item) {
                theadStr += "<th class=\"thead-td\" data-type=\"" + item + "\">" + item + "</th>";
            });
            headerData.forEach(function (item) {
                theadStr += "<th class=\"thead-td\" data-month=\"" + item + "\">" + item + "</th>";
            });
            theadStr += '</tr></thead>';
            var tbodyStr = '<tbody class="data-tbody">';
            bodyData.forEach(function (itemData, index) {
                tbodyStr += '<tr class="tbody-tr">';
                if (howShow) {
                    if (index % rLen === 0) {
                        tbodyStr += "<td class=\"tbody-td\" rowspan=\"" + rLen + "\">" + itemData.product + "</td>";
                    } else {
                        tbodyStr += "<td class=\"tbody-td\" style=\"display:none;\">" + itemData.product + "</td>";
                    }
                    tbodyStr += "<td class=\"tbody-td\">" + itemData.region + "</td>";
                } else {
                    if (index % pLen === 0) {
                        tbodyStr += "<td class=\"tbody-td\" rowspan=\"" + pLen + "\">" + itemData.region + "</td>";
                    } else {
                        tbodyStr += "<td class=\"tbody-td\" style=\"display:none;\">" + itemData.region + "</td>";
                    }
                    tbodyStr += "<td class=\"tbody-td\">" + itemData.product + "</td>";
                }
                itemData.sale.forEach(function (saleItem) {
                    tbodyStr += "<td><span data-id=\"edit\" class=\"show\">" + saleItem + "</span><img src=\"./assets/images/edit.png\" class=\"img\" data-id=\"edit\"><input type=\"text\" class=\"edit-input\" value=\"" + saleItem + "\"></td>";
                });
                tbodyStr += '</tr>';
            });
            tbodyStr += '</tbody>';
            table.innerHTML = theadStr + tbodyStr;
        }
    }
    exports.renderData = renderData;
});

//# sourceMappingURL=../maps/index/module_render.js.map
//# sourceMappingURL=../maps/index/module_render.js.map
