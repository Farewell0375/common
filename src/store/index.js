/*
 * @Author: FHP
 * @Description: vuex
 * @Date: 2022-09-01 19:00:59
 * @LastEditTime: 2022-09-01 21:22:46
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, v) {
      state.count ++
    }
  },
  actions: {
    increment (context) {
    }
  }
})
export default store
