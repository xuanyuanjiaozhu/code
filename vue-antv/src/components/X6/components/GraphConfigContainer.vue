<template>
  <div id="header">
    <a-tooltip title="放大">
      <span class="iconfont header-iconfont" @click="()=>{this.graph.zoom(0.2)}">&#xec14;</span>
    </a-tooltip>
    <a-tooltip title="缩小">
      <span class="iconfont header-iconfont" @click="()=>{this.graph.zoom(-0.2)}">&#xec13;</span>
    </a-tooltip>
    <a-tooltip title="撤销">
      <span class="iconfont header-iconfont" @click="()=>{this.graph.history.undo()}">&#xec0b;</span>
    </a-tooltip>
    <a-tooltip title="取消撤销">
      <span class="iconfont header-iconfont" @click="()=>{this.graph.history.redo()}">&#xec0a;</span>
    </a-tooltip>
    <a-tooltip title="删除">
      <span class="iconfont header-iconfont" @click="()=>{this.graph.cut(this.graph.getSelectedCells())}">&#xe60d;</span>
    </a-tooltip>
    <a-tooltip>
      <span class="iconfont header-iconfont" style="color:#e6e6e6;cursor: not-allowed">&#xe60d;</span>
    </a-tooltip>
<!--    <a-tooltip title="复制">-->
<!--      <span class="iconfont header-iconfont" @click="()=>{this.graph.history.redo()}">&#xe60e;</span>-->
<!--    </a-tooltip>-->
<!--    <a-tooltip title="粘贴">-->
<!--      <span class="iconfont header-iconfont" @click="()=>{this.graph.history.redo()}">&#xe610;</span>-->
<!--    </a-tooltip>-->
<!--    <a-tooltip title="全屏">-->
<!--      <span class="iconfont header-iconfont" @click="()=>{this.$emit('full',true)}">&#xec16;</span>-->
<!--    </a-tooltip>-->
<!--    <a-tooltip title="退出全屏">-->
<!--      <span class="iconfont header-iconfont" @click="()=>{this.$emit('full',false)}">&#xec15;</span>-->
<!--    </a-tooltip>-->
    <a-tooltip title="导出svg">
      <span class="iconfont header-iconfont" @click="saveToSvg">&#xec09;</span>
    </a-tooltip>
  </div>
</template>

<script>
import { Graph, DataUri } from '@antv/x6'
export default {
  name: 'GraphConfigContainer',
  props: {
    graph: Graph
  },
  methods: {
    // 保存成svg图片
    saveToSvg () {
      this.graph.toSVG(dataUri => {
        // 下载
        DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
        // }, {
        //   preserveDimensions: {
        //     width: 800,
        //     height: 800
        //   }
        // })
      })
    }
  }
}
</script>

<style scoped>
#header {
  display: flex;
  border-top: 1px solid #dfe3e8;
  padding-top: 5px;
  margin:0;
  height: 35px;
  width: 100%;
}
.header-iconfont{
  margin-left: 20px;
  cursor: pointer;
  color: #595959;
}
</style>
