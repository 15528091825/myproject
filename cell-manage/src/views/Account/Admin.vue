<template>
    <div class="admin">
        <Card>
            <span slot="title"> 管理员信息 </span>
            <div slot="content">
                <div>
                    <span>管理员ID:{{userdata.id}}</span>
                    <el-divider></el-divider>
                    <span>账号：{{userdata.account}}</span>
                    <el-divider></el-divider>
                    <span>用户组：{{userdata.userGroup}}</span>
                    <el-divider></el-divider>
                    <span>创建时间：{{userdata.ctime | filtertime}}</span>
                    <el-divider></el-divider>
                    <span>
                        <div class="text">管理员头像： 
                            <!-- <img 
                                 :src="userdata.imgUrl"
                                 class="defaultimg" /> -->
                                 </div>

                        <!-- 头像上传 -->
                        <el-upload :show-file-list="false"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload"
                                   class="avatar-uploader  sssupload"
                                   action="http://127.0.0.1:5000/users/avatar_upload">
                            <img v-if="imgUrl"
                                 :src="baseImgUrl + imgUrl"
                                 class="avatar" />
                           
                            <i v-else
                               class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                        <!-- 修改头像 -->
                        <el-button @click="changeAvatar"
                                   type="primary"
                                   size="mini">修改头像</el-button>
                    </span>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import Card from "@/components/Card/Card.vue"
import { updateAvatar } from "@/api/account"
import Local from "@/utils/local"
import moment from "moment"
import { Script } from 'vm';

    export default {
        components:{
            Card
        },
        data(){
            return{
                userdata:{
                    id:"",
                    account:"",
                    userGroup:"",
                    ctime:"",
                    imgUrl:""
                },
                // 设置图片上传的地址
                baseImgUrl:"http://127.0.0.1:5000/upload/imgs/acc_img/",
                imgUrl:""
            }
        },
        methods:{
            // 处理上传头像的方法
            handleAvatarSuccess(e){
                let { code, imgUrl, msg } = e;
                if(code===0){
                    this.$message({
                        type:"success",
                        message:"上传成功"
                    })
                    // 图片上传成功,回显图片
                    this.imgUrl=imgUrl
                }

            },
            // 处理上传头像前的设置方法
            beforeAvatarUpload(){   
            },
             // 修改头像的方法
           async changeAvatar(){

                let { code,msg }=await updateAvatar({'imgUrl':this.imgUrl})
                if(code===0){
                    // 使用bus中介调用兄弟,更改头部的图片
                    this.$bus.$emit('savechangedata',"women");
                }
             },
        }  ,  
            // 创建的时候就从本地获取用户信息
            created(){
            let userinfo=  Local.get('info');
            this.userdata=userinfo
            },

        // 过滤器处理时间
        filters:{
            filtertime(time){
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        },
     };
   
</script>

<style lang="less" scoped>
.admin {
  .content {
    .text {
      margin-bottom: 30px;
      .defaultimg{
          vertical-align: middle;
          width: 120px;
          height: 120px;
          border-radius: 50%;
      }
    }
    .el-button {
      margin-top: 20px;
    }
    .sssupload{
     border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 120px;
      height: 120px;;
    }
  
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>