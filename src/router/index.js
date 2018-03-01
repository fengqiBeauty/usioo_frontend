import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import provideAged from '@/components/provideAged/provideAged'
import toorder from '@/components/provideAged/toorder'
import endorder from '@/components/provideAged/endorder'
import more from '@/components/provideAged/more'
import evaluate from '@/components/provideAged/evaluate'
import person from '@/components/provideAged/person'
import perfect from '@/components/provideAged/perfect'
import home from '@/components/user/home'
import alter from '@/components/user/alter'
import mrqd from '@/components/user/mrqd'
import bd from '@/components/user/bd'
import newkey from '@/components/user/newkey'
import nokey from '@/components/user/nokey'
import message from '@/components/user/message'
import collection from '@/components/user/collection'
import ssp from '@/components/cyzl/ssp'
import ssppj from '@/components/cyzl/ssppj'
import sspmain from '@/components/cyzl/sspmain'
import result from '@/components/cyzl/result'
import qa from '@/components/free/qa'
import qalist from '@/components/free/qalist'
import lottery from '@/components/free/lottery'
import worder from '@/components/women/order'
import yuyue from '@/components/women/yuyue'
import success from '@/components/women/success'
import hdybm from '@/components/women/hdybm'
import firend from '@/components/women/firend'
import sereva from '@/components/women/sereva'
import line from '@/components/women/line'
import eva2 from '@/components/women/eva2'
import invitation from '@/components/women/invitation'
import invite_evaluate from '@/components/women/invite_evaluate'
import person_eval from '@/components/women/person_eval'
import invite_list from '@/components/women/invite_list'
import yy_record from '@/components/women/yy_record'
import yy_eval from '@/components/women/yy_eval'
import del from '@/components/women/del'
import activity from '@/components/community/activity'
import com_activity from '@/components/community/com_activity'
import govern from '@/components/community/govern'
import before_act from '@/components/community/before_act'
import act_detail from '@/components/community/act_detail'
import com_order from '@/components/community/com_order'
import com_perfect from '@/components/community/com_perfect'
import com_enorder from '@/components/community/com_enorder'
import person_act from '@/components/community/person_act'
import com_eval from '@/components/community/com_eval'
import voteResults from '@/components/vote/voteResults'
import voteAnd from '@/components/vote/voteAnd'
import voteHome from '@/components/vote/voteHome'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  hashbang: true, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  /**
   * @desc 路由配置
   */
  routes: [
    {
      path: '/community/com_eval',
      component: com_eval,
      meta: {
        keepAlive: false,
        title:'我要评价'
      }
    }, {
      path: '/community/person_act',
      component: person_act,
      meta: {
        keepAlive: false,
        title:'我的活动记录'
      }
    }, {
      path: '/community/com_enorder',
      component: com_enorder,
      meta: {
        keepAlive: false,
        title:'预约成功'
      }
    }, {
      path: '/community/com_perfect',
      component: com_perfect,
      meta: {
        keepAlive: false,
        title:'完善个人信息'
      }
    }, {
      path: '/community/com_order',
      component: com_order,
      meta: {
        keepAlive: false,
        title:'我要预约'
      }
    }, {
      path: '/community/act_detail',
      component: act_detail,
      meta: {
        keepAlive: true,
        title:'社区活动详情'
      }
    }, {
      path: '/community/govern',
      component: govern,
      meta: {
        keepAlive: false,
        title:'参与治理'
      }
    }, {
      path: '/community/before_act',
      component: before_act,
      meta: {
        keepAlive: false,
        title:'往期活动'
      }
    }, {
      path: '/community/com_activity',
      component: com_activity,
      meta: {
        keepAlive: false,
        title:'社区活动首页'
      }
    }, {
      path: '/community/activity',
      component: activity,
      meta: {
        keepAlive: false,
        title:'当前活动'
      }
    }, {
      path: '/free/qalist',
      component: qalist,
      meta: {
        keepAlive: false,
        title:'题目列表'
      }
    }, {
      path: '/free/qa',
      component: qa,
      meta: {
        keepAlive: false,
        title:'答题'
      }
    }, {
      path: '/free/lottery',
      component: lottery,
      meta: {
        keepAlive: false,
        title:'抽奖'
      }
    },{
      path: '/cyzl/ssp',
      component: ssp,
      meta: {
        keepAlive: false,
        title:'随手拍列表'
      }
    }, {
      path: '/cyzl/ssppj',
      component: ssppj,
      meta: {
        keepAlive: false,
        title:'随手拍评价'
      }
    }, {
      path: '/cyzl/result',
      component: result,
      meta: {
        keepAlive: false,
        title:'查看处理结果'
      }
    }, {
      path: '/cyzl/sspmain',
      component: sspmain,
      meta: {
        keepAlive: false,
        title:'随手拍详情'
      }
    }, {
      path: '/provideAged/index',
      component: provideAged,
      meta: {
        keepAlive: false,
        title:'智慧养老首页'
      }
    }, {
      path: '/provideAged/more',
      component: more,
      meta: {
        keepAlive: true,
        title:'智慧养老详情'
      }
    }, {

      path: '/provideAged/toorder',
      component: toorder,
      meta: {
        keepAlive: false,
        title:'我要预约'
      }
    }, {
      path: '/provideAged/endorder',
      component: endorder,
      meta: {
        keepAlive: false,
        title:'预约成功'
      }
    }, {
      path: '/provideAged/evaluate',
      component: evaluate,
      meta: {
        keepAlive: false,
        title:'我要评价'
      }
    }, {
      path: '/provideAged/person',
      component: person,
      meta: {
        keepAlive: false,
        title:'我的养老记录'
      }
    }, {
      path: '/provideAged/perfect',
      component: perfect,
      meta: {
        keepAlive: true,
        title:'完善个人信息'
      }
    }, {
      path: '/user/mrqd',
      component: mrqd,
      meta: {
        keepAlive: true,
        title:'每日签到'
      }
    }, {
      path: '/user/newkey',
      component: newkey,
      meta: {
        keepAlive: false,
        title:'新密码'
      }
    }, {
      path: '/user/nokey',
      component: nokey,
      meta: {
        keepAlive: false,
        title:'忘记密码'
      }
    }, {
      path: '/user/bd',
      component: bd,
      meta: {
        keepAlive: false,
        title:'绑定'
      }
    }, {
      path: '/user/home',
      component: home,
      meta: {
        keepAlive: true,
        title:'个人中心'
      }
    }, {
      path: '/user/alter',
      component: alter,
      meta: {
        keepAlive: false,
        title:'修改资料'
      }
    },{
      path: '/user/collection',
      component: collection,
      meta: {
        keepAlive: false,
        title:'我的收藏'
      }
    }, {
      path: '/user/message',
      component: message,
      meta: {
        keepAlive: true,
        title:'消息列表'
      }
    }, {
      path: '/women/sereva',
      component: sereva,
      meta: {
        keepAlive: false,
        title:'服务评价'
      }
    }, {
      path: '/women/eva2',
      component: eva2,
      meta: {
        keepAlive: false,
        title:'活动评价'
      }
    },{
      path: '/women/order',
      component: worder,
      meta: {
        keepAlive: false,
        title:'心理咨询预约'
      }
    }, {
      path: '/women/yuyue',
      component: yuyue,
      meta: {
        keepAlive: false,
        title:'预约信息'
      }
    }, {
      path: '/women/yy_record',
      component: yy_record,
      meta: {
        keepAlive: false,
        title:'心理预约记录'
      }
    }, {
      path: '/women/yy_eval',
      component: yy_eval,
      meta: {
        keepAlive: false,
        title:'心理预约评价'
      }
    }, {
      path: '/women/hdybm',
      component: hdybm,
      meta: {
        keepAlive: false,
        title:'活动预报名'
      }
    }, {
      path: '/women/success',
      component: success,
      meta: {
        keepAlive: false,
        title:'预约成功'
      }
    }, {
      path: '/women/firend',
      component: firend,
      meta: {
        keepAlive: false,
        title:'交友'
      }
    }, {
      path: '/women/del',
      component: del,
      meta: {
        keepAlive: false,
        title:'报名详情'
      }
    }, {
      path: '/women/invite_evaluate',
      component: invite_evaluate,
      meta: {
        keepAlive: false,
        title:'邀请人'
      }
    }, {
      path: '/women/line',
      component: line,
      meta: {
        keepAlive: false,
        title:'在线预约'
      }
    }, {
      path: '/women/person_eval',
      component: person_eval,
      meta: {
        keepAlive: false,
        title:'邀请人评价'
      }
    }, {
      path: '/women/invitation',
      component: invitation,
      meta: {
        keepAlive: false,
        title:'邀请申请'
      }
    }, {
      path: '/women/invite_list',
      component: invite_list,
      meta: {
        keepAlive: false,
        title:'邀请列表'
      }
    }, {
      path: '/vote/voteHome',
      component: voteHome,
      meta: {
        keepAlive: false,
        title:'投票首页'
      }
    }, {
      path: '/vote/voteAnd',
      component: voteAnd,
      meta: {
        keepAlive: false,
        title:'投票'
      }
    }, {
      path: '/vote/voteResults',
      component: voteResults,
      meta: {
        keepAlive: false,
        title:'投票结果'
      }
    },{
      path: '/*',
      component: index,
      meta: {
        keepAlive: false
      }
    }
  ]
})
/**
 * @desc 全局监听路由变化
 */
router.beforeEach((to, from, next) => {
  next()
})

export default router
