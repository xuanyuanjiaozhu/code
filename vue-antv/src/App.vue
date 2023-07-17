<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      name:'test',
    }
  },
  beforeCreate() {
    // console.log(this.name,"beforeCreate");
    // this.test("beforeCreate")
  },
  created() {
    // console.log(this.name,"created")
    this.test("created")

  },
  methods:{
    test(name){
      console.log(name)
    }
  }
}
</script>

<style>
</style>
