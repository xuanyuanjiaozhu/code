<template>
    <div id="G6">
    </div>
</template>

<script>
  import G6 from '@antv/g6'

  export default {
    name: 'G6-1',
    data(){
      return{
      }
    },
    mounted () {
      // 定义数据源
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };
      const graph = new G6.Graph({
        container: 'G6', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render()

    },
    methods:{
    }
  }
</script>

<style scoped>
  #G6{
    width: 100%;
    height: 800px;
  }

</style>
