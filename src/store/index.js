import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    num: '',
  },
  mutations: {
    setNum(state, i) {
      state.num = i
    },
  },
  actions: {},
  modules: {},
  getters: {},
})
