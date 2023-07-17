<template>
  <div id="Base">
    <div class="TextBind">
      <p>11111</p>
      <p>22222</p>
    </div>
    <div class="Datum">
      <p>datum1</p>
      <p>datum2</p>
      <p>datum3</p>
    </div>
    <div class="DataBind">
      <p>111</p>
      <p>222</p>
      <p>333</p>
      <p>444</p>
    </div>
    <div class="Remove">remove</div>

  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Base',
    data () {
      return {}
    },
    mounted () {
      this.text()
      this.datum()
      this.dataset()
    },
    methods: {
      text () {
        d3.select('.TextBind').selectAll('p').text('3333');
        this.styles();
        this.setDOM();
      },
      datum () {
        let datum = d3.select('.Datum').selectAll('p')
        let str = 'china'
        datum.datum(str)
        datum.text(function (d, i) {
          return '第' + i + '个元素绑定的数据' + d
          // console.log(d)
        })
      },
      dataset () {
        let dataset = ['i like dog', 'i like cat', 'i like snake']
        let dataBind = d3.select('.DataBind').selectAll('p')
        dataBind.data(dataset)
        dataBind.text(function (d, i) {
          return d
        })
      },
      styles(){
        d3.select('.TextBind').select('p').style('color','skyblue')
        d3.select('.Datum').selectAll('p').style('color','yellow')
        d3.select('.DataBind').style('color','green')
      },
      setDOM(){
        d3.select('.TextBind').append('p').text('append p element');
        d3.select('#Base').insert('p','.TextBind').text('insert p element');
        d3.select('#Base').select('.Remove').remove();
      }
    }
  }
</script>

<style scoped>
  #Base {
    padding: 10px;
  }
  div{
    padding-bottom: 10px;
  }

</style>
