<template>
  <div id="Store-2">
    <div>
      <p>{{name}}</p>
      <p>{{Num}}</p>
      <p>{{Sum}}</p>
    </div>
    <div>
      <p>{{getNum}}</p>
      <p>{{getSum}}</p>
    </div>
    <div>
      <button @click="add">add</button>
      <button @click="sub">sub</button>
      <button @click="mul">mul</button>
      <button @click="div">div</button>
      <button @click="multiply">multiply</button>
      <button @click="divide">divide</button>
    </div>
    <div>
      <p>{{nameM}}</p>
      <p>{{NumM}}</p>
      <button @click="setNum">setNum</button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters,mapMutations,mapActions} from "vuex"

  export default {
    name: "Store-2",
    data() {
      return {}
    },
    computed: {
      ...mapState(['name', 'Num', 'Sum']),
      ...mapGetters(['getNum', 'getSum']),
      ...mapState('moduleTest',['nameM','NumM']),
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['add','sub','mul','div']),
      ...mapActions(['multiply','divide']),
      ...mapMutations('moduleTest',['setNum'])
    }
  }
</script>

<style scoped>

</style>
