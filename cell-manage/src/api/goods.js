/**
 * 商品相关的接口
 */

import req from "@/utils/request"; 
// 添加分类
export function cateAdd(params){
    return req.post("/goods/addcate",params)
}
// 获取分类
export function listCate(params){
    return req.get("/goods/catelist",params)
}
// 修改分类
export function cateEdit(params){
    return req.post("/goods/editcate",params)
}
// 删除分类
export function cateDel(params){
    return req.get("goods/delcate",params)
}
// 16. 查询所有分类名称
export function cateAll(){
    return req.get("/goods/categories")
}
// 17. 商品图片上传接口
export function imgUpload(params){
    return req.post("/goods/goods_img_upload",params)
}
// 18. 添加商品
export function goodsAdd(params){
    return req.post("/goods/add",params)
}
// 19. 获取商品列表
export function goodsList(params){
    return req.get("/goods/list",params)
}

//  删除商品
export function delAdd(params){
    return req.get("/goods/del",params)
}
//  修改商品
export function goodsEdit(params){
    return req.post("/goods/edit",params)
}