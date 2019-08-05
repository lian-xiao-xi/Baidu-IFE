import sourceData from '../common/ife31data'
import {dataFormat} from '../common/common'

/**
 * 获取用来渲染表格的数据
 * @param product checkbox所选的产品种类集合
 * @param region checkbox所选择的地区集合
 */
export function resultData(product: string[], region: string[]): dataFormat[] {
  let resList: dataFormat[] = [];
  let localDataList = getData();
  let sourceDataList = sourceData.concat();

  product.forEach((pItem) => {
    let pList = localDataList.filter((item) => {
      return item.product === pItem;
    });
    region.forEach((rItem) => {
      let rList = pList.filter((item) => {
        return item.region === rItem;
      });
      if(rList.length>0) {
        rList.forEach((item) => {
          resList.push(item)
        });
        sourceDataList.forEach((item,index) => {
          if(item.product === pItem && item.region === rItem) {
            sourceDataList.splice(index, 1);
          }
        });
      }
    })
  })

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
  console.log('resList ---> ', resList)
  return resList;
}

/**
 * 获取浏览器客户端存储的数据
 */
function getData(): dataFormat[] {
  let local_data = localStorage.getItem('ife_table_data')
  return local_data === null ? [] : JSON.parse(local_data);  
}
