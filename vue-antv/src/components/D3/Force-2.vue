<template>
  <div id="Force-2">
    <div class="force-tip"
         :style="{'top':`${tipData.point.y}px`,'left':`${tipData.point.x}px`,'display':isShowTip?'block':'none'}">
      <ul>
        <li @click="analysis()">分析1</li>
        <li @click="analysis()">分析2</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Force-2',
    data () {
      return {
        svgSrc: '',
        tipData: {
          point: {x: 100, y: 100},
          data: null
        },
        isShowTip: false,
      }
    },
    mounted () {
      this.drawForce()
      // this.drawForce1()
    },
    methods: {
      drawForce () {
        //数据
        let nodesData = [{name: '桂林'}, {name: '广州'},
          {name: '厦门'}, {name: '杭州'},
          {name: '上海'}, {name: '青岛'},
          {name: '天津'}]

        let linksData = [{source: 0, target: 1}, {source: 0, target: 2},
          {source: 0, target: 3}, {source: 1, target: 4},
          {source: 1, target: 5}, {source: 1, target: 6}]

        //开始布局画图
        const width = 800
        const height = 600
        //初始化力学仿真器
        let simulation = d3.forceSimulation(nodesData)
          .force('link', d3.forceLink(linksData))
          .force('charge', d3.forceManyBody().strength(-1000))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .on('tick', ticked)
        var color = d3.scaleOrdinal(d3.schemeCategory10)
        console.log(color, 'color')

        let svg = d3.select('#Force-2')
          .append('svg')
          .attr('id', 'chart')
          .attr('width', width)
          .attr('height', height)

        //添加group
        let gWapper = svg.append('g')
          .attr('class', 'gWapper')
          .attr('cursor', 'pointer')

        //绘制连线
        let links = gWapper.append('g') //root
          .selectAll('line')  //dom
          .data(linksData)  //model
          .enter()
          .append('line')
          .attr('stroke', 'yellow')
          .attr('stroke-width', 1)

        //绘制节点
        let nodes = gWapper.append('g')
          .selectAll('circle')
          .data(nodesData)
          .enter()
          .append('circle')
          .attr('r', 20).attr('opacity', 0.5)
          .attr('fill', (d, i) => color(i))
          .call(d3.drag()
            .on('start', dragstart)
            .on('drag', dragged)
            .on('end', dragend)
          )

        //绘制文字
        let texts = gWapper.append('g')
          .selectAll('text')
          .data(nodesData)
          .enter()
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.3em')
          .text(d => d.name)
          .call(d3.drag()
            .on('start', dragstart)
            .on('drag', dragged)
            .on('end', dragend)
          )

        function dragstart (event, d) {
          if (!event.active) {
            simulation.alphaTarget(.2).restart()
          }
          d.fx = d.x
          d.fy = d.y
        }

        function dragged (event, d) {
          d.fx = event.x
          d.fy = event.y
        }

        function dragend (event, d) {
          if (!event.active) {
            simulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null
        }

        //
        //
        //
        // //虽然仿真系统会更新节点的位置(只是设置了nodes对象的x y属性)，但是它不会转为svg内部元素的坐标表示，这需要我们自己来操作
        function ticked () {
          links.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)

          nodes.attr('cx', d => d.x)
            .attr('cy', d => d.y)

          texts.attr('x', d => d.x)
            .attr('y', d => d.y)
            // .attr('dominant-baseline', 'middle') //middle  baseline hanging

        }

      }
    }

  }
</script>

<style scoped>

</style>
