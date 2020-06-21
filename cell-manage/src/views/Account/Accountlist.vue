<template>
  <div class="account-add">
    <Card>
      <span slot="title">帐号列表</span>
      <div class="content"
           slot="content">
        <el-table ref="accountTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <!-- 账号 -->
          <el-table-column label="账号"
                           prop="account"
                           width="180">

          </el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup"
                           label="用户组"
                           width="180">
          </el-table-column>
          <el-table-column prop="ctime"
                           label="创建时间"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="singleedit(scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="singledel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 这里是编辑的模态框 -->
        <el-dialog title="编辑账户信息"
                   :visible.sync="dialogVisible"
                   width="400px">
          <el-form :model="editData"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <!-- 编辑账号 -->
            <el-form-item label="账号"
                          prop="account"
                          ref="edits">
              <el-input v-model="editData.account"
                        autocomplete="off"></el-input>
            </el-form-item>
            <!-- 编辑用户组 -->
            <el-form-item label="用户组"
                          prop="userGroup">
              <el-select v-model="editData.userGroup"
                         placeholder="选择">
                <el-option label="超级管理员"
                           value="超级管理员"></el-option>
                <el-option label="普通管理员"
                           value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="saveedit">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[1, 3, 5, 10,20]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalpage">
        </el-pagination>

        <div class="btn">
          <el-button type="primary"
                     @click="batchdel">批量删除</el-button>
          <el-button type="danger"
                     @click="cancel">取消全选</el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>

// 引入卡片的组件
import Card from "@/components/Card/Card.vue"
// 引入account.js
import { accGet,accDel,accDelMuch ,accEdit} from "@/api/account"

// 引入moment
import moment from "moment"
import {PWD_REG,ACC_REG} from "@/utils/reg"


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
        pagesize:5,
        totalpage:0,
        currentPage4: 1,
        tableData: [],
        // 编辑账户
        editData: 
          {id:'',
          account:"",
          userGroup:'',
          ctime:''},
        rules:{
         account: [
          {validator: validateAccount, required: true, trigger: "blur" },
     
        ],
        password: {
         validator: validatePwd, required: true, trigger: "blur"
        },
        userGroup:{ required: true, message: "用户组必选", trigger: "change"}
        },
        // 控制模态框
        dialogVisible:false,
      }
    },

    methods: {
      // 获取数据
      async  getData(){
          let { data,total }=await accGet({
            currentPage:this.currentPage4,
            pageSize:this.pagesize,
          })
        // 判断当前的页面还有没有数据
        if(!data.length && this.currentPage4!==1){
          this.currentPage-=1;

        }
        data.forEach(v => {
          // moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
            v.ctime= moment(v.ctime).format('YYY-MM-DD hh:mm:ss')
        });
          // 赋值渲染
          this.tableData=data;
          this.totalpage=total

        },
      // 表格数据变动的方法
      handleChange(val) {
        this.$refs.accounttable = val;
        this.ids=val.map(row=>row.id)
        // console.log("这些数据：", this.ids)
        
      },
      // 分页数据
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize=val;
        this.getData();
      },
      //改变当前页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
         this.currentPage4=val;
        this.getData();
      },

      // 批量删除
      batchdel(){
        // console.log("这是要批量删除的id",this.ids)
        let ids=JSON.stringify(this.ids)
        this.$confirm("确认要删除这些帐号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async()=>{
         let {code, msg}=await accDelMuch({ids:ids});
         if(code==0){
          
                this.getData();
         }

      })
      .catch(()=>{
          this.$message({
                    type: "info",
                    message: "已取消删除"
                  });
         })

      },


      // 取消全选
      cancel(){
        // console.log(this.$refs.accountTable);
      this.$refs.accountTable.clearSelection();
      },


      // 删除单个
     async  singledel(row){
        // console.log("要删除的单个数据",row.id)
        let id=row.id;
         // 优化删除体验
      this.$confirm("确认删除该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async()=>{
         let {code, msg}=await accDel({id,id});
         if(code==0){
           
                this.getData();
         }

      })
      .catch(()=>{
          this.$message({
                    type: "info",
                    message: "已取消删除"
                  });
         })
       
        
      },


      // 单个编辑
     async singleedit(row){
          this.dialogVisible=true;
          this.editData={...row};

      },


      // 确认编辑时触发
    saveedit(){
      this.$refs.ruleForm.validate(async (valid)=>{
        // console.log(valid)
        if(valid){
             let { code, msg } = await accEdit(this.editData)
              if(code==0){
               
                      this.getData();
                    this.dialogVisible=false;
              }
    
        }else{
          this.$message.error('验证失败')
          return false;
        }
      })
    } 
},
// 在有data的时候发送ajax请求
    created(){
      // 调用函数获取
     this.getData();
    }
};
</script>

<style lang="less" scoped>
.account-add {
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 10px 20px;

  .box-card {
    .el-form {
      padding: 20px 15px;
    }
    .el-pagination {
      margin-top: 20px;
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>