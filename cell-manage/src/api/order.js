/**
 * 订单相关的接口
 */

import req from "@/utils/request"; 
// 获取列表
export function listOrder(params){
    return req.get("/order/list",params)
}
// 查询列表
export function listOrderSearch(params){
    return req.get("/order/search",params)
}
// 获取订单详情
export function detailOrder(params){
    return req.get("/order/detail",params)
}
// 修改订单
export function editOrder(params){
    return req.post("/order/edit",params)
}
