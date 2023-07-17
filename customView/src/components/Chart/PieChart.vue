<template>
  <div :style="{width:chart.width+'px',height:chart.height+'px'}" :id="chart.id"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "PieChart",
    props:['chart'],
    mounted() {
      var chartDom = document.getElementById(this.chart.id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'Email'},
              {value: 484, name: 'Union Ads'},
              {value: 300, name: 'Video Ads'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
