<template>
  <div class="main-header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,v) in crumbsdata"
                          :key="v"
                          :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="loginaccout">欢迎你，
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userData.account}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

      <el-avatar src="">
        <img :src="userData.imgUrl"
             style="">
      </el-avatar>
    </div>

  </div>
</template>

<script>
// 引入local
import Local from "@/utils/local"
import { getuserinfo } from "@/api/account"

  export default {
    data(){
      return{
        userData:{},
        // 面包屑数据
        crumbsdata:[]
      }
    },
     methods: {
      handleCommand(command) {
        if(command=="personal"){
          this.$router.push('/account/admin')
        // this.$message('click on item ' + command);
        }else{//退出登录
          // 清空local
          Local.clear();
          // 提示
          this.$message({
            type:"success",
            message:"退出成功"
          })
         
          // 跳转
          this.$router.push('/login')

           // 刷新页面
           location.reload();
        }
        
      },

      // 获取个人信息
      async getinfo(){
        let { accountInfo }= await getuserinfo();
        this.userData=accountInfo;
        // 把数据存到本地存储里面
        Local.set('info',this.userData)
        // console.log(this.userData)
      },

      // 计算面包屑
      clacrumbs(){
        // 遍历出 this.$route.matched拿到meta的title
          let arr = [{ title: "首页", path: "/home" }];
         
          this.$route.matched.forEach((v)=>{
            // 判断有没有title，防止没有子菜单的>显示出来
            if(v.meta.title){
            arr.push({title:v.meta.title,path:v.path})
            }
         })
          this.crumbsdata=arr;
        //  console.log(this.crumbsdata)
      }
     
    },
    // 有数据就发送axious
    created(){
      // 调用面包屑
      this.clacrumbs();
      this.getinfo();
      // 接受个人中心的修改头像的获取最新信息
        this.$bus.$on('savechangedata',()=>{
         this.getinfo();
        })

      // 
    },
    // 使用监听器监听菜单的变动
    watch:{
      // router.path有变动就
      "$route.path"(){
               this.clacrumbs();
          }
    }
   
    
  }
</script>

<style lang="less" scoped>
.main-header {
  width: 100%;
  flex: 0 0 60px;
  line-height: 60px;
  background-color: #336699;
  color: #ffffff;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
  .el-breadcrumb {
    height: 100%;
    line-height: 60px;
    /deep/ span {
      color: #ffffff;
    }
  }
  .loginaccout {
    font-size: 14px;
    .el-avatar {
      vertical-align: middle;
    }

    line-height: 60px;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>