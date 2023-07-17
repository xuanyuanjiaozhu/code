<template>
  <div id="Force-6">
    <!--    <div class="force-tip"-->
    <!--         :style="{'top':`${tipData.point.y}px`,'left':`${tipData.point.x}px`,'display':isShowTip?'block':'none'}">-->
    <!--      <ul>-->
    <!--        <li v-for="item in analysisText" :key="item.id" @click="analysis(item.id)">{{item.name}}</li>-->
    <!--      </ul>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import {
    getNodeSelfPath,
    setLinkGroup,
    getNodesLine,
  } from '../../Utils/deviceRelation'

  export default {
    name: 'Force-6',
    data() {
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
        // tipData: {
        //   point: {x: 100, y: 100},
        //   data: null
        // },
        isShowTip: false,
      }
    },
    mounted() {
      this.drawForce()
    },
    methods: {
      drawForce() {
        //关系数据
        let linksData = [
          {source: 0, target: 1, relation: {name: '北京-上海', isSelf: false, lineNumber: null}},
          {source: 0, target: 1, relation: {name: '北京-上海', isSelf: false, lineNumber: null}},
          {source: 1, target: 0, relation: {name: '上海-北京', isSelf: false, lineNumber: null}},
          {source: 0, target: 2, relation: {name: '北京-深圳', isSelf: false, lineNumber: null}},

        ];
        setLinkGroup(linksData)
        console.log(linksData, 'linksData')

        //节点数据
        let nodesData = [
          {name: '北京', id: 0}, {name: '上海', id: 1},
          {name: '深圳', id: 2}]
        //画布 宽,高
        let width = 800, height = 800
        //比例尺 （范围）
        let color = d3.scaleOrdinal(d3.schemeCategory10)
        let opacityScale = d3.scaleLinear() //线 透明度
        const linkParallelGap = 0 //连线 缩短差值
        //初始化力导向图
        let simulation = d3.forceSimulation(nodesData) //节点数据
          .force('link', d3.forceLink(linksData).distance(200)) //关系数据
          .force('charge', d3.forceManyBody().strength(-2000)) //作用力应用在所用的节点之间，当strength为正的时候可以模拟重力，当为负的时候可以模拟电荷力。
          .force('center', d3.forceCenter(width / 2, height / 2))
          .on('tick', ticked)

        //添加svg画布   设置画布 宽高 为画布设置ID
        let svg = d3.select('#Force-6')
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

        let linksText = links.append('text')
          .classed('link-text', true)
          // .text(d => ellipse(d.relation.name, 8))
          .text('1')
          .attr('text-anchor', 'middle')
          // .attr('opacity', 0)
          .style('pointer-events', 'none')   //让父元素可以穿透        //绘制节点
          .attr('font-size', '12px')
          .attr('color', '#eee')
          .attr('fill', '#eee')

        linksText.append('textPath')
          .attr('href', (d, i) => `#linkPath${i}`)
          .text(d => ellipse(d.relation.name, 8)) //设置文字)

          .attr('startOffset', '50%')
          .style('pointer-events', 'none')
          .attr('fill', '#000')

        let nodes = gWapper.append('g') //
          .selectAll('circle') //获取全部 circle 节点 circle:圆形   circle:圆形  rect：矩形：矩形
          .data(nodesData) //添加节点
          .enter() //进入
          .append('circle') //添加 circle 标签节点 circle:圆形  rect：矩形
          .attr('r', 25) //设置园半径
          // .attr('width', 20) //设置举行宽度
          // .attr('height', 20) //设置矩形高度
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
            // this.tipData = {
            //   point: {x: event.offsetX, y: event.pageY},
            //   data: d
            // }
          })

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
            // this.tipData = {
            //   point: {x: event.offsetX, y: event.pageY},
            //   data: d
            // }
          })

        //拖拽开始
        function dragStart(event, d) {
          console.log(event, d, '拖拽开始')
          if (!event.active) {
            simulation.alphaTarget(.2).restart()
          }
          d.fx = d.x
          d.fy = d.y

        }

        //鼠标拖动
        function dragGed(event, d) {
          d.fx = event.x
          d.fy = event.y
        }

        //鼠标结束拖动
        function dragEnd(event, d) {
          if (!event.active) {
            simulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null
        }

        //设置字符串长度
        function ellipse(str, maxLength) {
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
          .attr('refX', 0)
          .attr('refY', 4)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M0 0 L4 4 L0 8Z')
          .attr('fill', 'black')
          .attr('stroke', 'black')

        //初始化 绘制 内容
        function ticked() {
          nodes.attr('cx', d => d.x)
            .attr('cy', d => d.y)

          linksPath.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)

          texts.attr('x', d => d.x)
            .attr('y', d => d.y)
          linksPath.attr('d', d => {
            console.log(d, '💖💖💖')
            d.sourceRadius = 26;
            d.targetRadius = 31;
            let tan = Math.abs((d.target.y - d.source.y) / (d.target.x - d.source.x)); //圆心连线tan值
            let x1 = d.target.x - d.source.x > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius / (tan * tan + 1)) + d.source.x :
              d.source.x - Math.sqrt(d.sourceRadius * d.sourceRadius / (tan * tan + 1)); //起点x坐标
            let y1 = d.target.y - d.source.y > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius * tan * tan / (tan * tan + 1)) + d.source.y :
              d.source.y - Math.sqrt(d.sourceRadius * d.sourceRadius * tan * tan / (tan * tan + 1)); //起点y坐标
            let x2 = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt(d.targetRadius * d.targetRadius / (1 + tan * tan)) :
              d.target.x + Math.sqrt(d.targetRadius * d.targetRadius / (1 + tan * tan));//终点x坐标
            let y2 = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d.targetRadius * tan * tan / (1 + tan * tan)) :
              d.target.y + Math.sqrt(d.targetRadius * d.targetRadius * tan * tan / (1 + tan * tan));//终点y坐标
            if (d.target.x - d.source.x === 0 || tan === 0) { //斜率无穷大的情况或为0时
              y1 = d.target.y - d.source.y > 0 ? d.source.y + d.sourceRadius : d.source.y - d.sourceRadius;
              y2 = d.target.y - d.source.y > 0 ? d.target.y - d.targetRadius : d.target.y + d.targetRadius;
            }
            console.log(x1, x2, y1, y2, "🐱‍💻🐱‍💻🐱‍💻")
            if (d.linknum === 0) {//设置编号为0的连接线为直线，其他连接线会均分在两边
              d.x_start = x1;
              d.y_start = y1;
              d.x_end = x2;
              d.y_end = y2;
              return 'M' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
            }
            let a = d.sourceRadius > d.targetRadius ? d.targetRadius * d.linknum / 3 : d.sourceRadius * d.linknum / 3;
            let xm = d.target.x - d.source.x > 0 ? d.source.x + Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan)) :
              d.source.x - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan));
            let ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) * tan * tan / (1 + tan * tan)) :
              d.source.y - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) * tan * tan / (1 + tan * tan));
            let xn = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt((d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan)) :
              d.target.x + Math.sqrt((d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan));
            let yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt((d.targetRadius * d.targetRadius - a * a) * tan * tan / (1 + tan * tan)) :
              d.target.y + Math.sqrt((d.targetRadius * d.targetRadius - a * a) * tan * tan / (1 + tan * tan));
            if (d.target.x - d.source.x === 0 || tan === 0) {//斜率无穷大或为0时
              ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt(d.sourceRadius * d.sourceRadius - a * a) : d.source.y - Math.sqrt(d.sourceRadius * d.sourceRadius - a * a);
              yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d.targetRadius - a * a) : d.target.y + Math.sqrt(d.targetRadius * d.targetRadius - a * a);
            }
            console.log(a, xm, ym, xn, yn, '🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️')

            let k = (x1 - x2) / (y2 - y1);//连线垂线的斜率
            let dx = Math.sqrt(a * a / (1 + k * k)); //相对垂点x轴距离
            let dy = Math.sqrt(a * a * k * k / (1 + k * k)); //相对垂点y轴距离
            if ((y2 - y1) === 0) {
              dx = 0;
              dy = Math.sqrt(a * a);
            }
            let xs, ys, xt, yt;
            if (a > 0) {
              xs = k > 0 ? xm - dx : xm + dx;
              ys = ym - dy;
              xt = k > 0 ? xn - dx : xn + dx;
              yt = yn - dy;
            } else {
              xs = k > 0 ? xm + dx : xm - dx;
              ys = ym + dy;
              xt = k > 0 ? xn + dx : xn - dx;
              yt = yn + dy;
            }

            //记录连线起始和终止坐标，用于定位线上文字
            d.x_start = xs;
            d.y_start = ys;
            d.x_end = xt;
            d.y_end = yt;
            console.log('ooooooooooooooooo')
            //return 'M' + xs + ' ' + ys + "L" +  + xt + ' ' + yt;//绘制直线
            let NodesDistance = Math.sqrt(Math.pow(d.source.x - d.target.x, 2) + Math.pow(d.source.y - d.target.y, 2));
            let rad = 200;
            if (300 >= NodesDistance && NodesDistance > 150) {
              rad = 300
            } else if (450 >= NodesDistance && NodesDistance > 300) {
              rad = 400
            } else if (600 >= NodesDistance && NodesDistance > 450) {
              rad = 500
            } else if (750 >= NodesDistance && NodesDistance > 600) {
              rad = 600
            } else if (900 >= NodesDistance && NodesDistance > 750) {
              rad = 700
            } else if (1050 >= NodesDistance && NodesDistance > 900) {
              rad = 800
            } else if (1200 >= NodesDistance && NodesDistance > 1050) {
              rad = 900
            }
            console.log(xs, ys, rad, rad, xt, yt)
            if (d.source.x < d.target.x) {//绘制曲线
              if (d.linknum < 0) {
                return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,0 " + xt + "," + yt;
              } else {
                return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,1 " + xt + "," + yt;
              }
            } else {
              if (d.linknum < 0) {
                return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,1 " + xt + "," + yt;
              } else {
                return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,0 " + xt + "," + yt;
              }
            }
          }).attr('fill', 'none') //填充默认为 #000   可以设置为none  啥也没有
          // linksPath.attr('d', d => {
          //   if (d.target && d.source) {
          //     const dx = d.target.x - d.source.x
          //     const dy = d.target.y - d.source.y
          //     const dr = 0
          //     const slopeVec = {x: dx, y: dy}
          //     let transformedSource = addVector(d.source, slopeVec, 15)
          //     let transformedTarget = addVector(
          //       d.target,
          //       {x: dx, y: dy},
          //       -1 * 15,
          //     )
          //     transformedSource = parallelTransform(
          //       transformedSource,
          //       slopeVec,
          //       linkParallelGap,
          //     )
          //     transformedTarget = parallelTransform(
          //       transformedTarget,
          //       slopeVec,
          //       linkParallelGap,
          //     )
          //
          //     console.log(d,'绘制线段')
          //     //弧线
          //     //A圆弧：M 起始点x 起始点y A 椭圆x 椭圆y 椭圆旋转角度 大弧(1)还是小弧(0) 顺时针(1)还是逆时针(0) 终点x 终点y
          //     if (d.queueing>1){
          //       return (
          //         'M' +
          //         transformedSource.x +
          //         ',' +
          //         transformedSource.y +
          //         'A' +
          //         dr + transformedSource.x +
          //         ',' +
          //         dr + transformedSource.x +
          //         ' 0 0,1 ' +
          //         transformedTarget.x +
          //         ',' +
          //         transformedTarget.y
          //       );
          //     }
          //
          //
          //     //直线
          //     return (
          //       'M' +
          //       transformedSource.x +
          //       ',' +
          //       transformedSource.y +
          //       'L ' +
          //       transformedTarget.x +
          //       ',' +
          //       transformedTarget.y
          //     )
          //   }
          // }).attr('fill', 'none') //填充默认为 #000   可以设置为none  啥也没有

          linksText
            .attr('x', d => {
              return d.source.x - (d.source.x - d.target.x) / 2
            })
            .attr('y', d => {
              return d.source.y - (d.source.y - d.target.y) / 2
            })
          // .attr('transform', function (d) {
          //   if (d.source && d.target) {
          //     if (d.source.x > d.target.x) {
          //       const bBox = this.getBBox()
          //       // console.log(bBox, 'bBox')
          //       let rx = bBox.x + bBox.width / 2
          //       let ry = bBox.y + bBox.height / 2
          //       // console.log(rx, ry, 'rxry')
          //       return `rotate(180,${rx},${ry})`
          //       // return `rotate(180,0,0)`
          //     } else {
          //       return `rotate(0)`
          //     }
          //   }
          //
          // })
        }

        //k线弧度
        function calcAngleDegrees(x, y) {
          return Math.atan2(y, x)
        }

        //缩短矢量连接线,过程详解见笔记中svg常见绘制效果
        function addVector(point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y)
          let x1 = point.x + Math.cos(AngleDegrees) * unit
          let y1 = point.y + Math.sin(AngleDegrees) * unit
          return {x: x1, y: y1}
        }

        //绘制平行线
        function parallelTransform(point, slopeVec, unit) {
          const AngleDegrees = calcAngleDegrees(slopeVec.x, slopeVec.y) + Math.PI / 2
          let x1 = point.x + Math.cos(AngleDegrees) * unit
          let y1 = point.y + Math.sin(AngleDegrees) * unit
          return {x: x1, y: y1}
        }

        //设置缩放
        function zoom() {
          //定义缩放函数
          var zoom = d3.zoom()
            .scaleExtent([0.5, 2])//用于设置最小和最大的缩放比例
            .on('zoom', zoomed)

          function zoomed(event) {
            // console.log('pppppppppp')
            d3.select('.gWapper').attr('transform', event.transform)
          }

          return zoom
        }

        var e = {name: "天津", id: 3};
        var f = {source: 2, target: 3, relation: {name: '深圳-天津', isSelf: false, lineNumber: null}};
        d3.timeout(function () {
          // nodesData.push(e);
          // linksData.push(f);
          // update()
        }, 4000);

        function update() {
          nodes = nodes
            .data(nodesData, (d) => d.name)
            .enter()
            .append("circle") //circle:圆形  rect：矩形
            .attr("r", 25)
            // .attr('width', 20)
            // .attr('height', 20)
            .attr("fill", "yellow")
            .merge(nodes).call(d3.drag()
              .on("start", dragStart)
              .on("drag", dragGed)
              .on("end", dragEnd));

          texts = texts.data(nodesData)
            .enter()
            .append("text")
            .style("fill", "#000")
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            .text(function (d) {
              return d.name;
            })
            .merge(texts);

          linksPath = linksPath.data(linksData, (d) => {
            return d.source.name + "-" + d.target.name;
          })
            .enter()
            .append("path")
            .style("stroke", "#ccc")
            .style("stroke-width", 3)
            .merge(linksPath);

          simulation.nodes(nodes);
          simulation.force("link").links(linksData);
          simulation.alpha(1).restart();
        }

      },
      analysis(n) {
        console.log(this.analysisText[n], '事件：' + n)
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
