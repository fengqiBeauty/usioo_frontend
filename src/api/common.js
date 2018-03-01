import axios from 'axios'
import { Htp } from './config'

export function comfunction(param, url, type = 'get') {
  if (type == 'get') {
    return axios.get(url, param).then((res) => {
      return Promise.resolve(res.data)
    })
  }
  if (type == 'post') {
    return axios.post(url, param).then((res) => {
      return Promise.resolve(res.data)
    })
  }
  if (type == 'image') {
    return axios.post(url, param, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
}
//--------------------微信登录----------------------
export function weixin_login(param){
  let Base64 = require('js-base64').Base64;
  var target_url = Base64.encode(param);
  return window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b2e4ca610362400&redirect_uri=https%3A%2F%2Fusioo.com%2Fucuser%2Fapi%2Foauth_callback%2Ftarget_url%2F"+target_url+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
}
//----------------智慧养老模块-----------------------
// 个人养老评价列表
export function pension_evaluate_self(param) {
  return comfunction(param, Htp + '/smartpension/pension_evaluate/self')
}
// 获取用户资料
export function ucuser_read(param) {
  return comfunction(param, Htp + '/ucuser/api/read')
}
// 修改用户资料
export function ucuser_update(param) {
  return comfunction(param, Htp + '/ucuser/api/update', 'post')
}
// 修改用户头像
export function ucuser_edit_avatar(param) {
  return comfunction(param, Htp + '/ucuser/api/edit_avatar', 'image')
}
// 养老项目预约
export function smartpension_save(param) {
  return comfunction(param, Htp + '/smartpension/record/save', 'post')
}
// 个人养老评价列表
export function smartpension_evaluate_self(param) {
  return comfunction(param, Htp + '/smartpension/record/save')
}
// 个人养老列表
export function smartpension_record(param) {
  return comfunction(param, Htp + '/smartpension/record')
}
// 提交养老评价
export function smartpension_evaluate_save(param) {
  return comfunction(param, Htp + '/smartpension/pension_evaluate/save', 'post')
}
// 养老项目列表
export function smartpension_pension(param) {
  return comfunction(param, Htp + '/smartpension/pension')
}
// 增加查看次数
export function smartpension_pension_add_views(param) {
  return comfunction(param, Htp + '/smartpension/pension/add_views', 'post')
}
// 养老项目分类
export function smartpension_cate(param) {
  return comfunction(param, Htp + '/smartpension/cate')
}
// 指定项目的评价列表
export function smartpension_pension_evaluate(param) {
  return comfunction(param, Htp + '/smartpension/pension_evaluate')
}
// 收藏或取消收藏
export function smartpension_change_like(param) {
  return comfunction(param, Htp + '/smartpension/pension/change_like', 'post')
}
// 养老项目详情
export function smartpension_pension_read(param) {
  return comfunction(param, Htp + '/smartpension/pension/read')
}
// 个人收藏列表
export function pension_like_list(param) {
  return comfunction(param, Htp + '/smartpension/pension/like_list')
}
//----------------通用上传图片接口---------------
export function upload_picture(param) {
  return comfunction(param, Htp + '/ucuser/api/upload_picture_base64', 'image')
}
//----------------妇联模块-----------------------
// 单身交友首页
export function activity_women(param) {
  return comfunction(param, Htp + '/activity/activity_api/women')
}

// 单身交友报名
export function women_enter_save(param) {
  return comfunction(param, Htp + '/activity/women_enter_name/save', 'post')
}
// 邀请记录列表
export function women_invite(param) {
  return comfunction(param, Htp + '/activity/women_invite')
}
// 个人报名列表
export function women_enter_name(param) {
  return comfunction(param, Htp + '/activity/women_enter_name')
}
// 个人报名详情
export function women_enter_read(param) {
  return comfunction(param, Htp + '/activity/women_enter_name/read')
}
// 取消报名
export function women_enter_cancel(param) {
  return comfunction(param, Htp + '/activity/women_enter_name/cancel')
}
// 匹配的报名列表
export function women_match_list(param) {
  return comfunction(param, Htp + '/activity/women_enter_name/match_list')
}
// 查看指定的报名详情
export function enter_name_info(param) {
  return comfunction(param, Htp + '/activity/women_enter_name/enter_name_info')
}
// 不感兴趣
export function not_interest(param) {
  return comfunction(param, Htp + '/activity/women_invite/not_interest')
}
// 交友邀请
export function activity_invite(param) {
  return comfunction(param, Htp + '/activity/women_invite/invite')
}
// 同意邀请
export function agree_invite(param) {
  return comfunction(param, Htp + '/activity/women_invite/agree_invite')
}
// 拒绝邀请
export function reject_invite(param) {
  return comfunction(param, Htp + '/activity/women_invite/reject_invite')
}
// 邀请评价
export function women_evaluate(param) {
  return comfunction(param, Htp + '/activity/women_evaluate/evaluate')
}
// 获取指定报名的评价列表
export function zd_women_evaluate(param) {
  return comfunction(param, Htp + '/activity/women_evaluate')
}
// 社区活动列表
export function sq_community(param) {
  return comfunction(param, Htp + '/activity/activity_api/community')
}
// -----------------------心理预约模块----------------------
// 心理预约项目列表
export function mental_project_list(param){
	return comfunction(param,Htp + '/mental/mental_project')
}
// 心理预约
export function mental_order(param){
	return comfunction(param,Htp + '/mental/record/save')
}
// 心理预约记录
export function mental_record(param){
	return comfunction(param,Htp + '/mental/record')
}
// 提交心理预约评价
export function mental_evaluate(param){
	return comfunction(param,Htp + '/mental/evaluate/save', 'post')
}
// 指定项目的评价列表
export function get_mental_evaluate(param){
	return comfunction(param,Htp + '/mental/evaluate')
}
//-----------------------投票模块--------------------------
// 投票首页列表
export function voting_home_title(param){
	return comfunction(param,Htp + '/vote/vote_project')
}
// 投票结果
export function voting_results(param){
	return comfunction(param,Htp + '/vote/vote_project/slides')
}
// 投票详情
export function voting_details(param){
	return comfunction(param,Htp + '/vote/vote_project/read')
}
// 点击投票
export function to_vote(param){
	return comfunction(param,Htp + '/vote/vote_record/save')
}

//------------------------免费领----------------------------
//问卷列表
export function free_list(param){
	return comfunction(param,Htp + '/freeget/askpaper')
}
//问卷题目列表
export function free_question(param){
	return comfunction(param,Htp + '/freeget/question')
}
//提交答卷
export function free_question_list(param){
	return comfunction(param,Htp + '/freeget/question/save')
}
//奖品列表
export function free_prizes_list(param){
	return comfunction(param,Htp + '/freeget/prize')
}
//点击抽奖
export function free_prizes(param){
	return comfunction(param,Htp + '/freeget/record/save')
}
//抽奖记录
export function free_prizes_record(param){
	return comfunction(param,Htp + '/freeget/record')
}



