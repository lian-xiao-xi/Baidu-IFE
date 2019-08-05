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
        product.forEach(function (pItem) {
            var pList = ife31data_1.default.filter(function (item) {
                return item.product === pItem;
            });
            region.forEach(function (rItem) {
                var rList = pList.filter(function (item) {
                    return item.region === rItem;
                });
                rList.forEach(function (item) {
                    resList.push(item);
                });
            });
        });
        // sourceData.forEach((item) => {
        //   let filterRes = product.some(dataItem => {
        //     return dataItem === item.product
        //   }) && region.some(dataItem => {
        //     return dataItem === item.region
        //   })
        //   if (filterRes) {
        //     resList.push(item)
        //   }
        // });
        console.log(resList);
        return resList;
    }
    exports.resultData = resultData;
});

//# sourceMappingURL=../maps/index/module_data.js.map
