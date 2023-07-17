//home组件测试专用

export const home = {
  data() {
    return {
      name: 'home-mixin',
      Num: 1
    }
  },
  beforeCreate() {
    console.log("mixin-beforeCreate")
  },
  created() {
    console.log("mixin-created")
  },
  beforeMount() {
    console.log("mixin-beforeMount")
  },
  mounted() {
    console.log("mixin-mounted")
  },
  beforeUpdate() {
    console.log("mixin-beforeUpdate")
  },
  updated() {
    console.log("mixin-updated")
  },
  beforeDestroy() {
    console.log("mixin-beforeDestroy")
  },
  destroyed() {
    console.log("mixin-destroyed")
  },
  methods: {
    add() {
      this.Num++
      console.log("mixin:" + this.Num)
    },
    sub() {
      this.Num--
      console.log("mixin:" + this.Num)
    }
  }

}
