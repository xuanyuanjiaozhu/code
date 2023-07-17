<template>
  <div id="Store-1">
    <p>{{$store.state.name}}</p>
    <div>
      <button @click="add">+</button>
      <span>{{$store.state.Num}}</span>
      <button @click="sub">-</button>
    </div>
    <div>
      <button @click="multiply">*</button>
      <span>{{$store.state.Sum}}</span>
      <button @click="divide">/</button>
    </div>
    <div>
      <p>{{$store.getters.getNum}}</p>
      <p>{{$store.getters.getSum}}</p>
    </div>
    <div>
      <p>{{$store.state.moduleTest.name}}</p>
      <div>
        <span>{{$store.state.moduleTest.Num}}</span>
      </div>
      <button @click="moduleTestAdd">+</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Store-1",
    data() {
      return {
        Num: 1
      }
    },
    mounted() {
      console.log(this)
    },
    methods: {
      add() {
        this.$store.commit("add");
      },
      sub() {
        this.$store.commit("sub")
      },
      multiply() {
        this.$store.dispatch("multiply")
      },
      divide() {
        this.$store.dispatch("divide")
      },
      moduleTestAdd(){
        this.$store.commit("moduleTest/setNum")
      }
    }
  }
</script>

<style scoped>

</style>
