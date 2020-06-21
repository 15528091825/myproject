/**
 * 店铺管理相关的接口
 */

import req from "@/utils/request"; 
// 获取列表
export function shoppInfo(){
    return req.get("/shop/info")
}

// 修改列表
export function shopEdit(params){
    return req.post("/shop/edit",params)
}