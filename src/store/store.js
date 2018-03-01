import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  count: '',
  order: ''
}
const mutations = {
  add (state, n) {
    state.count = state.count + ',' + n
  },
  addorder (state, n) {
    state.order = n
  }
}
const getters = {
  count (state) {
    return state.count
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
/**
 *  <p>{{$store.state.order}}</p>
    <p @click="$store.commit('addorder', 5)">{{$store.getters.count}}</p>
 */
