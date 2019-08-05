
export function getEle(parentNode: Document | Element, selector: string) {
    return parentNode.querySelectorAll(selector)
}

// 定义用来渲染表格的数据的格式
export interface dataFormat {
    product: string,
    region: string,
    sale: number[]
}

// 定义checkbox所选择的数据的展示格式
export interface checkVal {
    region: string[],
    product: string[]
}

