<template>
  <div id="Force">
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Force',
    data () {
      return {}
    },
  //   mounted () {
  //     let nodes = [{name: '桂林'}, {name: '广州'},
  //       {name: '厦门'}, {name: '杭州'},
  //       {name: '上海'}, {name: '青岛'},
  //       {name: '天津'}]
  //
  //     let links = [{source: 0, target: 1}, {source: 0, target: 2},
  //       {source: 0, target: 3}, {source: 1, target: 4},
  //       {source: 1, target: 5}, {source: 1, target: 6}]
  //     //节点大小（圆圈大小）
  //     const nodeSize = 35
  //     //初始化时连接线的距离长度
  //     const linkDistance = 130
  //     let width = 1000
  //     let height = 1000
  //     let svg = d3.select('#Force')
  //       .append('svg')
  //       .attr('xmlns', 'http://www.w3.org/2000/svg')
  //       .attr('version', '2.0')
  //       .attr('class', 'svg')
  //       .attr('width', width)
  //       .attr('height', height)
  //     var force = d3.forceSimulation()
  //       .force('center', d3.forceCenter(width / 4, 250))
  //       .force('charce', d3.forceManyBody().strength(-70)) //节点间的作用力，如果不设置.strength(-60）的话，默认是-30
  //       .force('collide', d3.forceCollide()) //使用默认的半径创建一个碰撞作用力。radius默认所有的节点都为1
  //
  //     let g = svg.append('g')
  //     let zoomObj = d3.zoom().scaleExtent([0.5, 1.2]).on('zoom', () => {
  //       //监听zoom事件，zoom发生时，调用该方法
  //       const transform = d3.event.transform //获取缩放和偏移的数据，不懂得同学可以自行通过console.log(d3.event.transform)滑动滚轮查看数据变化
  //       g.attr('transform', transform) // 设置缩放和偏移量 transform对象自带toString()方法
  //     }).on('end', () => {
  //       //该方法在缩放时间结束后回调
  //       //code
  //     })
  //
  //     // eslint-disable-next-line no-unused-vars
  //     var markerBlue = g
  //       .append('marker')
  //       .attr('id', 'resolvedBlue')
  //       .attr('markerUnits', 'strokeWidth')//设置为strokeWidth箭头会随着线的粗细发生变化
  //       .attr('markerUnits', 'userSpaceOnUse') //用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
  //       .attr('viewBox', '0 -5 10 10') //坐标系的区域
  //       .attr('refX', 39) //箭头坐标
  //       .attr('refY', 0)
  //       .attr('markerWidth', 12) //标识的大小
  //       .attr('markerHeight', 12)
  //       .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
  //       .attr('stroke-width', 2) //箭头宽度
  //       .append('path')
  //       .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
  //       .attr('fill', '#029ed9') //箭头颜色
  //     // eslint-disable-next-line no-unused-vars
  //     var markerRed = g
  //       .append('marker')
  //       .attr('id', 'resolvedRed')
  //       .attr('markerUnits', 'strokeWidth')//设置为strokeWidth箭头会随着线的粗细发生变化
  //       .attr('markerUnits', 'userSpaceOnUse') //用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
  //       .attr('viewBox', '0 -5 10 10') //坐标系的区域
  //       .attr('refX', 39) //箭头坐标
  //       .attr('refY', 0)
  //       .attr('markerWidth', 12) //标识的大小
  //       .attr('markerHeight', 12)
  //       .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
  //       .attr('stroke-width', 2) //箭头宽度
  //       .append('path')
  //       .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
  //       .attr('fill', '#ff4238') //箭头颜色
  //
  //     //设置连线
  //     var edgesLine = g
  //       .selectAll('line')
  //       .data(links)
  //       .enter()
  //       .append('path')
  //       .attr('class', 'edgelabel') //添加class样式
  //       .attr('class', (d, i) => {
  //         if (d.relation === '上一级') {
  //           // if (d.relation === "投资") {
  //           return 'nodeBlue'
  //         } else if (d.relation === '下一级') {
  //           // } else if (d.relation === "股东") {
  //           return 'nodeRed'
  //         }
  //       }) //添加颜色
  //       .style('stroke-width', 1) //连接线粗细度
  //       .attr('marker-end', (d, i) => {
  //         if (d.relation === '上一级') {
  //           // if (d.relation === "投资") {
  //           return 'url(#resolvedBlue)'
  //         } else if (d.relation === '下一级') {
  //           // } else if (d.relation === "股东") {
  //           return 'url(#resolvedRed)'
  //         }
  //       })
  //     //设置线的末尾为刚刚的箭头
  //     //设置连接线中间关系文本
  //     var edgesText = g
  //       .selectAll('.linetext')
  //       .data(links)
  //       .enter()
  //       .append('text')
  //       .attr('class', (d, i) => {
  //         if (d.relation === '上一级') {
  //           // if (d.relation === "投资") {
  //           return 'linetextBlue'
  //         } else if (d.relation === '下一级' || d.relation === '分支机构') {
  //           // } else if (d.relation === "股东" || d.relation === "分支机构") {
  //           return 'linetextRed'
  //         }
  //       })
  //       .text(d => {
  //         //          设置关系文本
  //         return d.relation
  //       })
  //     var drag = d3
  //       .drag()
  //       .on('start', (d, i) => {
  //         if (!d3.event.active) {
  //           //拖拽开始回调
  //           force.alphaTarget(0.1).restart() // 这个方法可以用在在交互时重新启动仿真，比如拖拽了某个节点，重新进行布局。这个必须要进行设置不然会拖动不了。
  //         }
  //         d.fixed = true //偏移后固定不动
  //         // d3.event.sourceEvent.stopPropagation()
  //         d.fx = d.x //记录当前默认位置（x - 节点当前的 x-位置，如果要为某个节点设置默认的位置，则需要为该节点设置如下两个属性:fx =x位置）
  //         d.fy = d.y
  //       })
  //       .on('drag', (d, i) => {
  //         //拖动时，设置拖动后默认位置的x，y
  //         d.fx = d3.event.x
  //         d.fy = d3.event.y
  //       })
  //       .on('end', (d, i) => {
  //         //拖动结束后
  //         if (!d3.event.active) {
  //           force.alphaTarget(0)
  //         }
  //       })
  //     var nodeGroup = g
  //       .selectAll('g')
  //       .data(nodes)
  //       .enter()
  //       .append('g')
  //       .attr('id', function (d, i) {
  //         return 'nodeGroup' + i
  //       })
  //       .each(function (d, i) {
  //         var self = this
  //         d3.select(this)
  //           .append('circle')
  //           .attr('r', nodeSize)
  //           .attr('class', (d, i) => {
  //             //为不同的节点设置不同的css样式
  //             if (d.type === 0) {
  //               return 'nodeOrange'
  //             } else if (d.type === 2) {
  //               return 'nodeBlue'
  //             } else if (d.type === 1) {
  //               return 'nodeRed'
  //             }
  //           })
  //           .attr('id', (d, i) => {
  //             //为每个节点设置不同的id
  //             return 'node' + i
  //           })
  //           .on('touchmove', (d, i) => {
  //             //设置鼠标监听时间，当移动端手指移动时,设置关系文本透明度
  //             edgesText.style('fill-opacity', function (edge) {
  //               if (edge.source === d || edge.target === d) {
  //                 return 1.0
  //               } else {
  //                 return 0
  //               }
  //             })
  //             /**
  //              * 改本svg的层级，这个主要是因为在svg中z-index是无效的，svg根据绘制的先后顺序，后绘制的排在最上面，就像贴纸，
  //              * 后贴的会盖住前面贴的。所以我们希望在被选中时，能够把节点和节点对应的文字提到最上一层，我们就可以通过d3来选择到点击的对象，然后通过raise方法来提到最上一层
  //              * 下同
  //              */
  //             d3.select(self).raise()
  //           })
  //           .on('touchend', (d, i) => {
  //             //手指移开后，所有关系文本设置透明度为1
  //             edgesText.style('fill-opacity', function (edge) {
  //               return 1.0
  //             })
  //           })
  //           .on('mousedown', (d, i) => {
  //             edgesText.style('fill-opacity', function (edge) {
  //               if (edge.source === d || edge.target === d) {
  //                 return 1.0
  //               } else {
  //                 return 0
  //               }
  //             })
  //             d3.select(self).raise()
  //           })
  //           .on('mouseout', (d, i) => {
  //             edgesText.attr('fill-opacity', function (edge) {
  //               return 1
  //             })
  //           })
  //           .call(drag) //监听拖动事件
  //         d3.select(this)
  //           .append('text')
  //           .attr('text-anchor', 'middle')
  //           .attr('class', 'nodetext')
  //           .attr('id', (d, i) => {
  //             return 'nodetext' + i
  //           })
  //           .attr('x', function (d, i) {
  //             /**
  //              * 由于svg的text不能进行换行，所以下面文字使用了tspan进行换行操作
  //              */
  //               //正则表达式
  //             var reEn = /[a-zA-Z]+/g
  //             //如果全英文则不换行
  //             if (!d.name.match(reEn)) {
  //               //无效
  //               console.log('如果全英文则不换行')
  //               d3
  //                 .select(this.relation)
  //                 .append('tspan')
  //                 .attr('class', 'nodetext')
  //                 .attr('fill', '#ff7438')
  //                 .text(function () {
  //                   return d.name
  //                 })
  //             } else if (d.name.length <= 15) {
  //               console.log('文中小于15个字不换行')
  //               //文中小于4个字不换行
  //               d3
  //                 .select(this.relation)
  //                 .append('tspan')
  //                 .attr('class', 'nodetext')
  //                 .attr('fill', '#ff7438')
  //                 .text(function () {
  //                   return d.name
  //                 })
  //             } else {
  //               if (d.name.length <= 30) {
  //                 console.log('文中大于15个字换行小于30')
  //                 //中文小于八个字，则分段进行换行
  //                 let top = d.name.substring(0, 15)
  //                 let bot = d.name.substring(15, 30)
  //                 //这里的this指代text dom，不懂的可以自行打印this查看
  //                 d3
  //                   .select(this)
  //                   .append('tspan')
  //                   .text(function () {
  //                     return top
  //                   })
  //                 d3
  //                   .select(this)
  //                   .append('tspan')
  //                   .attr('dy', '1.2em') //设置偏移
  //                   .text(function () {
  //                     return bot
  //                   })
  //               } else {
  //                 //中文大于8个字，分段并用...代替后面的字符
  //                 let top = d.name.substring(0, 15)
  //                 let bot = d.name.substring(15)
  //                 d3.select(this)
  //                   .append('tspan')
  //                   .text(function () {
  //                     return top
  //                   })
  //                 d3.select(this)
  //                   .append('tspan')
  //                   .attr('dy', '1.2em')
  //                   .text(function () {
  //                     return bot
  //                   })
  //               }
  //             }
  //           })
  //           .attr('cursor', 'default') //设置鼠标样式
  //           .on('touchmove', (d, i) => {
  //             edgesText.style('fill-opacity', function (edge) {
  //               if (edge.source === d || edge.target === d) {
  //                 return 1.0
  //               } else {
  //                 return 0
  //               }
  //             })
  //             //改本svg的层级
  //             d3.select(self).raise()
  //           })
  //           .on('touchend', (d, i) => {
  //             edgesText.style('fill-opacity', function (edge) {
  //               return 1.0
  //             })
  //           })
  //           .on('mousedown', (d, i) => {
  //             edgesText.style('fill-opacity', function (edge) {
  //               if (edge.source === d || edge.target === d) {
  //                 return 1.0
  //               } else {
  //                 return 0
  //               }
  //             })
  //             d3.select(self).raise()
  //           })
  //           .on('mouseout', (d, i) => {
  //             edgesText.style('fill-opacity', function (edge) {
  //               return 1.0
  //             })
  //           })
  //           .call(drag)
  //       })
  //
  //     //设置node和edge
  //     force.nodes(nodes)
  //       .force(
  //         'link',
  //         d3.forceLink(links)
  //           .distance(linkDistance)
  //           .strength(0.1)
  //       )
  //       .restart()
  //     //tick 表示当运动进行中每更新一帧时
  //     force.on('tick', function () {
  //       //更新连接线的位置
  //       edgesLine.attr('d', function (d) {
  //         var path =
  //           'M ' +
  //           d.source.x +
  //           ' ' +
  //           d.source.y +
  //           ' L ' +
  //           d.target.x +
  //           ' ' +
  //           d.target.y
  //         return path
  //       })
  //
  //       //更新连接线上文字的位置
  //       edgesText.attr('x', function (d) {
  //         return (d.source.x + d.target.x) / 2
  //       })
  //       edgesText.attr('y', function (d) {
  //         return (d.source.y + d.target.y) / 2
  //       })
  //
  //       //更新结点和文字
  //       d3.selectAll('circle').attr('cx', function (d) {
  //         if (d) {
  //           return d.x
  //         } else {
  //           return width
  //         }
  //       })
  //       d3.selectAll('circle').attr('cy', function (d) {
  //         if (d) {
  //           return d.y
  //         } else {
  //           return height
  //         }
  //       })
  //       d3.selectAll('.nodetext').attr('x', function (d) {
  //         return d.x
  //       })
  //       d3.selectAll('.nodetext').attr('y', function (d) {
  //         return d.y
  //       })
  //       //动态更新sptan 的x的坐标
  //       d3
  //         .selectAll('.nodetext')
  //         .selectAll('tspan')
  //         .attr('x', function (d) {
  //           return d.x
  //         })
  //
  //   }
  // )
  //
  //
  // //添加连线
  // // var svg_edges = svg.selectAll('line')
  // //   .data(edges)
  // //   .enter()
  // //   .append('line')
  // //   .style('stroke', '#ccc')
  // //   .style('stroke-width', 1)
  // //
  // // var color = d3.scale.category20()
  //
  // //添加节点
  // // var svg_nodes = svg.selectAll('circle')
  // //   .data(nodes)
  // //   .enter()
  // //   .append('circle')
  // //   .attr('r', 20)
  // //   .style('fill', function (d, i) {
  // //     return  'red'//color(i)
  // //   })
  // // .call(force.drag)  //使得节点能够拖动
  //
  // // //添加描述节点的文字
  // // var svg_texts = svg.selectAll('text')
  // //   .data(nodes)
  // //   .enter()
  // //   .append('text')
  // //   .style('fill', 'black')
  // //   .attr('dx', 20)
  // //   .attr('dy', 8)
  // //   .text(function (d) {
  // //     return d.name
  // //   })
  //
  // // force.on('tick', function () { //对于每一个时间间隔
  // //   //更新连线坐标
  // //   svg_edges.attr('x1', function (d) {
  // //     return d.source.x
  // //   })
  // //     .attr('y1', function (d) {
  // //       return d.source.y
  // //     })
  // //     .attr('x2', function (d) {
  // //       return d.target.x
  // //     })
  // //     .attr('y2', function (d) {
  // //       return d.target.y
  // //     })
  // //
  // //   //更新节点坐标
  // //   svg_nodes.attr('cx', function (d) {
  // //     return d.x
  // //   })
  // //     .attr('cy', function (d) {
  // //       return d.y
  // //     })
  // //
  // //   //更新文字坐标
  // //   svg_texts.attr('x', function (d) {
  // //     return d.x
  // //   })
  // //     .attr('y', function (d) {
  // //       return d.y
  // //     })
  // // })
  // }
  }
</script>

<style scoped>
  #Force {
    padding: 10px;
    border: skyblue 1px solid;
    border-radius: 4px;
  }

</style>
