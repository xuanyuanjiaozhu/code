<template>
  <div id="Box-1">
    <div>
      <button @click="addView">添加视图</button>
      <button v-show="isViewList" v-for="item in viewList" :key="item.type" @click="select(item)">{{item.name}}</button>
      <div class="Boxs">
        <BoxChart v-for="(item,index) in boxList" :key="index" :chartData="item"/>
      </div>
      <div class="mask" v-show="isProgressBar">
        <div class="progressBar">
          <p class="header">添加视图</p>
          <div class="content">
            <p><span>视图标题：</span><input type="text" v-model="title">&nbsp;<span v-show="viewMessage" style="color:red">*视图标题不能为空</span></p>
            <div class="prigress">
              <div class="prigress-item">
                <p class="number">1</p>
                <p class="text">选择图表类型</p>
                <i class="line"></i>
              </div>
              <div class="prigress-item">
                <p class="number">2</p>
                <p class="text">选择维度/指标</p>
              </div>
            </div>
            <div class="select" v-show="isSelect == 0">
              <div class="chartList">
                <button v-for="item in viewList" :key="item.type" @click="select(item)">{{item.name}}</button>
              </div>
              <div class="chart-example" v-if="chartItem">
                <BoxChart :chartData="chartItem"/>
              </div>
            </div>
            <div v-show="isSelect == 1">
              <select v-model="database" @click="databaseSelect">
                <option v-for="item in databaseList" :value="item.value">{{item.name}}</option>
              </select>
              <select v-model="table" @click="tableSelect">
                <option v-for="item in tableList" :value="item.value">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="footer">
            <button @click="isProgressBar=!isProgressBar">取消</button>
            <button @click="retreat" v-show="isSelect == 1">上一步</button>
            <button @click="nextStep" v-show="isSelect != 1">下一步</button>
            <button @click="finish" v-show="isSelect == 1">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BoxChart from '../BoxChart'

  export default {
    name: "Box-1",
    components: {
      BoxChart
    },
    data() {
      return {
        isProgressBar: false,
        isViewList: false,
        viewMessage:false,
        viewList: [
          {name: '柱状图', type: 'BarChart'},
          {name: '饼状图', type: 'PieChart'},
          {name: '折线图', type: 'LineChart'},
          {name: '漏斗图', type: 'FunnelChart'},
          {name: '折线柱状图', type: 'LineBarChart'},
          {name: '雷达图', type: 'RadarChart'},
          {name: '仪表盘', type: 'GaugeChart'}
        ],
        databaseList: [
          {name: '数据库1', value: 1},
          {name: '数据库2', value: 2},
          {name: '数据库3', value: 3},
          {name: '数据库4', value: 4},
          {name: '数据库5', value: 5},
          {name: '数据库6', value: 6},
          {name: '数据库7', value: 7},
        ],
        tableList: [
          {name: '表单1', value: 1},
          {name: '表单2', value: 2},
          {name: '表单3', value: 3},
          {name: '表单4', value: 4},
          {name: '表单5', value: 5},
          {name: '表单6', value: 6},
          {name: '表单7', value: 7},
          {name: '表单8', value: 8},
        ],
        boxList: [],
        database: '1',
        table: '1',
        title: '',
        chartItem: null,
        isSelect: 0,
      }
    },
    methods: {
      addView() {
        // this.isViewList = true;
        this.isProgressBar = true;
      },
      select(obj) {
        this.chartItem = {...obj, id: 'example' + obj.type + this.boxList.length, width: 350, height: 300}
        console.log(this.chartItem, 'pppp')
        // this.boxList.push({...obj, id: obj.type + this.boxList.length});
        // this.isViewList = false;
      },
      cancel() {
        this.isProgressBar = false;
        this.title = '';
        this.chartItem = '';
      },
      retreat() {
        this.isSelect = 0;
        this.database = '1';
        this.table = '1';
      },
      nextStep() {
        if (!this.chartItem) {
          console.log('请现在图表');
          return;
        }
        this.isSelect = 1;
      },
      finish() {
        if (!this.title) {
          console.log('视图标题不能为空');
          this.viewMessage = true;
          return;
        }
        if (this.viewMessage){
          this.viewMessage = false;
        }
        for (let i=0;i<this.boxList.length;i++){
          if (this.boxList[i].name == this.title){
            console.log('当前标题已存在');
            return;
          }
        }
        this.chartItem.width = 500;
        this.chartItem.height = 500;
        this.chartItem.name = this.title;
        this.chartItem.id = this.chartItem.type + this.boxList.length;
        console.log(this.database, this.table, this.title, this.chartItem, '完成')
        this.boxList.push({...this.chartItem});
        this.isProgressBar = false;

        this.isSelect = 0;
        this.database = '1';
        this.table = '1';
        this.title = '';
        this.chartItem = null;
      },
      databaseSelect(event) {
        console.log(event.target.value, 'database')
      },
      tableSelect(event) {
        console.log(event.target.value, 'table')
      }
    }
  }
</script>

<style scoped>
  .Boxs {
    display: flex;
    flex-wrap: wrap;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progressBar {
    width: 800px;
    height: 500px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }

  .header {
    font-weight: 600;
  }

  .content {
    flex: 1;
    padding: 10px 0;
  }

  .prigress {
    display: flex;
    align-items: center;
    padding-top: 10px;
  }

  .prigress-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .prigress-item > .line {
    position: absolute;
    left: 50%;
    top: 15px;
    width: 100%;
    border-top: #00bcd4 2px solid;
    z-index: 1;
  }

  .prigress-item > .number {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #1e88e5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: yellow;
  }

  .select {
    display: flex;
    padding-top: 10px;
  }

  .select > .chartList {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .select > .chart-example {
    width: 60%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: #d5d5d5 2px solid;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }

  .footer > button {
    margin-left: 10px;
  }
</style>
