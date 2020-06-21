/**
 * 帐号相关的接口
 */
// import req from "@/utils/request";
import req from "@/utils/request"; 
// 帐号登录
export function checkLogin(params){
    return req.post("/users/checkLogin",params)
}

// 帐号添加
export function accAdd(params){
    return req.post("/users/add",params)
}

// 获取帐号
export function accGet(params){
    return req.get("/users/list",params)
}


// 删除帐号
export function accDel(params){
    return req.get("/users/del",params)
}
// 批量删除帐号
export function accDelMuch(params){
    return req.get("/users/batchdel",params)
}
// 修改帐号
export function accEdit(params){
    return req.post("/users/edit",params)
}


// 检查旧密码
export function cpwdOld(params){
    return req.get("/users/checkoldpwd",params)
}

// 修改密码
export function editPwd(params){
    return req.post("/users/editpwd",params)
  
}

// 获取个人信息
export function getuserinfo(){
    return req.get("/users/info")
}
//修改头像
export function updateAvatar(params){
    return req.get("/users/avataredit",params)
}
//获取角色
export function getRole(){
    return req.get("/users/role")
}