<template>
    <div class="order-detail">

        <div>
            <span>订单id:
                <span class="text">{{detaildata.id}}</span>
            </span>
            <el-divider></el-divider>
            <span>订单号:
                <span class="text">{{detaildata.orderNo}}</span>
            </span>
            <el-divider></el-divider>
            <span>下单时间:
                <span class="text">{{detaildata.orderTime}}</span>
            </span>
            <el-divider></el-divider>
            <span>联系电话:
                <span class="text">{{detaildata.phone}}</span>
            </span>
            <el-divider></el-divider>
            <span>收货人:
                <span class="text">{{detaildata.consignee}}</span>
            </span>
            <el-divider></el-divider>
            <span>送货地址:
                <span class="text">{{detaildata.deliverAddress}}</span>
            </span>
            <el-divider></el-divider>
            <span>送达时间:
                <span class="text">{{detaildata.deliveryTime}}</span>
            </span>
            <el-divider></el-divider>
            <span>备注:
                <span class="text">{{detaildata.remarks}}</span>
            </span>
            <el-divider></el-divider>
            <span>订单金额:
                <span class="text">{{detaildata.orderAmount}}</span>
            </span>
            <el-divider></el-divider>
            <span>订单状态:
                <span class="text">{{detaildata.orderState}} </span>
            </span>
            <el-divider></el-divider>

        </div>

    </div>
</template>

<script>
import { detailOrder} from "@/api/order"

    export default {
        data(){
            return {
                detaildata:[],
            }

        },
      async  created(){
          
            let id=this.$route.query.id;
            if(!id){
                this.$message.error("请检查订单");
                return 
            }
            let {data}=await detailOrder({id:id});
            if(data){
                this.detaildata=data
                // console.log( this.detaildata)

            }
        }
    }
</script>

<style lang="less" scoped>
.order-detail {
  padding: 15px;
  .text{
      margin-left: 20px;
  }
}
</style>