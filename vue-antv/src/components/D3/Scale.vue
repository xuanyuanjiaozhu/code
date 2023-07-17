<template>
  <div id="Scale"></div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: 'Scale',
    mounted () {
      this.linear()
      this.ordinal()
    },
    methods: {
      linear () {
        let width = 400;
        let height = 300;
        let svg = d3.select('#Scale').append('svg').attr('width', width).attr('height', height);
        let dataset = [2.5, 2.1, 1.7, 1.3, 0.9];
        let linear = d3.scaleLinear().domain([0,d3.max(dataset)]).range([0,300]);
        let rectHeight = 25
        // let axis = d3.svg.axis().scale(linear).orient('bottom').ticks(7)

        let axis = d3.axisBottom().scale(linear).ticks(7);
        svg.append('g').attr("transform", "translate(" +20 + "," + 130 + ")").call(axis);
        svg.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('x', 20)
          .attr('y', function (d, i) {
            return i * rectHeight
          })
          .attr('width', function (d) {
            return linear(d)
          })
          .attr('height', rectHeight - 5)
          .attr('fill', 'steelblue');
      },
      ordinal () {
        var index = [0, 1, 2, 3, 4];
        var color = ["red", "blue", "green", "yellow", "black"];
        var ordinal = d3.scaleOrdinal()
          .domain(index)
          .range(color);
        console.log(ordinal(0)); //返回 red
        console.log(ordinal(2)); //返回 green
        console.log(ordinal(4)); //返回 black
      }
    }
  }
</script>

<style scoped>

</style>
