<template>
  <div :style="{width:chart.width+'px',height:chart.height+'px'}" :id="chart.id"></div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "GaugeChart",
    props:['chart'],
    mounted() {

      var chartDom = document.getElementById(this.chart.id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        series: [
          {
            type: 'gauge',
            progress: {
              show: true,
              width: 18
            },
            axisLine: {
              lineStyle: {
                width: 18
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 25,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10
              }
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 80,
              offsetCenter: [0, '70%']
            },
            data: [
              {
                value: 80
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);

    }
  }
</script>

<style scoped>
  .chart {
    height: 500px;
    width: 500px;
  }
</style>
