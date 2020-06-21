<template>
  <div class="account-add">
    <Card>
      <span slot="title">
        添加账号
      </span>
      <div class="content"
           slot="content">
        <el-form :model="logindata"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 size=small
                 inline-message
                 class="demo-ruleForm">
          <el-form-item label="账号"
                        prop="account">
            <el-input type="text"
                      v-model="logindata.account"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="logindata.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组"
                        prop="userGroup">
            <el-select v-model="logindata.userGroup"
                       placeholder="请选择权限">
              <el-option label="超级管理员"
                         value="超级管理员"></el-option>
              <el-option label="普通管理员"
                         value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>

  </div>
</template>

<script>
// 引入卡片的组件
import Card from "@/components/Card/Card.vue"
import {PWD_REG,ACC_REG} from "@/utils/reg"
import {accAdd} from "@/api/account"
import { async } from 'q';
export default {
  // 注册组件
  components:{
    Card
  },
  data() {
    // 自定义账号验证
    const validateAccount=(rule, value, callback)=>{
      if(!value){
         callback(new Error('账号不能为空'));
      }else if(!ACC_REG.test(value)){
           callback(new Error('请输入4到16位（字母，数字，下划线，减号）的账号'));
      }else{
        callback();
      }
    }
    // 自定义密码验证
    const validatePwd=(rule, value, callback)=>{
      if(!value){
         callback(new Error('密码不能为空'));
      }else if(!PWD_REG.test(value)){
           callback(new Error('请输入4到16位（字母，数字，下划线，减号）的密码'));
      }else{
        callback();
      }
    }
    return {
         logindata: {
        account: "",
        password: "",
        userGroup:""
      },
        rules: {
        account: [
          {validator: validateAccount, required: true, trigger: "blur" },
     
        ],
        password: {
         validator: validatePwd, required: true, trigger: "blur"
        },
        userGroup:{ required: true, message: "用户组必选", trigger: "change"}
      }
    }
  },
  methods: {
    // 添加账号
    submitForm(formName) {
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
                // 发送添加帐号请求
              let {code}= await accAdd(this.logindata);
              if(code==0){
                    
                // 跳转到列表页
                this.$router.push('/account/list')
              }
        } else {
         this.$message.error("验证失败")
          return false;
        }
      });
    },
    // 重置账号
    resetForm(){
       // alert(1)
       this.$refs.ruleForm.resetFields();
    }
   
  }
};
</script>

<style lang="less" scoped>
.account-add {
  width: 100%;

  height: 100%;
  text-align: left;

  .el-form {
    padding: 20px 15px;
  }
  .element.style {
    margin-right: 0px !important;
  }
  /deep/.el-input {
    width: 200px;
  }
}
</style>