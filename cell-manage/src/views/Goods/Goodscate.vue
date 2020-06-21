<template>
    <div class="goods-cate">
        <Card>
            <span slot="title"
                  class="header">
                <span>商品分类</span>
                <el-button type="primary"
                           @click="addcate"
                           size="mini">添加分类</el-button>
            </span>
            <div class="content"
                 slot="content">

                <el-table :data="tableData"
                          size="mini"
                          ref="datafo"
                          style="width: 100%">
                    <el-table-column label="序号">
                        <template slot-scope="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="分类名称"
                                     prop="cateName">

                        <template slot-scope="scope">

                            <el-input v-if="scope.row.edit"
                                      v-model="scope.row.cateName"></el-input>
                            <span v-else>{{ scope.row.cateName }}</span>
                        </template>

                    </el-table-column>
                    <el-table-column label="是否启用">
                        <template slot-scope="scope">

                            <el-switch v-model="scope.row.state"
                                       :active-value=1
                                       :inactive-value=0
                                       :disabled="!scope.row.edit"
                                       active-color="#13ce66"
                                       inactive-color="#71E2A3">

                            </el-switch>
                        </template>

                    </el-table-column>
                    <el-table-column align="center"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                       type="success"
                                       v-if="scope.row.edit"
                                       @click="complete(scope.$index, scope.row)">完成</el-button>

                            <el-button size="mini"
                                       v-else
                                       @click="hedit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini"
                                       type="danger"
                                       @click="del(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage4"
                               :page-sizes="[1, 3, 5, 10,20]"
                               :page-size="pagesize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="totalpage">
                </el-pagination>

                <!-- 模态框 -->
                <el-dialog title="添加分类"
                           :visible.sync="dialogVisible"
                           width="30%">
                    <el-form label-width="80px"
                             :model="cagedata"
                             :rules="rules"
                             ref="cageform"
                             >
                        <el-form-item label="分类名称">
                            <el-input v-model="cagedata.cateName"
                                      prop="cateName"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用">
                            <el-switch v-model="cagedata.state"
                                       active-color="#13ce66"
                                       inactive-color="#71E2A3"
                                     >
                            </el-switch>
                        </el-form-item>

                    </el-form>
                    <span slot="footer"
                          class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="addcatenow">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </Card>

    </div>
</template>

<script>
import Card from "@/components/Card/Card.vue"

import { cateAdd,listCate,cateEdit,cateDel } from '@/api/goods';

export default {
         // 注册组件
    components:{
        Card
    },
    data() {
        return {
            //模态框
        dialogVisible: false,
        // 是否编辑中
        edit:false,
        // 分页数据
        pagesize:5,
        totalpage:0,
        currentPage4:1,
        // 表格数据
        tableData: [],
        // 添加分类
         cagedata:{
                cateName:"",
                state:0
            },
          rules: {
                cateName: { required: true, message: "请输入分类名称", trigger: "blur" },
               
            }
       
        }
    },
    methods:{
        // 编辑
        hedit(index, row){
            // 给被编辑的这一行,添加个编辑中的状态
             this.tableData[index].edit=true;
            // 将被编辑的状态重新赋值给元数据 
            this.tableData=[...this.tableData];
            // console.log(this.tableData)
            this.cagedata={...row};
            // console.log(this.cagedata) 
        },

    
        // 编辑完成,掉接口,修改数据,重新渲染
       async complete(index, row){
             // 给被编辑的这一行,添加个编辑中的状态
             this.tableData[index].edit=false;
            let data={... this.tableData[index]}
            let {code,msg}=await cateEdit({
                id: data.id,
                cateName: data.cateName,
                state: data.state?true:false,//后台要的是布尔值!!!!
            });
          
            if(code===0){
                // 重新获取数据渲染
                 this.getcatelist()
            }
          
        },
        // 删除数据
       async del(index, row){
        // console.log('这是要删除的数据',row.id) 
        let { code,msg}=await cateDel({id:row.id})
            if(code==0){
                // 重新获取数据渲染
                  this.getcatelist()
            }
        },
         // 分页数据
        handleSizeChange(val) {
          this.pagesize=val;
             this.getcatelist()
        },
        //改变当前页
        handleCurrentChange(val) {
           this.currentPage4=val;
           this.getcatelist()
        },
        // 添加分类,出现模态框
        addcate(){
            this.dialogVisible=true;
        },
        // 添加分类，保存到数据库
        addcatenow(){
            this.$refs.cageform.validate( async valid => {
                if(valid){
                    let { code,msg }=await cateAdd({
                        cateName:this.cagedata.cateName,
                        state:this.cagedata.state,
                    })
                    if(code==0){
                        this.dialogVisible=false;
                        // 重新获取分类列表渲染
                        this.getcatelist();

                    }
                }else{
                    this.$message.error('验证失败')
                }
            })
           

        },
        // 获取分类列表
       async getcatelist(){
            // 获取分类列表
            let { code,msg ,data,total}=await listCate(
                {currentPage:this.currentPage4,
                pageSize:this.pagesize})
             
            if(total){
                this.tableData=data;
                this.totalpage=total;
                // console.log(this.tableData)
            }

        }
       
    },
  async  created(){
    //  获取分类列表
    this.getcatelist()
    }
         
        
}
</script>

<style lang="less" scoped>
.goods-cate {
  .header {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .content {
    //   分页
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>