<template>
    <div class="order-total">
        <div class="header">
            <span class="head">时间范围</span>
            <el-form size="mini"
                     :model="formInline"
                     ref="formsearch"
                     class="inlineForm">
                <el-form-item>

                    <el-date-picker v-model="formInline.date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    placeholder="选择日期时间">
                    </el-date-picker>

                    <el-button type="primary"
                               @click="searchform">查询</el-button>
                </el-form-item>

            </el-form>
        </div>

        <Charts :options="options" />
    </div>
</template>

<script>
import Charts from "@/components/Chart/Chart.vue"
import { orderGetData } from "@/api/homedata"

import moment from "moment"
    export default {
        components:{
            Charts
        },
         data() {
                return {
                   formInline:{
                       date:[]
                   },
                //  准备echarts的数据
                    options:{
                        title:"订单统计",
                        legend:"订单金额",
                        xData:[],
                        series:[]
                    }
                }
         },
      methods:{
        //  点击查询
        searchform(){   
            this.getlistdata()

        },
        //  获取数据
        async  getlistdata(){
           let { data } = await orderGetData({
              date:this.formInline.date?JSON.stringify(this.formInline.date):JSON.stringify([])
           });
           if(data){
            //    x轴的数据
              this.options.xData= data.map(item=>{
                  return moment(item.orderTime).format('YYYY-MM-DD HH:mm')
              })
            //   y轴的数据
              let seriesdata=data.map(item=>{
                  return item.orderAmount
              })
              this.options.series= {
                        name: '订单',
                        type: 'line',
                   
                        data: seriesdata
                    }
                    // console.log(this.options)
           }
        },
    },
    // 初始化数据
    created(){
        this.getlistdata();
       
    },

  
}
</script>

<style lang="less" scoped>
.order-total {
  height: 100%;
  .header {
    background: #f0f2f5;
    padding: 20px;
    
    .el-date-editor {
      margin-right: 15px;
    }
    .inlineForm {
      margin-top: 20px;
    }
  }
  .content {
    padding: 15px 50px;
  }
}
</style>