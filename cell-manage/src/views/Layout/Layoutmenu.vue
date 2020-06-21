<template>
  <div class="left-menu">
    <h4>
      <img src="../../assets/imgs/cheers.svg"> 欢迎来到后台页面
    </h4>

    <el-menu router
             :default-active="activeindex"
             background-color="transparent"
             text-color="#ffffff"
             unique-opened>
      <template v-for="(item, i) in menus">
        <el-menu-item :index="item.path+'/'+item.children[0].path"
                       v-if="item.children && item.children.length===1" :key="i">
          <i :class="item.meta && item.meta.icon?item.meta.icon:item.children[0].meta.icon"></i>
          <span slot="title">
            {{
              item.meta && item.meta.title
              ?item.meta.title
              :item.children[0].meta.title
              }} 
            </span>
        </el-menu-item>

        <el-submenu :index="item.path"
                    v-if="item.children.length>1" :key="i">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="(itemtwo,ii) in item.children"
                        :key="ii"
                        :index="item.path+'/'+itemtwo.path">{{itemtwo.meta.title}}
          </el-menu-item>

        </el-submenu>

      </template>

    </el-menu>

  </div>
</template>

<script>
import { getRole } from "@/api/account"
import { getmenus }  from "@/router"
import Local from "@/utils/local"
  export default {
    data(){
      return{
        // 
      
         menus: [
        // {
        //   index: "1",
        //   icon: "iconfont icon-zhanghaoguanli2",
        //   title: "后台首页",
        //   path: "/home",
        //    twomenu:[]
        // },
        // {
        //   index: " 2",
        //   icon: "iconfont icon-dashijianguanli",
        //   title: "订单管理",
        //   path: "/order/list",
        //   twomenu: [
        //   ]
        // },
        // {
        //   index: "3",
        //   icon: "iconfont icon-jichuxinxi",
        //   title: "商品管理",
        //   path: "/goods",
        //   twomenu: [
        //     { index: "3-1", icon: "", title: "商品列表", path: "/goods/list" },
        //     { index: "3-2", icon: "", title: "添加商品", path: "/goods/add" },
        //     { index: "3-2", icon: "", title: "商品分类", path: "/goods/cate" }
        //   ]
        // },
        // {
        //   index: "4",
        //   icon: "iconfont icon-shujuguanli",
        //   title: "店铺管理",
        //   path: "/shop",
        //   twomenu: []
        // },
        // {
        //   index: "5",
        //   icon: "iconfont icon-zhanghaoguanli2",
        //   title: "账号管理",
        //   path: "/account",
        //   twomenu: [
        //     { index: "5-1", icon: "", title: "账号列表", path: "/account/list" },
        //     { index: "5-2", icon: "", title: "添加账号", path: "/account/add" },
        //     { index: "5-3", icon: "", title: "修改密码", path: "/account/passmodify" }
        //   ]
        // },
        // {
        //   index: " 6",
        //   icon: "iconfont icon-shijianqushifenxi",
        //   title: "销售统计",
        //   path: "/total",
        //   twomenu: [
        //     { index: "6-1", icon: "", title: "商品统计", path: "/total/goods" },
        //     { index: "6-2", icon: "", title: "订单统计", path: "/total/order" }
        //   ]
        // }
      ],
      }
    },
    computed:{
      // 激活页的处理,由于订单详情没有菜单,有页面,所以在详情页面也要有订单列表的激活
      activeindex(){
        if(this.$route.path==="/order/detail"){
          return  "/order/list"
        }
        return this.$route.path
      }
    },
    methods:{
     
    },
   
   async created(){
    //  接受参数
     getmenus();//重新获取函数，获取到菜单
    // 从本地取出菜单
      this.menus=Local.get('menus')
        // console.log('第二次的menus', this.menus)
      
  }
  
    
  }
</script>

<style lang="less" scoped>
.left-menu {
  flex: 0 0 200px;
  height: 100%;
  overflow-y: scroll;
  background-color: #2d3a4b;
  /*隐藏滚轮*/
  &::-webkit-scrollbar {
    display: none;
  }

  //  background-color: transparent;
  h4 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: white;
    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
  }
  .el-menu {
    border-right: none;
  }
  .iconfont {
    margin-right: 15px;
  }
}
</style>