import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = saveUserInfo(userinfo)
  }
}

export default mutations