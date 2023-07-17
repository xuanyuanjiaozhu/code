<template>
  <div :style="{width:chart.width+'px',height:chart.height+'px'}" :id="chart.id"></div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "BarChart",
    props:['chart'],
    mounted() {
      console.log(this.chart)
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };

      option && myChart.setOption(option);

    }
  }
</script>

<style scoped>
  /*.chart{*/
  /*  height: 500px;*/
  /*  width: 500px;*/
  /*}*/
</style>
