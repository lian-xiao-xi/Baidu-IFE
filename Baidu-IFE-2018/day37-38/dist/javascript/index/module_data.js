define(["require", "exports", "../common/ife31data"], function (require, exports, ife31data_1) {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取用来渲染表格的数据
     * @param product checkbox所选的产品种类集合
     * @param region checkbox所选择的地区集合
     */
    function resultData(product, region) {
        var resList = [];
        var localDataList = getData();
        var sourceDataList = ife31data_1.default.concat();
        product.forEach(function (pItem) {
            var pList = localDataList.filter(function (item) {
                return item.product === pItem;
            });
            region.forEach(function (rItem) {
                var rList = pList.filter(function (item) {
                    return item.region === rItem;
                });
                if (rList.length > 0) {
                    rList.forEach(function (item) {
                        resList.push(item);
                    });
                    sourceDataList.forEach(function (item, index) {
                        if (item.product === pItem && item.region === rItem) {
                            sourceDataList.splice(index, 1);
                        }
                    });
                }
            });
        });
        sourceDataList.forEach(function (item) {
            var filterRes = product.some(function (dataItem) {
                return dataItem === item.product;
            }) && region.some(function (dataItem) {
                return dataItem === item.region;
            });
            if (filterRes) {
                resList.push(item);
            }
        });
        console.log('resList ---> ', resList);
        return resList;
    }
    exports.resultData = resultData;
    /**
     * 获取浏览器客户端存储的数据
     */
    function getData() {
        var local_data = localStorage.getItem('ife_table_data');
        return local_data === null ? [] : JSON.parse(local_data);
    }
});

//# sourceMappingURL=../maps/index/module_data.js.map
//# sourceMappingURL=../maps/index/module_data.js.map
