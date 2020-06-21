import Vue from 'vue'
import VueRouter from 'vue-router'
 import Login from "@/views/Login.vue"
 import Layout from "@/views/Layout/Layout.vue"
 import Local from "@/utils/local"
Vue.use(VueRouter)

// 此处代码是解决在本页面点击跳转本页面的警示的代码
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}



export  const asyncRoutes = [
      // 登录
    {
        path: "/login",
        component: Login,
        visible: false
      },
    // 首页
    {
      path:'',
      component:Layout,
      redirect:'/home',
      visible: true,
       
      children:[
        {
          path:'home',
          meta:{title:"后台首页", icon: "iconfont icon-zhanghaoguanli2"},  
          component:()=>import('@/views/Home/Home.vue')
        },
      ]
    },
 
    // 店铺管理
    {
      path:'/shop',
      component:Layout,
      visible: true,
      redirect:'/home',
      children:[
        {
          path:'shop',
          meta:{title:"店铺管理", icon: "iconfont icon-shujuguanli"},  
          component:()=>import('@/views/Shop.vue')
        },
      ]
    },
    // 账户管理
    {
      path:'/account',
      component:Layout,
      meta:{title:"账户管理",roles: ['super', 'normal'], icon: "iconfont icon-zhanghaoguanli2"}, 
      redirect:'/account/add',
      visible: true,
      children:[
        {
          path:'add',
          meta:{title:"账户添加",roles: ['super']}, //超级管理员才有权限
          component:()=>import('@/views/Account/Accountadd.vue')
        },
        {
          path:'list',
          meta:{title:"账户列表",roles: ['super']}, //超级管理员才有权限
          component:()=>import('@/views/Account/Accountlist.vue')
        },
        {
          path:'passmodify',
          meta:{title:"账户修改"}, 
          component:()=>import('@/views/Account/PassModify.vue')
        },
        {
          path:'admin',
          meta:{title:"个人中心"}, 
          component:()=>import('@/views/Account/Admin.vue')
        },
      ]
    },
    // 商品管理
    {
      path:'/goods',
      component:Layout,
      redirect:'/goods/list',
      visible: true,
      meta:{title:"商品管理",icon: "iconfont icon-jichuxinxi"}, 
      children:[
        {
          path:'add',
          meta:{title:"商品添加"}, 
          component:()=>import('@/views/Goods/Goodsadd.vue')
        },
        {
          path:'list',
          meta:{title:"商品列表"}, 
          
          component:()=>import('@/views/Goods/Goodslist.vue')
        },
        {
          path:'cate',
          meta:{title:"商品分类"}, 
          
          component:()=>import('@/views/Goods/Goodscate.vue')
        },
      ]
    },


    // 订单管理
    {
      path:'/order',
      component:Layout,
      meta:{title:"订单管理",icon:"iconfont icon-dashijianguanli" }, 
      redirect:'/order/list',
      visible: true,
      children:[
        {
          path:'list',
          visible: true,
          meta:{title:"订单列表",}, 
          component:()=>import('@/views/Order/OrderList.vue')
        },
       
        {
          path:'detail',
          name:"detail",
          visible: false,
          meta:{title:"订单详情"}, 
          component:()=>import('@/views/Order/OrderDetail.vue')
        },
       
      ]
    },
    //统计
    {
      path:'/total',
      component:Layout,
      meta:{title:"统计汇总",roles:['super'],icon: "iconfont icon-shijianqushifenxi"}, //超级管理员才有权限
      redirect:'/total/goods',
      visible: true,
      children:[
        {
          path:'goods',
          meta:{title:"商品统计"}, 
          component:()=>import('@/views/Total/GoodsTotal.vue')
        },
        {
          path:'order',
          meta:{title:"订单统计"}, 
          component:()=>import('@/views/Total/OrderTotal.vue')
        },
       
      ]
    },

    // 404页面
    {
      path:'/error',
      component:()=>import('@/views/Error.vue'),
      visible: false
    
    },
    // 配置除了以上的路由,其他都返回了404
    {
      path:'*',
      redirect:'/error',
      visible: false
    },
    
  
]

const router = new VueRouter({
  routes:[
     // 登录
     {
      path: "/login",
      component: Login,
      visible: false
    },
      // 首页
      {
        path:'/',
        component:Layout,
        redirect:'/home',
        children:[
          {
            path:'/home',
            meta:{title:"后台首页"},  
            component:()=>import('@/views/Home/Home.vue')
          },
        ]
      },
  ]
 
})


import {hasPermission,filterRouter} from "@/utils/Perimission"

 export function getmenus(){
        // 将过滤出来的权限放到accessRoute里面
        let role=Local.get('role');
        //  console.log("获取到角色了",role)
        let accessRoute= filterRouter(asyncRoutes,role);
        //5 动态添加路由,会有bug,需要在退出的时候,刷新页面,防止重复加载
        router.addRoutes(accessRoute)

        // 6 过滤掉不用在菜单显示的权限路径
        let menus=accessRoute.filter(item=>{
        // 如果这个菜单有二级菜单,并且这个二级菜单的visible为显示,
        // 那么他的二级菜单就只展示visible为true的菜单
          if(item.children && item.children[0].visible){
            // 
            item.children=item.children.filter(v=>v.visible)
            }
        return item.visible
        })
        
       // 将菜单保存到本地
       Local.set('menus',menus);
      //  console.log('第一次的menus',menus)
 }

//  调用一次
getmenus();//调用函数添加路由
       

// 路由守卫
router.beforeEach((to,from,next)=>{
  // 判断是否有token令牌
  let isLogin=Local.get('token')?true:false;
  if(to.path=="/login"){
    next();//放行
  }else{
    if(isLogin){
      next();//放行
    }else{
      next('/login');//放行
    }
  }

})

export default router

