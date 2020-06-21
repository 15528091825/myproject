<template>
    <div class="order-list">
        <!-- 头部查询 -->
        <el-form :inline="true"
                 size="mini"
                 :model="formInline"
                 ref="formsearch"
                 class="demo-form-inline">
            <el-form-item label="订单号">
                <el-input v-model="formInline.orderNo"
                          placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
                <el-input v-model="formInline.consignee"
                          placeholder="收货人"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.phone"
                          placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="formInline.orderState"
                           placeholder="订单状态">
                    <el-option label="已受理"
                               value="已受理"></el-option>
                    <el-option label="派送中"
                               value="派送中"></el-option>
                    <el-option label="已完成"
                               value="已完成"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间">

                <el-date-picker v-model="formInline.date"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                range-separator="至"
                                end-placeholder="结束日期"
                                placeholder="选择时间范围"
                                :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
                <el-button type="primary"
                           @click="resetfrom">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 订单列表 -->
        <el-table :data="tableData"
                  border
                  size='mini'
                  style="width: 100%">
            <el-table-column fixed
                             prop="orderNo"
                             label="订单号"
                             width="100">
            </el-table-column>
            <el-table-column prop="orderTime"
                             label="下单时间"
                             width="220">
            </el-table-column>
            <el-table-column prop="phone"
                             label="手机号"
                             width="150">
            </el-table-column>
            <el-table-column prop="consignee"
                             label="收货人"
                             width="100">
            </el-table-column>
            <el-table-column prop="deliverAddress"
                             label="配送地址"
                             width="120">
            </el-table-column>
            <el-table-column prop="deliveryTime"
                             label="送达时间"
                             width="200">
            </el-table-column>
            <el-table-column prop="remarks"
                             label="用户备注"
                             width="80">
            </el-table-column>
            <el-table-column prop="orderAmount"
                             label="订单金额"
                             width="80">
            </el-table-column>
            <el-table-column prop="orderState"
                             label="订单状态"
                             width="120">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)"
                               type="text"
                               size="small">查看</el-button>
                    <el-button type="text"
                               @click="editform(scope.row)"
                               size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1, 3, 5, 10,20]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalpage">
        </el-pagination>

        <!--编辑的模态框  -->
        <el-dialog title="修改订单"
                   :visible.sync="dialogVisible"
                   width="40%">
            <!-- 修改的内容 -->
            <el-form :model="editdata"
                     :rules="rules"
                     ref="editdata"
                     label-width="80px"
                     label-position="left"
                     size="mini"
                     class="editform">

                <el-form-item label="订 单  号"
                              prop="orderNo">
                    <el-input v-model="editdata.orderNo"></el-input>
                </el-form-item>
                <el-form-item label="下单时间"
                              prop="orderTime">
                    <el-date-picker v-model="editdata.orderTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系点话"
                              prop="phone">
                    <el-input v-model="editdata.phone"></el-input>
                </el-form-item>
                <el-form-item label="收货人"
                              prop="consignee">
                    <el-input v-model="editdata.consignee"></el-input>
                </el-form-item>
                <el-form-item label="送货地址"
                              prop="deliverAddress">
                    <el-input v-model="editdata.deliverAddress"></el-input>
                </el-form-item>
                <el-form-item label="送达时间"
                              prop="deliveryTime">
            
                    <el-date-picker v-model="editdata.deliveryTime"
                                
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    placeholder="选择日期时间">
                    </el-date-picker>

                </el-form-item>
                <el-form-item label="备 注"
                              prop="remarks">
                    <el-input v-model="editdata.remarks"></el-input>
                </el-form-item>

                <el-form-item label="订单金额"
                              prop="orderAmount">
                    <el-input-number v-model="editdata.orderAmount"
                                     @change="handleChange"
                                     label="描述文字"
                                     class="pricetext"></el-input-number>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="editdata.orderState"    prop="orderState"
                               placeholder="请选择订单状态">
                        <el-option label="待配送"
                                   value="待配送"></el-option>
                        <el-option label="已送达"
                                   value="已送达"></el-option>
                        <el-option label="已完成"
                                   value="已完成"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="editorder">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { listOrder,editOrder,listOrderSearch} from "@/api/order"
import moment from "moment"
import { stringify } from 'querystring';
    export default {
        data(){
            return{
                val1:'',
                dialogVisible:false,
                // 头部查询数据
                formInline:{
                    orderNo:"",
                    consignee:'',
                    phone:'',
                    orderState:'',
                    date:[],
                },

                // 订单列表
                tableData: [],
                // 分页数据
                pagesize:5,
                totalpage:0,
                currentPage: 1, 
                // 订单修改数据
                editdata:{
                   deliveryTime:[],
                },
                rules: {
                    orderNo: { required: true, message: "订单号必填", trigger: "blur" },
                    orderTime: { required: true, message: "下单时间必填", trigger: "change" },
                    phone:  { required: true, message: "电话必填", trigger: "change" } ,
                    consignee: { required: true, message: "收货人必填", trigger: "blur" },
                    deliverAddress: { required: true, message: "送货地址必填", trigger: "blur" },
                    deliveryTime: { required: true, message: "送达时间必填", trigger: "blur" },
                    remarks: { required: true, message: "备注必填", trigger: "blur" },
                    orderAmount: { required: true, message: "订单金额", trigger: "blur" },
                    orderState: { required: true, message: "订单金额必填", trigger: "blur" },
                },
               
            }
        },
        methods:{
          
            // 查询
          async  onSubmit() {
               
                 let searchdata={
                   currentPage:1,
                   pageSize:this.pagesize,
                   orderNo:this.formInline.orderNo,
                   consignee:this.formInline.consignee,
                   phone:this.formInline.phone,
                   orderState:this.formInline.orderState,
                   date:JSON.stringify(this.formInline.date) ,
               }

                let {data,total}=await listOrderSearch(searchdata);
                if(total>0){
                    data.forEach(v=>{
                        v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss")
                        v.orderTime=moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss")
                    })
                   this.tableData=data
                   this.totalpage=total
                }else{
                    this.$message.error('暂时没有数据');
                    this.tableData=[]
                   this.totalpage=0
                }
             
            },
            //  查看详情
            handleClick(row) {
                // console.log(row.id);
                this.$router.push({ name: 'detail', query: { id: row.id }})
            },
           
            // 编辑打开订单修改页面
            editform(row){
                this.dialogVisible=true;
                this.editdata={...row};
                // console.log( this.editdata)
            },
            // 发送修改信息页面
            async editorder(){
                // 把送达时间的格式更改一下
                let {code,msg}=await editOrder(this.editdata);
                if(code===0){
                    this.dialogVisible=false
                    // 从新渲染订单
                    // 获取订单列表
                    this.getlist();
                    this.editdata={};
                }
                
            },
            // 重置查询
            resetfrom(){
                this.formInline={
                    orderNo:"",
                    consignee:'',
                    phone:'',
                    orderState:'',
                    date:[],
                }
            },
            // 
            handleChange(value){},
             // 分页数据
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize=val
                this.getlist();
            },
            //改变当前页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                 this.currentPage=val
                this.getlist();
            },
            // 获取订单列表
           async getlist(){
               let listdata={
                   currentPage:this.currentPage,
                   pageSize:this.pagesize,
                   orderNo:this.formInline.orderNo,
                   consignee:this.formInline.consignee,
                   phone:this.formInline.phone,
                   orderState:this.formInline.orderState,
                   date:JSON.stringify(this.formInline.date) ,
               }
             
                let { total,data}=await listOrder(listdata);
                if(total>0){
                    data.forEach(v=>{
                        v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss")
                        v.orderTime=moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss")
                    })
                   this.tableData=data
                   this.totalpage=total
                }else{
                    this.$message.error('暂时没有数据')
                }
            },
            
        },
        created(){
            // 获取订单列表
            this.getlist();
        }
        
    }
</script>

<style lang="less" scoped>
.order-list {
  padding: 15px;
  .el-table {
    /deep/ .cell {
      line-height: 20px;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  .editform {
    /deep/.el-input {
      width: 220px;
    }
    /deep/.pricetext {
      width: 150px !important;
      /deep/.el-input {
        width: 150px !important;
      }
    }
  }
}
</style>