<template>
  <div id="BoxChart">
    <p class="title">{{chartData.name}}</p>
<!--    BoxChart-->
<!--    <LineChart/>-->
<!--    <PieChart/>-->
<!--    <BarChart/>-->
<!--    <FunnelChart/>-->
<!--    <LineBarChart/>-->
<!--    <RadarChart/>-->
<!--    <GaugeChart/>-->
    <component :is="chartData.type" :chart="chartData"/>
  </div>
</template>

<script>
  import LineChart from '../Chart/LineChart';
  import PieChart from "../Chart/PieChart";
  import BarChart from '../Chart/BarChart';
  import FunnelChart from "../Chart/FunnelChart";
  import LineBarChart from "../Chart/LineBarChart";
  import RadarChart from "../Chart/RadarChart";
  import GaugeChart from "../Chart/GaugeChart";

  export default {
    name: "BoxChart",
    components: {LineChart,PieChart,BarChart,FunnelChart,LineBarChart,RadarChart,GaugeChart},
    props:['chartData'],
    data(){
      return{
        viewCom:''// chartData:this.$props.chartData
      }
    },
    mounted() {
      this.viewCom = this.chartData.type;
      console.log(this.chartData,'boxList')
    }
  }
</script>

<style scoped>
  #BoxChart{
    width: auto;
    height: auto;
    border: #eee 1px solid;
    margin: 5px;
  }
  .title{
    padding: 10px 0 0 10px;
  }

</style>
