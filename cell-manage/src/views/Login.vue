<template>
  <div class="login">
    <el-form :model="logindata"
             :rules="rules"
             class="loginform"
             ref="loginForm"
             label-width="100px"
             size:mini>
      <el-form-item prop="accout">

        <el-input prefix-icon="iconfont icon-zhanghao"
                  placeholder="请输入内容"
                  v-model="logindata.accout"
                  autocomplete="off">

        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input @click.native="changeType"
                  :suffix-icon="isClose?'iconfont icon-yanjing1':'iconfont icon-yanjing-'"
                  :type="isClose?'password':'text'"
                  v-model="logindata.password"
                  @keydown.native.13="submitForm"
                  prefix-icon="iconfont  icon-mima"
                  autocomplete="off">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {PWD_REG,ACC_REG} from "@/utils/reg"

//引入帐号相关的接口文件
import  {checkLogin} from "@/api/account"
import { thistle } from 'color-name';
import Local from "@/utils/local"
import { getRole } from "@/api/account"

export default {
  data() {
    // 账号自定义验证
   const validateAcc=(rule,value,callback)=>{
     if(!value){
        callback(new Error("账号不能为空"))
     }else if(!ACC_REG.test(value)){
      callback(new Error('请输入4到16位（字母，数字，下划线，减号）的账号'))
     }else{
       callback();
     }
   }
  //  密码自定义验证
   const validatepwd=(rule,value,callback)=>{
    if(!value){
        callback(new Error("密码不能为空"))
     }else if(!PWD_REG.test(value)){
      callback(new Error('请输入4到16位（字母，数字，下划线，减号）的密码'))
     }else{
       callback();
     }
   }
    return {
      isClose: false,
      role:'',
      logindata: {
        accout: "",
        password: ""
      },
      rules: {
        accout: 
          {validator: validateAcc, required: true,  trigger: "blur" },
        
        password: {
         validator: validatepwd,  required: true,  trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid)=>{
        if(valid){
        let {code,token,role} =await checkLogin({
            account:this.logindata.accout,
            password:this.logindata.password
          });
          if(code==0){  // 弹出成功提示
              // 登录成功将后台给到的token保存到本地
              Local.set('token',token)
              // 将角色保存到本地
              Local.set('role',role)
              this.$router.push('/')
          }
       
        }else{
          return false;
        
        }

      })
    },
    changeType(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isClose = !this.isClose;
      }
    },
    // 拿到用户角色
     async getro(){
        let { role } =await  getRole();
        this.role=role;
         Local.set('role',this.role)
     
        }
  },
 
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginform {
    width: 460px;
    /deep/ .el-input {
      /deep/ .el-input__inner {
        border-left: none;
        background: transparent;
        border: 1px solid #aaa;
        color: #ffffff;
      }
    }

    /deep/.el-button--primary {
      width: 100%;
      height: 40px;
    }
  }
}
</style>