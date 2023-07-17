<template>
    <div :style="{width:chart.width+'px',height:chart.height+'px'}" :id="chart.id">
    </div>
</template>

<script>
  import * as echarts from 'echarts'
    export default {
        name: "LineChart",
      props:['chart'],
      mounted() {
        var chartDom = document.getElementById(this.chart.id);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        };
        option && myChart.setOption(option);
      }
    }
</script>

<style scoped>
.chart{
  height: 500px;
  width: 500px;
}
</style>
