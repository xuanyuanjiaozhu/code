<template>
  <div class="drag-content">
    <div ref="orderForm1">

    <span :style="{'background-color': item.color}"
          v-for="(item, index) in colorList"
          v-dragging="{ item: item, list: colorList, group: 'item' }" :key="index">{{item.color}}</span>
    </div>

    <p @click="pdfDownload">下载</p>
  </div>
</template>

<script>
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  export default{
    data () {
      return {
        colorList: [
          {color: '#2ec7c9'}, {color: '#b6a2de'}, {color: '#5ab1ef'},
          {color: '#ffb980'}, {color: '#d87a80'}, {color: '#8d98b3'},
          {color: '#e5cf0d'}, {color: '#97b552'}, {color: '#95706d'},
          {color: '#dc69aa'}, {color: '#07a2a4'}, {color: '#9a7fd1'},
          {color: '#588dd5'}, {color: '#f5994e'}, {color: '#c05050'},
          {color: '#59678c'}, {color: '#c9ab00'}, {color: '#7eb00a'},
          {color: '#6f5553'}, {color: '#c14089'}, {color: '#7eb00a'},
          {color: '#2ec7c9'}, {color: '#b6a2de'}, {color: '#5ab1ef'},
          {color: '#ffb980'}, {color: '#d87a80'}, {color: '#8d98b3'},
          {color: '#e5cf0d'}, {color: '#97b552'}, {color: '#95706d'},
          {color: '#dc69aa'}, {color: '#07a2a4'}, {color: '#9a7fd1'},
          {color: '#588dd5'}, {color: '#f5994e'}, {color: '#c05050'},
          {color: '#59678c'}, {color: '#c9ab00'}, {color: '#7eb00a'},
          {color: '#6f5553'}, {color: '#c14089'}, {color: '#7eb00a'},
          {color: '#2ec7c9'}, {color: '#b6a2de'}, {color: '#5ab1ef'},
          {color: '#ffb980'}, {color: '#d87a80'}, {color: '#8d98b3'},
          {color: '#e5cf0d'}, {color: '#97b552'}, {color: '#95706d'},
          {color: '#dc69aa'}, {color: '#07a2a4'}, {color: '#9a7fd1'},
          {color: '#588dd5'}, {color: '#f5994e'}, {color: '#c05050'},
          {color: '#59678c'}, {color: '#c9ab00'}, {color: '#7eb00a'},
          {color: '#6f5553'}, {color: '#c14089'}, {color: '#7eb00a'},
          {color: '#2ec7c9'}, {color: '#b6a2de'}, {color: '#5ab1ef'},
          {color: '#ffb980'}, {color: '#d87a80'}, {color: '#8d98b3'},
          {color: '#e5cf0d'}, {color: '#97b552'}, {color: '#95706d'},
          {color: '#dc69aa'}, {color: '#07a2a4'}, {color: '#9a7fd1'},
          {color: '#588dd5'}, {color: '#f5994e'}, {color: '#c05050'},
          {color: '#59678c'}, {color: '#c9ab00'}, {color: '#7eb00a'},
          {color: '#6f5553'}, {color: '#c14089'}, {color: '#7eb00a'},
          {color: '#2ec7c9'}, {color: '#b6a2de'}, {color: '#5ab1ef'},
          {color: '#ffb980'}, {color: '#d87a80'}, {color: '#8d98b3'},
          {color: '#e5cf0d'}, {color: '#97b552'}, {color: '#95706d'},
          {color: '#dc69aa'}, {color: '#07a2a4'}, {color: '#9a7fd1'},
          {color: '#588dd5'}, {color: '#f5994e'}, {color: '#c05050'},
          {color: '#59678c'}, {color: '#c9ab00'}, {color: '#7eb00a'},
        ]
      }
    },
    mounted () {
      // 拖拽后触发的事件
      this.$dragging.$on('dragged', (res) => {
        console.log(res)
      })
    },
    methods:{
      // 下载pdf
      pdfDownload() {
        let _this = this
        let myBox = this.$refs.orderForm1; //获取ref里面的内容
        html2Canvas(myBox, {
          useCORS: true, //是否尝试使用CORS从服务器加载图像
          allowTaint: true,
          dpi: 300, //解决生产图片模糊
          scale: 3, //清晰度--放大倍数
        }).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89 // 一页pdf显示html页面生成的canvas高度;
          let leftHeight = contentHeight //未生成pdf的html页面高度
          let position = 0 //pdf页面偏移
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          // let imgWidth = 595.28
          let imgWidth = 560.28  //宽度
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')

          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          // PDF.save(_this.$t('食堂利用明细') + '.pdf')//下载标题
          PDF.save('食堂利用明细' + '.pdf')//下载标题
        });
      },

    }
  }
</script>

<style>
  .drag-content{
    display: flex;
    flex-wrap: wrap;
  }
  .drag-content span{
    width: 30.33%;
    height: 100px;
    margin: 5px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
  }
</style>

