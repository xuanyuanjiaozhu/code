import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
  name: "store",
  Num: 1,
  Sum: 1,
  keepAliveInclude: [],

}
const actions = {
  multiply(store) {
    store.commit("mul")
  },
  divide(store) {
    store.commit("div")
  },
  setKeepAliveInclude({commit}, keepAliveInclude) {
    commit("SET_KEEPALIVEINCLUDE", keepAliveInclude)
  }
}
const mutations = {
  add(state) {
    return state.Num++
  },
  sub(state) {
    return state.Num--
  },
  mul(state) {
    return state.Sum *= 2
  },
  div(state) {
    return state.Sum /= 2
  },
  SET_KEEPALIVEINCLUDE: (state, keepAliveInclude) => {
    return state.keepAliveInclude = keepAliveInclude;
  }

}
const getters = {
  getNum(state) {
    return state.Num * state.Sum
  },
  getSum(state) {
    return state.Num + state.Sum
  },
  getKeepAliveInclude(state) {
    return state.keepAliveInclude
  }
}

const moduleTest = {
  namespaced: true,
  state: {
    nameM: 'noduleTest',
    NumM: 1,
  },
  mutations: {
    setNum(state) {
      return state.NumM++
    },
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    moduleTest
  }
})
