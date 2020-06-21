/**
 * 报表相关的接口
 */

import req from "@/utils/request"; 
// 获取订单销售列表
export function orderDatas(){
    return req.get("/order/totaldata")
}
// 获取订单统计列表
export function orderGetData(params){
    return req.get("/order/ordertotal",params)
}