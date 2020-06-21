<template>
  <div class="goodsadd">

    <el-tabs type="border-card">
      <el-tab-pane label="店铺信息">
        <el-form :model="ruleForm"
                 disabled
                 ref="ruleForm"
                 label-width="80px"
                 size="mini"
                 class="demo-ruleForm">

          <el-form-item label="店铺名称"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="店铺公告"
                        prop="bulletin">
            <el-input type="textarea"
                      v-model="ruleForm.bulletin"></el-input>
          </el-form-item>

          <el-form-item label="店铺头像">
            <img :src="baseUrl+'/'+ruleForm.avatar"
                 alt="">
          </el-form-item>
          <el-form-item label="店铺图片">
            <img v-for="(item,v) in ruleForm.pics"
                 :key="v"
                 :src="baseUrl+'/'+item"
                 alt="">
          </el-form-item>

          <el-form-item label="配送费"
                        prop="deliveryPrice">
            <el-input v-model="ruleForm.deliveryPrice"></el-input>
          </el-form-item>

          <el-form-item label="配送时间"
                        prop="deliveryTime">
            <el-date-picker v-model="ruleForm.deliveryTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right">
            </el-date-picker>

          </el-form-item>
          <el-form-item label="配送描述"
                        prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="店铺评分"
                        prop="score">
            <el-input v-model="ruleForm.score"></el-input>
          </el-form-item>

          <el-form-item label="销量"
                        prop="sellCount">
            <el-input v-model="ruleForm.sellCount"></el-input>
          </el-form-item>

          <el-form-item label="活动"
                        prop="supports">
            <el-checkbox-group v-model="ruleForm.supports">
              <el-checkbox label="在线支付满28减5"
                           name="supports"></el-checkbox>
              <el-checkbox label="VC无限量果汁全场8折"
                           name="supports"></el-checkbox>
              <el-checkbox label="单人精彩套餐"
                           name="supports"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"
                           name="supports"></el-checkbox>
              <el-checkbox label="单人特色套餐"
                           name="supports"></el-checkbox>

            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="营业时间"
                        prop="date">

            <el-date-picker v-model="ruleForm.date"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            range-separator="至"
                            end-placeholder="结束日期"
                            placeholder="选择时间范围"
                            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>

          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改店铺">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="80px"
                 class="demo-ruleForm">

          <el-form-item label="店铺名称"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="店铺公告"
                        prop="bulletin">
            <el-input type="textarea"
                      v-model="ruleForm.bulletin"></el-input>
          </el-form-item>

          <el-form-item label="店铺头像">
              <el-upload class="avatar-uploader"
                       action="http://127.0.0.1:5000/shop/upload"
                     
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                     
                      >
             
               <img :src="baseUrl+'/'+ruleForm.avatar"
                 alt="">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
           
          </el-form-item>

          <el-form-item label="店铺图片">

            <el-upload class="avatar-uploader"
                       action="http://127.0.0.1:5000/shop/upload"
                       list-type="picture-card"
                       :on-success="handleAvatarSuccess1"
                       :before-upload="beforeAvatarUpload"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :file-list="fileList">
              <!-- <img v-if="ruleForm.pics"
                   v-for="(item,i) in ruleForm.pics"
                   :key="i"
                   :src="baseUrl+'/'+item"
                   class="avatar"> -->

              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>

          </el-form-item>

          <el-form-item label="配送费"
                        prop="deliveryPrice">
            <el-input v-model="ruleForm.deliveryPrice"></el-input>
          </el-form-item>

          <el-form-item label="配送时间"
                        prop="deliveryTime">
                           <el-input v-model="ruleForm.deliveryTime"></el-input>
            <!-- <el-date-picker v-model="ruleForm.deliveryTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right">
            </el-date-picker> -->

          </el-form-item>
          <el-form-item label="配送描述"
                        prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="店铺评分"
                        prop="score">
            <el-input v-model="ruleForm.score"></el-input>
          </el-form-item>

          <el-form-item label="销量"
                        prop="sellCount">
            <el-input v-model="ruleForm.sellCount"></el-input>
          </el-form-item>

          <el-form-item label="活动"
                        prop="supports">
            <el-checkbox-group v-model="ruleForm.supports">
              <el-checkbox label="在线支付满28减5"
                           name="supports"></el-checkbox>
              <el-checkbox label="VC无限量果汁全场8折"
                           name="supports"></el-checkbox>
              <el-checkbox label="单人精彩套餐"
                           name="supports"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"
                           name="supports"></el-checkbox>
              <el-checkbox label="单人特色套餐"
                           name="supports"></el-checkbox>

            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="营业时间"
                        prop="date">
            <el-date-picker v-model="ruleForm.date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>

          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue"
import {shoppInfo,shopEdit} from "@/api/shop"

export default {
  components:{
Card
  },
  // 卡片组件
  data() {
    return {
      // 图片列表
      fileList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl:'',
       baseUrl:"http://127.0.0.1:5000/upload/shop/",
      ruleForm: {
        name: "",
        bulletin:'',
        avatar:'',
        pics:[],
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        date: [],
        supports: [],
      },
      rules: {
       
        name: {required: true, message: "请输入商品名称", trigger: "blur" },
        supports:{ required: true,message: "请至少选择一个商品特色",trigger: "change"},
        bulletin: {  required: true, message: "请选择是否促销", trigger: "change" },
        deliveryPrice: {required: true, message: "请选择配送费", trigger: "blur" },
        deliveryTime: {required: true, message: "请选择配送时间", trigger: "blur" },
        description: {required: true, message: "请选择商品描述", trigger: "blur" },
        score: {required: true, message: "评分必填", trigger: "blur" },
        sellCount: {required: true, message: "销量必填", trigger: "blur" },
        date: {required: true, message: "营业时间必填", trigger: "change" },
      }
    };
  },
  methods: {
    // 修改店铺信息
    submitForm(formName) {
        
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
        //  提交修改的接口
        let data=this.ruleForm;
        data.date= JSON.stringify(data.date);
        data.supports=JSON.stringify(data.supports);
        data.pics= JSON.stringify(data.pics);
     
        let { code,msg } =await shopEdit(data);
          if(code===0){
            // 获取店铺性息
            this.getinfo();
            location.reload() 
          }
        } else {
          this.$message.error('验证失败')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(value) {
      // console.log(value);
    },
    // 获取店铺性息
   async getinfo(){
     let {data}=await shoppInfo();
     console.log(data)
     if(data){
       this.ruleForm=data;
       let arr=[];
        data.pics.forEach((v) => {
        arr.push({
          name: v,
          url: this.baseUrl + v,
        });
      });
      this.fileList = arr;
     }
    },
    // 处理图片上传
    handleAvatarSuccess(res){
       let{code,msg,imgUrl}=res
      // console.log(res)
        if(code==0){
          // 将成功的url地址
           this.ruleForm.avatar=imgUrl
             this.$message({
            type:"success",
            message:msg
          })
        }else{
          this.$message.error(msg)
        }
    },
    beforeAvatarUpload(file){
      // const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
     
    },
     // 处理图片上传
    handleAvatarSuccess1(res,file){
       let{code,msg,imgUrl}=res
      // console.log(res,file)
        if(code==0){
          // 将成功的url地址
           this.ruleForm.pics.push(imgUrl)
             this.$message({
            type:"success",
            message:msg
          })
        }else{
          this.$message.error(msg)
        }
    },
  // 删除图片
    handleRemove(file) {
        //  获取到被删除的图片给删掉
         this.ruleForm.pics.splice(this.ruleForm.pics.indexOf(file),1)
          // console.log( this.ruleForm.pics);
      },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }
  },
  created(){
     // 获取店铺性息
    this.getinfo();

  }
};
</script>

<style lang="less" scoped>
.goodsadd {
  margin: 20px;
  // width: 100%;
  padding: 10px;
  height: 100%;
  background-color: #ffffff;
  text-align: left;

  img {
    width: 150px;
    height: 150px;
  }
  .el-input {
    width: 400px;
  }
  .el-textarea {
    width: 400px;
  }

  .element.style {
    margin-right: 0px !important;
  }
  /deep/.avatar-uploader {
    .el-upload--text {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  /deep/.el-upload--picture-card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
}
</style>