<template>
    <div class="home">
        <div class="top">
            <div v-for="(item,i) in countdata"
                 :key="i"
                 class="btntitle">
                <div :class="item.icon"
                     style="font-size:60px;"></div>
                <div class="totalcount">
                    <p class="total1">{{item.titile}}</p>
                    <p class="total2">{{item.money}}</p>
                </div>
            </div>
        </div>
        <Chart :options="options" />
    </div>
</template>

<script>
import Chart from "@/components/Chart/Chart.vue"
import { orderDatas } from "@/api/homedata"  

export default {
  components:{
        Chart
    },
  data() {
    return {

      countdata: [
        { icon: "el-icon-document", titile: "总订单", money: "" },
        { icon: "el-icon-money", titile: "总销售金额", money: "" },
        { icon: "el-icon-present", titile: "今日订单数", money: "" },
        { icon: "el-icon-set-up", titile: "今日销售额", money: "" }
      ],
    //   传配置数据
      options:{
          titile:"数据统计",
          legend:["订单", "销售额"],
          xData:[],
          series:[]

      }
    }
  },
  methods:{
     async fetData(){
          // 发送请求
     let {
        //  卡片数据
        totalOrder,
        totalAmount,
        todayOrder,
        totayAmount,
        //报表数据
        xData,
        orderData,
        amountData
     }=await orderDatas();
     let arr=[ totalOrder,totalAmount,todayOrder,totayAmount];
     arr.forEach((v,i)=>{
         this.countdata[i].money=v;
     })

    //  把后台接受到的数据赋值
    this.options.xData=xData;
    this.options.series= [
                    {
                        name: '订单',
                        type: 'line',
                        stack: '总量',
                        data: orderData
                    },
                    {
                        name: '销售额',
                        type: 'line',
                        stack: '总量',
                        data: amountData
                    },
    
                ]
      }
     
  },
 created(){
    //  获取后端接口数据
    // console.log('接收数据')
    this.fetData()

  }
 
};
</script>

<style lang="less" scoped>
.home {
  padding: 15px;
}
.top {
  display: flex;
  justify-content: space-around;

  .btntitle {
    background-color: #ffff;
    flex: 1;
    display: flex;
    justify-content: space-around;
    margin-left: 20px;
    padding: 5px 20px 5px 30px;
    .el-icon-document {
      color: #1497db;
    }
    .el-icon-money {
      color: #d73383;
    }
    .el-icon-present {
      color: #1296db;
    }
    .el-icon-set-up {
      color: #30fa3e;
    }
    .totalcount {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #30fa3e;
      .total1 {
        color: orange;
        font-weight: bold
      }
      .total2 {
        font-weight: bold;
        
      }
    }
  }
}
</style>