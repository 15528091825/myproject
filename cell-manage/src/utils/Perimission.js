/**
 * 
 *用来获取权限菜单 
 */
 // 判断有没有权限
export function hasPermission(route,role){
    if(route.meta && route.meta.roles){//有证明需要配置

      return route.meta.roles.includes(role);
    }else{//没有就不需要配置权限
      return true
    }

}

// 封装函数,把可以访问的路由过滤出来
export function filterRouter(asyncRoutes, role){
    //  console.log(asyncRoutes)
   let accessRoute = asyncRoutes.filter((item) => {
      if(hasPermission(item, role)){
      
       if(item.children && item.children.length){
         item.children=filterRouter(item.children,role)
       }
        return true
      }else{
        return false
      }
   })
   return  accessRoute
}