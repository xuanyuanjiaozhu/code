<template>
  <div id="Chart"></div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Chart',
    data () {
      return {}
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        let width = 300
        let height = 300
        let svg = d3.select('#Chart').append('svg').attr('width', width).attr('height', height)
        var dataset = [250, 210, 170, 130, 90]
        var rectHeight = 25
        svg.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('x', 20)
          .attr('y', function (d, i) {
            return i * rectHeight
          })
          .attr('width', function (d) {
            return d
          })
          .attr('height', rectHeight - 5)
          .attr('fill', 'steelblue');
          // svg.selectAll("rect")   //选择svg内所有的矩形
        // .data(dataset)  //绑定数组
        // .enter()        //指定选择集的enter部分
        // .append("rect") //添加足够数量的矩形元素
        //   .attr("fill","steelblue");
      }
    }

  }
</script>

<style scoped>

</style>
