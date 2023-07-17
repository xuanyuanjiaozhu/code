<template>
  <div>
    <div id="Force-4">
      <div class="force-tip"
           :style="{'top':`${tipData.point.y}px`,'left':`${tipData.point.x}px`,'display':isShowTip?'block':'none'}">
        <ul>
          <li v-for="item in analysisText" :key="item.id" @click="analysis(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <button @click="addNode">add</button>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Force-4',
    data () {
      return {
        analysisText: [
          {
            name: '事件一',
            id: '1'
          },
          {
            name: '事件二',
            id: '2'
          }
        ],
        svgSrc: require('../../assets/logo.png'),
        tipData: {
          point: {x: 100, y: 100},
          data: null
        },
        isShowTip: false,


      }
    },
    mounted () {
      this.drawForce()
    },
    methods: {
      drawForce () {
        //节点数据
        let nodesData = [
            {name: '北京', id: 0}, {name: '上海', id: 1},
            {name: '深圳', id: 2}, {name: '天津', id: 3},
            {name: '重庆', id: 4}, {name: '成都', id: 5},
            {name: '拉萨', id: 6}, {name: '哈尔滨', id: 7},
            {name: '西安', id: 8}, {name: '青岛', id: 9}]
        this.nodesData = nodesData;
        //关系数据
        let linksData = [
          {source: 0, target: 5, relation: '北京-成都', queueing: 1, ranking: 1},
          {source: 6, target: 5, relation: '拉萨-成都', queueing: 1, ranking: 1},
          {source: 7, target: 8, relation: '哈尔滨-西安', queueing: 1, ranking: 1},
          {source: 5, target: 8, relation: '北京-西安', queueing: 1, ranking: 1},
          {source: 8, target: 9, relation: '青岛-西安', queueing: 2, ranking: 1},
          {source: 9, target: 8, relation: '青岛-西安', queueing: 2, ranking: 2},
          {source: 0, target: 2, relation: '北京-深圳', queueing: 1, ranking: 1},
          {source: 1, target: 2, relation: '上海-深圳', queueing: 1, ranking: 1},
          {source: 3, target: 4, relation: '天津-重庆', queueing: 1, ranking: 1},
          {source: 2, target: 4, relation: '深圳-重庆', queueing: 1, ranking: 1},
          {source: 9, target: 0, relation: '青岛-北京', queueing: 1, ranking: 1}]
        this.linksData = linksData;
        //画布 宽,高
        let width = 800, height = 800
        //比例尺 （范围）
        let color = d3.scaleOrdinal(d3.schemeCategory10)
        let opacityScale = d3.scaleLinear() //线 透明度
        const linkParallelGap = 0 //连线 缩短差值
        //初始化力导向图
        let simulation = d3.forceSimulation(nodesData) //节点数据
          .force('link', d3.forceLink(linksData).distance(100)) //关系数据
          .force('charge', d3.forceManyBody().strength(-2000)) //作用力应用在所用的节点之间，当strength为正的时候可以模拟重力，当为负的时候可以模拟电荷力。
          .force('center', d3.forceCenter(width / 2, height / 2))
          .on('tick', ticked)
        this.simulation = simulation;

        //添加svg画布   设置画布 宽高 为画布设置ID
        let svg = d3.select('#Force-4')
          .append('svg') //添加 svg 画布
          .attr('id', 'chart') //为 svg 画布添加ID
          .attr('width', width) // 设置画布宽度
          .attr('height', height) // 设置画布高度
          .style('background', '#eee') // 设置画布颜色
          .on('click', () => { // 为画布绑定事件
            this.isShowTip = false // 操作 DOM 不显示
          })
          .call(zoom())

        //为画布设置group
        let gWapper = svg.append('g')
          .attr('class', 'gWapper') // 设置类名
          .attr('cursor', 'pointer') // 常用的有 pointer食指的，手default 箭头，crosshair 十字，progress 箭头和沙漏等等

        //绘制连线
        let links = gWapper.append('g') //添加绘制连接线模块
          .classed('licks', true)
          // .selectAll('line')
          .selectAll('path')
          .data(linksData) //添加连接线数据
          .enter()
          .append('g')
        // .append('line') // 添加绘制单线条的模块
        this.links = links;
        let linksPath = links.append('path') // 添加绘制多线条的模块
          .attr('id', (d, i) => `linkPath${i}`)
          .classed('link', true)
          .attr('stroke', '#000') //设置线条颜色
          .attr('stroke-width', 1) //设置线条宽度
          // .attr("marker-start","url(#arrow)")
          // .attr("marker-mid","url(#arrow)")
          .attr('marker-end', 'url(#arrow)')
          .attr('opacity', d => opacityScale(+d.number))
          .style('cursor', 'pointer') //设置鼠标 箭头样式
        // .on('mouseenter', (event, d) => {
        //   linkLabelEles.attr('opacity', item => {
        //     return item === d ? 1 : 0
        //   })
        //   linkEles.attr('opacity', item => {
        //     return item === d ? 1 : 0.3
        //   })
        // })
        // .on('mouseleave', () => {
        //   linkLabelEles.attr('opacity', 0)
        //   linkEles.attr('opacity', 1)
        // })
        this.linksPath = linksPath;
        let linksText = links.append('text')
          .classed('link-text', true)
          .text('1')
          .attr('text-anchor', 'middle')
          // .attr('opacity', 0)
          .style('pointer-events', 'none')   //让父元素可以穿透        //绘制节点
          .attr('font-size', '12px')
          .attr('color', '#eee')
          .attr('fill', '#eee')

        linksText.append('textPath')
          .attr('href', (d, i) => `#linkPath${i}`)
          .text(d => ellipse(d.relation, 8)) //设置文字)

          .attr('startOffset', '50%')
          .style('pointer-events', 'none')
          .attr('fill', '#000')
        this.linksText = linksText;

        let nodes = gWapper.append('g') //
          .selectAll('circle') //获取全部 circle 节点
          .data(nodesData) //添加节点
          .enter() //进入
          .append('circle') //添加 circle 标签节点
          .attr('r', 20) //设置园半径
          .attr('opacity', 1) // 设置透明度
          .attr('fill', (d, i) => color(i)) //设置填充色
          .call(
            d3.drag()
              .on('start', dragStart)
              .on('drag', dragGed)
              .on('end', dragEnd)
          )
          .on('click', (event, d) => {
            event.stopPropagation() // 阻止冒泡
            this.isShowTip = true
            this.tipData = {
              point: {x: event.offsetX, y: event.pageY},
              data: d
            }
          })
        this.nodes = nodes;

        //绘制文字
        let texts = gWapper.append('g')
          .selectAll('text')
          .data(nodesData)
          .enter()
          .append('text')
          .attr('text-anchor', 'middle') //基线位置
          .attr('dy', '0.3em') //偏离位置 dy  dx
          .text(d => d.name) //设置文字
          .call(
            d3.drag() //拖拽事件
              .on('start', dragStart)
              .on('drag', dragGed)
              .on('end', dragEnd)
          )
          .on('click', (event, d) => { //绑定事件
            event.stopPropagation() // 阻止冒泡
            this.isShowTip = true
            this.tipData = {
              point: {x: event.offsetX, y: event.pageY},
              data: d
            }
          })
        this.texts = texts;

        //拖拽开始
        function dragStart (event, d) {
          console.log(event, d, '拖拽开始')
          if (!event.active) {
            simulation.alphaTarget(.2).restart()
          }
          d.fx = d.x
          d.fy = d.y

        }

        //鼠标拖动
        function dragGed (event, d) {
          d.fx = event.x
          d.fy = event.y
        }

        //鼠标结束拖动
        function dragEnd (event, d) {
          if (!event.active) {
            simulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null
        }

        //设置字符串长度
        function ellipse (str, maxLength) {
          let s = String(str)
          return s.length > maxLength ? `${s.substring(0, maxLength)}...` : s
        }

        //重点：箭头
        let arrow = gWapper.append('defs')
          .append('marker')
          .attr('id', 'arrow')
          // .attr('markerUnits','strokeWidth')
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', 20)
          .attr('markerHeight', 20)
          // .attr('viewBox','0 0 12 22')
          .attr('refX', 10)
          .attr('refY', 4)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M0 0 L4 4 L0 8Z')
          .attr('fill', 'black')
          .attr('stroke', 'black')

        //初始化 绘制 内容
        function ticked () {
          nodes.attr('cx', d => d.x)
            .attr('cy', d => d.y)

          linksPath.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)

          texts.attr('x', d => d.x)
            .attr('y', d => d.y)

          linksPath.attr('d', d => {
            if (d.target && d.source) {
              const dx = d.target.x - d.source.x
              const dy = d.target.y - d.source.y
              const dr = 0
              const slopeVec = {x: dx, y: dy}
              let transformedSource = addVector(d.source, slopeVec, 15)
              let transformedTarget = addVector(
                d.target,
                {x: dx, y: dy},
                -1 * 15,
              )
              transformedSource = parallelTransform(
                transformedSource,
                slopeVec,
                linkParallelGap,
              )
              transformedTarget = parallelTransform(
                transformedTarget,
                slopeVec,
                linkParallelGap,
              )

              console.log(d,'绘制线段')
              //弧线
              //A圆弧：M 起始点x 起始点y A 椭圆x 椭圆y 椭圆旋转角度 大弧(1)还是小弧(0) 顺时针(1)还是逆时针(0) 终点x 终点y
              if (d.queueing>1){
                return (
                  'M' +
                  transformedSource.x +
                  ',' +
                  transformedSource.y +
                  'A' +
                  dr + transformedSource.x +
                  ',' +
                  dr + transformedSource.x +
                  ' 0 0,1 ' +
                  transformedTarget.x +
                  ',' +
                  transformedTarget.y
                );
              }


              //直线
              return (
                'M' +
                transformedSource.x +
                ',' +
                transformedSource.y +
                'L ' +
                transformedTarget.x +
                ',' +
                transformedTarget.y
              )
            }
          }).attr('fill', 'none') //填充默认为 #000   可以设置为none  啥也没有

          linksText
            .attr('x', d => {
              return d.source.x - (d.source.x - d.target.x) / 2
            })
            .attr('y', d => {
              return d.source.y - (d.source.y - d.target.y) / 2
            })
            .attr('transform', function (d) {
              if (d.source && d.target) {
                if (d.source.x > d.target.x) {
                  const bBox = this.getBBox()
                  // console.log(bBox, 'bBox')
                  let rx = bBox.x + bBox.width / 2
                  let ry = bBox.y + bBox.height / 2
                  // console.log(rx, ry, 'rxry')
                  return `rotate(180,${rx},${ry})`
                } else {
                  return `rotate(0)`
                }
              }

            })
        }

        //k线弧度
        function calcAngleDegrees (x, y) {
          return Math.atan2(y, x)
        }

        //缩短矢量连接线,过程详解见笔记中svg常见绘制效果
        function addVector (point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y)
          let x1 = point.x + Math.cos(AngleDegrees) * unit
          let y1 = point.y + Math.sin(AngleDegrees) * unit
          return {x: x1, y: y1}
        }

        //绘制平行线
        function parallelTransform (point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y) + Math.PI / 2
          let x1 = point.x + Math.cos(AngleDegrees) * unit
          let y1 = point.y + Math.sin(AngleDegrees) * unit
          return {x: x1, y: y1}
        }

        //设置缩放
        function zoom () {
          //定义缩放函数
          var zoom = d3.zoom()
            .scaleExtent([0.5, 2])//用于设置最小和最大的缩放比例
            .on('zoom', zoomed)

          function zoomed (event) {
            // console.log('pppppppppp')
            d3.select('.gWapper').attr('transform', event.transform)
          }

          return zoom
        }

      },
      analysis (n) {
        console.log(this.analysisText[n], '事件：' + n)
      },
      addNode(){
        console.log(d3,'d3d3d3d3k3dd3d3d3d3d3s')
      }
    }

  }
</script>

<style scoped>
  @keyframes linkMove {
    from {
      stroke-dashoffset: 0;
      stroke-dasharray: 10;
    }
    to {
      stroke-dashoffset: 20;
      stroke-dasharray: 10;
    }
  }

  .force-page {
    width: 100%;
    height: 100%;
    position: relative;


  }

  .force-tip {
    position: absolute;
  }

  /*/deep/ svg {*/
  /*.link {*/
  /*&*/
  .animate {
    animation: linkMove 1s infinite linear;
  }

  /*}*/
  /*}*/
  li {
    list-style: none;
  }

</style>
