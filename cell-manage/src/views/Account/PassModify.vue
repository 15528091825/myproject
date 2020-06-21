<template>
  <div class="account-add">
    <Card>
      <span slot="title"></span>

      <div slot="content">
        <el-form :model="logindata"
                 label-position="right"
                 :rules="rules"
                 ref="ruleForm"
                 size=small
                 inline-message
                 label-width="150px"
                 class="demo-ruleForm">
          <el-form-item label="密码"
                        prop="oldpwd">
            <el-input v-model="logindata.oldpwd"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="newpass">
            <el-input v-model="logindata.newpass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="checkPass">
            <el-input v-model="logindata.checkPass"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
// 引入组件
import Card from "@/components/Card/Card.vue"
import {PWD_REG} from "@/utils/reg"
import { cpwdOld, editPwd } from "@/api/account"
import { async } from 'q';
import Local from '@/utils/local';
export default {
  // 注册组件
  components:{
    Card
  },
  data() {
    // 旧密码的验证
    const validateOld= async (rule, value, callback)=>{
      if(!value){
         callback(new Error('请输入旧密码'));
      }else {
        // 有数据就发送到后台,验证就密码是否正确
         let {code,msg}=await cpwdOld({'oldPwd':value})
        if(code=="11"){
              callback(new Error('旧密码错误'));
        }else{
           callback();
        }
         
      }

    }
    // 新密码的自定义验证
    const validateNewPass=(rule, value, callback)=>{
      if(!value){
         callback(new Error('请输入新密码'));
      }else if(!PWD_REG.test(value)){
       callback(new Error('请输入4到16位（字母，数字，下划线，减号）的密码'));
      }else{
        //反向验证 如果确认密码有值，启动validateCheckPass的验证
        if(this.logindata.checkPass){
          this.$refs.ruleForm.validateField('checkPass')
        }
          callback();
      }

    }
    // 验证确认密码和设置的密码是否一致
    const validateCheckPass=(rule, value, callback)=>{
      if(!value){
         callback(new Error('请确定密码'));
     
      }else if(this.logindata.newpass!=value){
       callback(new Error('两次密码不一致'));
      }else{
          callback();
      }

    }
    // 新密码验证
    return {
        logindata: {
        oldpwd: "",
        newpass:'',
        checkPass: "",
       
      },
        rules: {
        oldpwd: 
          {validator: validateOld, required: true,trigger: "blur" },
        newpass: 
          {validator: validateNewPass, required: true,  trigger: "blur" },
        
        checkPass: {
         validator: validateCheckPass, required: true,  trigger: "blur"
        }
      }
    }
  },
  methods: {
    // // 验证旧密码是否正确
    // async  checkold(val){
    //   let {code,msg}=await cpwdOld({'oldPwd':val})
    //   if(code!="00"){

    //    return 0
    //   }else{
    //     return 1
    //   }
    // },

// 提交修改
    submitForm(formName) {
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
            // 发送添加帐号请求
              let {code,msg}= await editPwd({newPwd:this.logindata.newpass});
              if(code==0){
                   
                // 清空之前先清除本地的token
                Local.clear();
                // 跳转到列表页
                this.$router.push('/login')
              }
        } else {
          this.$message.error('验证失败')
        }
      });
    },
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
  p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eff1f7;
  }
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