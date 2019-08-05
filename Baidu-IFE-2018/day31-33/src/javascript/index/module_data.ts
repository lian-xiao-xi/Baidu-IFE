import sourceData from '../common/ife31data'
import {getEle, dataFormat, checkVal} from '../common/common'

/**
 * 获取用来渲染表格的数据
 * @param product checkbox所选的产品种类集合
 * @param region checkbox所选择的地区集合
 */
export function resultData(product: string[], region: string[]): dataFormat[] {
  let resList: dataFormat[] = [];
  
  product.forEach((pItem) => {
    let pList = sourceData.filter((item) => {
      return item.product === pItem;
    });
    region.forEach((rItem) => {
      let rList = pList.filter((item) => {
        return item.region === rItem;
      });
      rList.forEach((item) => {
        resList.push(item)
      })
    })
  })

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

  console.log(resList)
  return resList;
}
