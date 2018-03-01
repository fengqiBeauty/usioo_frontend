import * as types from './mutation-types'
import store from '../store'

export const clearUserInfoData = function ({ commit }) {
  commit(types.SET_USERINFO, clearUserInfo())
}