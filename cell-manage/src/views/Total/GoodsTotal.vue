<template>
    <div class="order-total">
        <div class="header">
            <span>时间范围</span>
            <el-time-picker is-range
                            arrow-control
                            v-model="value2"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
            </el-time-picker>
            <el-button type="primary">查询</el-button>
        </div>

        <div class="content">
            <div id="echarts"
                 style="width: 700px;height:350px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
         data() {
      return {
        value1: "开始时间",
        value2: "结束时间",
       
      };
    },
          //引入echarts
  mounted() {
    var dom = document.getElementById("echarts");
    var myChart = this.echarts.init(dom);
    // 绘制图表
    myChart.setOption({
      title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    });
  }
    }
</script>

<style lang="less" scoped>
.order-total{
    height: 100%;
    .header{
        background: #F0F2F5;
        padding-bottom: 20px;
        span{
            margin-right: 15px;
        }
        .el-date-editor{
            margin-right: 15px;
        }
       
    }
    .content{
        padding:15px 50px;
    }
    
}

</style>