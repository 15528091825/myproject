<template>
  <div class="goodsadd">
    <Card>
      <span slot="title">
        添加商品
      </span>
      <div slot="content">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 size="mini"
                 class="demo-ruleForm">

          <el-form-item label="商品名称"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类"
                        prop="category">
            <el-select v-model="ruleForm.category"
                       placeholder="请选择商品分类">
              <el-option v-for="(item,i) in catedata"
                         :key="i"
                         :label="item.cateName"
                         :value="item.cateName"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="商品图片">
            <el-upload :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                       class="avatar-uploader  sssupload"
                       action="http://127.0.0.1:5000/goods/goods_img_upload">
              <img v-if="ruleForm.imgUrl"
                  
                   :src="baseImgUrl + '/'+ruleForm.imgUrl"
                   class="avatar" prop="imgUrl" />

              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>

          <el-form-item label="商品价格"
                        prop="price">
            <el-input-number v-model="ruleForm.price"
                             @change="handleChange"
                             :min="1"
                             :max="1000000"
                             label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="商品描述"
                        prop="goodsDesc">
            <el-input type="textarea"
                      v-model="ruleForm.goodsDesc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">添加商品</el-button>

          </el-form-item>
        </el-form>
      </div>
    </Card>

  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue"
// import { getEnabledCategories } from 'trace_events';
import { cateAll,goodsAdd } from '@/api/goods';

export default {
    // 注册组件
  components:{
    Card
  },
  data() {
    return {
        baseImgUrl:"http://127.0.0.1:5000/upload/imgs/goods_img",
      // 设置后台图片前缀
    
    // 所有的商品分类
      catedata:[],
      ruleForm: {
        name: "",
        category: "",
        price:'',
        goodsDesc: "",
        imgUrl:''
      
      },
     
      rules: {
        name: 
          { required: true, message: "请输入商品名称", trigger: "blur" },
        
        category:
          { required: true, message: "请选择商品分类", trigger: "change" },
       
        price: 
          { required: true, message: "请填写价格", trigger: "change" },
       
        goodsDesc: 
          { required: true, message: "请填写商品描述", trigger: "blur" },
     
        imgUrl: 
          { required: true, message: "图片必传", trigger: "blur" },
       
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
        // 发送添加商品
        let data=this.ruleForm;
      
        let { code }=await goodsAdd(data);
          if(code===0){
            // 跳转到列表也
            this.$router.push('/goods/list')
          }
        } else {
         this.$message.error('验证失败')
        }
      });
    },
    // 重置表单啊
    resetForm(formName) {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    // 图片上出的处理
    handleAvatarSuccess(res, file) {
        let{code,msg,imgUrl}=res
      // console.log(res)
        if(code==0){
          // 将成功的url地址
           this.ruleForm.imgUrl=imgUrl
          //  console.log( this.imgUrl)
             this.$message({
            type:"success",
            message:msg
          })
        }else{
          this.$message.error(msg)
        }
       
      },
  //  图片上传前的处理
    beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
    // 多图删除处理
    handleRemove(file, fileList) {
        // console.log(file.response.imgUrl);
       this.imgUrl.splice((this.imgUrl.indexOf(file.response.imgUrl)),1)
     
      },
      // 图片预览
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    
   async created(){
     let {categories}=await cateAll()
    //  console.log(categories)
      if(categories){
       this.catedata=categories;
      }
    }
   

    
  
};

</script>

<style lang="less" scoped>
.goodsadd {
  margin: 20px;
  width: 100%;
  padding: 10px;
  //   height: 100%;
  background-color: #ffffff;
  text-align: left;
  p {
    height: 40px;
    line-height: 40px;
  }
  .element.style {
    margin-right: 0px !important;
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-input {
    width: 300px;
  }
  .el-textarea {
    width: 300px;
  }
}
</style>