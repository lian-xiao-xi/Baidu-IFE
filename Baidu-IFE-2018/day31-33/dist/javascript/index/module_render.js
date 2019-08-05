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
        [].slice.call(common_1.getEle(document, 'input[data-check="item"]')).filter(function (item) {
            return item.checked === true;
        }).forEach(function (item) {
            if (item.classList.contains('region-checkbox')) {
                result.region.push(item.value);
            }
            else if (item.classList.contains('product-checkbox')) {
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
        var product = formData.product, region = formData.region;
        var pLen = product.length, rLen = region.length;
        if (pLen === 1 && rLen === 1) {
            render(true);
        }
        else if (pLen === 1 && rLen > 1) {
            render(true);
        }
        else if (pLen > 1 && rLen === 1) {
            render(false);
        }
        else if (pLen > 1 && rLen > 1) {
            render(true);
        }
        function render(howShow) {
            var bodyData = module_data_1.resultData(product, region);
            var headArr = [];
            var varyArr = howShow ? ['商品', '地区'] : ['地区', '商品'];
            headArr = varyArr.concat(headerData);
            var theadStr = "<thead><tr class=\"thead-tr\">";
            headArr.forEach(function (item) {
                theadStr += "<th class=\"thead-td\">" + item + "</th>";
            });
            theadStr += '</tr></thead>';
            var tbodyStr = '<tbody>';
            bodyData.forEach(function (itemData, index) {
                tbodyStr += '<tr class="tbody-tr">';
                if (howShow) {
                    if (index % rLen === 0) {
                        tbodyStr += "<td class=\"tbody-td\" rowspan=\"" + rLen + "\">" + itemData.product + "</td>";
                    }
                    tbodyStr += "<td class=\"tbody-td\">" + itemData.region + "</td>";
                }
                else {
                    if (index % pLen === 0) {
                        tbodyStr += "<td class=\"tbody-td\" rowspan=\"" + pLen + "\">" + itemData.region + "</td>";
                    }
                    tbodyStr += "<td class=\"tbody-td\">" + itemData.product + "</td>";
                }
                itemData.sale.forEach((function (saleItem) {
                    tbodyStr += "<td>" + saleItem + "</td>";
                }));
                tbodyStr += '</tr>';
            });
            tbodyStr += '</tbody>';
            table.innerHTML = theadStr + tbodyStr;
        }
    }
    exports.renderData = renderData;
});

//# sourceMappingURL=../maps/index/module_render.js.map
