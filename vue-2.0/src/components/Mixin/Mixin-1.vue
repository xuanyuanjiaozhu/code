<template>
  <div id="Mixin-1">
    <p>{{name}}</p>
    <div>
      <button @click="add">+</button>
      <span>{{Num}}</span>
      <button @click="sub">-</button>
    </div>
  </div>
</template>

<script>
  import {home} from "../../Utils/mixin-home";

  export default {
    name: "Mixin-1",
    mixins: [home],
    data() {
      return {
        name: 'home',
        Num: 4
      }
    },
    beforeCreate() {
      console.log("home-beforeCreate")
    },
    created() {
      console.log("home-created")
    },
    beforeMount() {
      console.log("home-beforeMount")
    },
    mounted() {
      console.log("home-mounted")
    },
    beforeUpdate() {
      console.log("home-beforeUpdate")
    },
    updated() {
      console.log("home-updated")
    },
    beforeDestroy() {
      console.log("home-beforeDestroy")
    },
    destroyed() {
      console.log("home-destroyed")
    },
    methods: {
      add() {
        this.Num++
        console.log("home:" + this.Num)
      },
      sub() {
        this.Num--
        console.log("home:" + this.Num)
      }
    }
  }
</script>

<style scoped>

</style>
