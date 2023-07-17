<template>
  <div id="Force-3">
    <div class="force-tip"
         :style="{'top':`${tipData.point.y}px`,'left':`${tipData.point.x}px`,'display':isShowTip?'block':'none'}">
      <ul>
        <li v-for="item in analysisText" :key="item.id" @click="analysis(item.id)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Force-3',
    data () {
      return {
        analysisText:[
          {
            name:'事件一',
            id:'1'
          },
          {
            name: '事件二',
            id:'2'
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
      // this.drawForce()
      this.drawForce1()
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

        let svg = d3.select('#Force-3')
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

      },
      drawForce1() {
        let width = 800, height = 600;
        const opacityRange = [0.7, 1.0];
        const nodeSizeRange = [10, 50];
        const linkParallelGap = 6;
        let opacityScale, nodeSizeScale;
        let data = {
          "nodes": [
            {
              "ntId": 1,
              "label": "小明",
              "number": 20
            },
            {
              "ntId": 6,
              "label": "小红",
              "number": 17
            },
            {
              "ntId": 7,
              "label": "小刚",
              "number": 140
            },
            {
              "ntId": 8,
              "label": "小乐",
              "number": 43
            }
          ],
          "links": [
            {
              "sourceId": 7,
              "targetId": 6,
              "number": 2352
            },
            {
              "sourceId": 7,
              "targetId": 8,
              "number": 1866
            },
            {
              "sourceId": 6,
              "targetId": 7,
              "number": 1863
            },
            {
              "sourceId": 7,
              "targetId": 1,
              "number": 788
            },
            {
              "sourceId": 1,
              "targetId": 7,
              "number": 787
            },
            {
              "sourceId": 8,
              "targetId": 6,
              "number": 676
            },
            {
              "sourceId": 6,
              "targetId": 8,
              "number": 390
            }
          ]
        };
        let {nodes, links} = data;
        let linksData = []
        let nodesData = nodes
        linksData = links.map(d => {
          return {
            source: d.sourceId,
            target: d.targetId,
            attackCount: d.number,
          };
        })
        generateScale()
        /**
         * 创建力导向图
         *
         */
        let simulation = d3.forceSimulation(nodesData)
          //仿真中运行linksData后，linksData改变为与nodes绑定的数据格式
          .force('link', d3.forceLink(linksData).id(d => d.ntId))
          .force('charge', d3.forceManyBody().strength(-8000))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .on('tick', ticked)


        //创建svg
        let svg = d3.select('#Force-3')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('background', '#ccc')
          .on('click', () => {
            this.isShowTip = false;
          })

        let gWrapper = svg.append('g')

        //连线
        let linkEles = gWrapper.append('g')
          .classed('links', true)
          .selectAll('path')
          .data(linksData)
          .enter()
          //单个线
          // .append('line')
          //双向线
          .append('path') //单线 line   双线  path
          .attr('id', (d, i) => `linkPath${i}`)
          .classed('link', true)
          .attr('stroke', 'yellow')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)')
          .attr('opacity', d => opacityScale(+d.number))
          .style('cursor', 'pointer')
          .on('mouseenter', (event, d) => {
            linkLabelEles.attr('opacity', item => {
              return item === d ? 1 : 0;
            })
            linkEles.attr('opacity', item => {
              return item === d ? 1 : 0.3;
            })
          })
          .on('mouseleave', () => {
            linkLabelEles.attr('opacity', 0)
            linkEles.attr('opacity', 1)
          })


        //节点
        let nodeEles = gWrapper.append('g')
          .attr('class', 'nodes')
          .style('cursor', 'pointer')
          .selectAll('.node')
          .data(nodesData)
          .enter()
          .append('g')
          .classed('node', true)
          .attr('opacity', d => {
            // 修复特定条件下，透明度为负值bug
            let tempOpacity = opacityScale(+d.number);
            return tempOpacity ? tempOpacity : 1;
          })
          .call(d3.drag()
            .on('start', dragstart)
            .on('drag', dragged)
            .on('end', dragend)
          )
          .on('click', (event, d) => {
            event.stopPropagation();
            console.log(event,'eventkkkkk')
            this.isShowTip = true;
            this.tipData = {
              point: {x: event.offsetX, y: event.pageY},
              data: d
            }
          })
          .on('mouseenter', (event, d) => {
            linkEles.attr('opacity', item => {
              return (item.target.ntId === d.ntId || item.source.ntId === d.ntId) ? 1 : 0
            })
            nodeLabelElms.text(item => d.ntId === item.ntId ? item.label : ellipse(item.label, 8))
          })
          .on('mouseleave', (event, d) => {
            linkEles.attr('opacity', 1)
            nodeLabelElms.text(item => ellipse(item.label, 8))
          })

        //图片
        nodeEles.append('image')
          //.attr('xlink:href', this.svgSrc)
          .attr('href', this.svgSrc)
          .attr('class', 'node-icon')
          .attr('width', d => nodeSizeScale(+d.number))
          .attr('height', d => nodeSizeScale(+d.number))
          .attr('x', d => -nodeSizeScale(+d.number) / 2)
          .attr('y', d => -nodeSizeScale(+d.number) / 2)

        let nodeLabelContainer = nodeEles.append('g')
          .classed('node-label', true)
          .attr('transform', d => {
            const y = nodeSizeScale(+d.number) * 0.35;
            return `translate(0,${y})`
          })


        //文字
        let nodeLabelElms = nodeLabelContainer.append('text')
          .attr('dy', '1em')
          .attr('fill', '#fff')
          .text(d => ellipse(d.label, 8))

        //重点：文字背景矩形
        let textPadding = 6;
        nodeLabelContainer.each(function (d) {
          //d:当前元素绑定的绑定的数据，this:函数内部 this 指向当前 DOM 元素(node[i])
          let textBox = this.getBBox()
          //或者
          // let textBox = d3.select(this)
          // .select('text')
          // .node()
          // .getBBox()
          d3.select(this)
            .insert('rect', 'text')
            .attr('x', textBox.x - textPadding)
            .attr('y', textBox.y - textPadding)
            .attr('width', textBox.width + textPadding * 2)
            .attr('height', textBox.height + textPadding * 2)
            .attr('fill', '#ea3d66')
        })


        //重点：箭头
        let arrow = gWrapper.append('defs')
          .append('marker')
          .attr('id', 'arrow')
          // .attr('markerUnits','strokeWidth')
          .attr('markerUnits','userSpaceOnUse')
          .attr('markerWidth', 20)
          .attr('markerHeight', 20)
          .attr('refX', 4)
          .attr('refY', 4)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M0 0 L4 4 L0 8Z')
          .attr('fill', 'black')
          .attr('stroke', 'black')


        function ticked() {
          linkEles.classed('animate', false)
          // 当只有单向线时
          linkEles.attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y)

          nodeEles.attr('transform', d => {
            return `translate(${d.x},${d.y})`
          })

          //双向线
          linkEles.attr('d', d => {
            if (d.target && d.source) {
              const dx = d.target.x - d.source.x;
              const dy = d.target.y - d.source.y;
              const dr = 0;
              const slopeVec = {x: dx, y: dy};
              let transformedSource = addVector(d.source, slopeVec, 15);
              let transformedTarget = addVector(
                d.target,
                {x: dx, y: dy},
                -1 * 15,
              );

              transformedSource = parallelTransform(
                transformedSource,
                slopeVec,
                linkParallelGap,
              );
              transformedTarget = parallelTransform(
                transformedTarget,
                slopeVec,
                linkParallelGap,
              );


              //弧线
              //A圆弧：M 起始点x 起始点y A 椭圆x 椭圆y 椭圆旋转角度 大弧(1)还是小弧(0) 顺时针(1)还是逆时针(0) 终点x 终点y
              return (
                  'M' +
                  transformedSource.x +
                  ',' +
                  transformedSource.y +
                  'A' +
                  dr + transformedSource.x +
                  ',' +
                  dr + transformedSource.x +
                  ' 0 0,0 ' +
                  transformedTarget.x +
                  ',' +
                  transformedTarget.y
              );

              //直线
              // return (
              //   'M' +
              //   transformedSource.x +
              //   ',' +
              //   transformedSource.y +
              //   'L ' +
              //   transformedTarget.x +
              //   ',' +
              //   transformedTarget.y
              // );
            }
          }).attr("fill",'none') //填充默认为 #000   可以设置为none  啥也没有

          //攻击文字旋转
          linkLabelEles.attr('transform', function (d) {
            if (d.source && d.target) {
              if (d.source.x > d.target.x) {
                const bBox = this.getBBox();
                console.log(bBox,'bBox')
                let rx = bBox.x + bBox.width / 2
                let ry = bBox.y + bBox.height / 2
                return `rotate(180,${rx},${ry})`
              } else {
                return `rotate(0)`
              }
            }

          })
          if (simulation.alpha() < 0.02) {
            linkEles.classed('animate', true)
            simulation.stop();
          }


        }

        //创建攻击文字
        let linkLabelEles = gWrapper.append('g')
          .classed('link-labels', true)
          .selectAll('text')
          .data(linksData)
          .enter()
          .append('text')
          .attr('dy', -10)
          .attr('text-anchor', 'middle')
          .attr('opacity', 0)
          .style('pointer-events', 'none')   //让父元素可以穿透
        // 文字路径
        linkLabelEles.append('textPath')
          .attr('href', (d, i) => `#linkPath${i}`)
          .text(d => `攻击数：${d.attackCount}`)
          .attr('startOffset', '50%')
          .style('pointer-events', 'none')

        function dragstart(event, d) {
          if (!event.active) {
            simulation.alphaTarget(0.3).restart()
          }
          d.fx = d.x
          d.fy = d.y
        }

        function dragged(event, d) {
          d.fx = event.x
          d.fy = event.y
        }

        function dragend(event, d) {
          if (!event.active) {
            simulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null

        }

        function ellipse(str, maxLength) {
          let s = String(str);
          return s.length > maxLength ? `${s.substring(0, maxLength)}...` : s;
        }

        /**
         * 双向的添加1,2标识
         * @param link
         * @param i
         */
        function checkBiLink(link, i) {
          let sameIdx;
          // try {
            sameIdx = linksData.findIndex(item => {
              return (
                item.source.ntId === link.target.ntId &&
                item.target.ntId === link.source.ntId &&
                !item.bidir
              );
            });
          // }
          // catch
          // {
          //   sameIdx = -1;
          // }
          if (sameIdx > i) {
            link.bidir = 1;
            linksData[sameIdx].bidir = 2;
          }
        }

        linksData.forEach(checkBiLink);

        /**
         * 生成scale
         */
        function generateScale() {
          opacityScale = d3.scaleLinear()
            .domain(d3.extent(linksData, d => +d.attackCount))
            .range(opacityRange)
          nodeSizeScale = d3.scaleLinear()
            .domain(d3.extent(nodesData, d => +d.number))
            .range(nodeSizeRange)
        }

        //k线弧度
        function calcAngleDegrees(x, y) {
          return Math.atan2(y, x);
        }

        //缩短矢量连接线,过程详解见笔记中svg常见绘制效果
        function addVector(point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y);
          let x1 = point.x + Math.cos(AngleDegrees) * unit;
          let y1 = point.y + Math.sin(AngleDegrees) * unit;
          return {x: x1, y: y1};
        }

        //绘制平行线
        function parallelTransform(point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y) + Math.PI/2;
          let x1 = point.x + Math.cos(AngleDegrees) * unit;
          let y1 = point.y + Math.sin(AngleDegrees) * unit;
          return {x: x1, y: y1};
        }


      },
      analysis(n) {
        console.log(this.tipData.data,'id:'+n);
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
  li{
    list-style: none;
  }

</style>
