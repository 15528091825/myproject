<template>
    <div class="datacount">
        <div ref="echardiv" id='echarts'
             style="width: 800px;height:350px;"></div>

    </div>
</template>

<script>
import { orderGetData } from "@/api/homedata"
    export default {
        // 接受外部的数据
        props:{
            options:{
                type:Object,
                default:()=>{}
            }
        },
        methods:{
            // 初始化报表
            drawChart(){
                 //1获取节点
               this.myChart = this.echarts.init(this.$refs.echardiv);
                // 2绘制图表
               const option= {
                   title: {
                        text: this.options.title, // 1外部传入
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                   legend: {
                    data: this.options.legend, // 2外部传入
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.options.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series:this.options.series,
                };
                // 3生成报表
                console.log("生成了报表")
                // console.log(this.options)
                this.myChart.setOption(option);
            }
        },
       
         mounted() {
              
             
            // 调用初始化报表方法
            this.drawChart()
         } ,

        //  监听options的数据变化
        watch:{
            options:{
                handler(newVal, oldVal){
                  
                    // 使用新数据替换值
                    this.myChart.setOption({
                     titile: {
                            text: newVal.title, // 1外部传入
                        },
                       legend: {
                            data: newVal.legend, // 2外部传入
                        },
                        xAxis: {
                        
                            data: newVal.xData
                        },
                        series:newVal.series,
                    })
                },
                deep:true//深度监听

            }
        }
    }
</script>

<style lang="less" scoped>
.datacount {
  margin-top: 30px;
  background-color: #ffff;
  #echarts {
    margin: 0 auto;
    padding: 15px;
  }
}
</style>