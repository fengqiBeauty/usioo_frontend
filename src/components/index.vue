<template>
<div>
  <div v-for="ele in routes" class="a" @click="$router.push({path: ele.path})">
    <span class="c">{{ele.name}}</span>
    <span class="b">{{ele.path}}</span>
  </div>
  <a class="c">设置测试用的uid</a><br /><br />
  <input type="text" v-model="uid"> <span  @click='set_test_uid'>确定</span><br>
  <a class="c" @click='get_session'>查询登录信息</a><br /><br />
  <a class="c" @click='del_session'>清除登录历史</a><br /><br />
</div>
</template>

<script>
import { Htp } from 'api/config'
import { comfunction } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      uid:'123',
      routes: [{
        path: '/provideAged/toorder',
        name: '智慧养老/预约',
        component: 'toorder'
      }, {
        path: '/provideAged/endorder',
        name: '智慧养老/预约成功',
        component: 'endorder'
      }, {
        path: '/provideAged/more',
        name: '智慧养老/养老详情',
        component: 'more'
      }, {
        path: '/provideAged/evaluate',
        name: '智慧养老/养老评价',
        component: 'evaluate'
      }, {
        path: '/provideAged/person',
        name: '智慧养老/个人养老列表',
        component: 'person'
      }, {
        path: '/provideAged/index',
        name: '智慧养老/类别展示&列表',
        component: 'provideAged'
      }, {
        path: '/user/home',
        name: '个人中心/个人中心',
        component: 'home'
      }, {
        path: '/user/mrqd',
        name: '个人中心/每日签到',
        component: 'mrqd'
      }, {
        path: '/user/bd',
        name: '个人中心/绑定',
        component: 'bd'
      }, {
        path: '/user/newkey',
        name: '个人中心/新密码',
        component: 'newkey'
      }, {
        path: '/user/nokey',
        name: '个人中心/忘记密码',
        component: 'nokey'
      }, {
        path: '/user/message',
        name: '个人中心/消息列表',
        component: 'message'
      }, {
        path: '/user/alter',
        name: '个人中心/修改信息',
        component: 'alter'
      }, {
        path: '/cyzl/ssp',
        name: '参与治理/随手拍列表',
        component: 'ssp'
      }, {
        path: '/cyzl/ssppj',
        name: '参与治理/随手拍评价',
        component: 'ssppj'
      }, {
        path: '/cyzl/sspmain',
        name: '参与治理/随手拍详情',
        component: 'sspmain'
      }, {
        path: '/cyzl/result',
        name: '参与治理/查看处理结果',
        component: 'result'
      }, {
        path: '/free/qa',
        name: '免费领/答题',
        component: 'qa'
      }, {
        path: '/free/qalist',
        name: '免费领/题目列表',
        component: 'qalist'
      }, {
        path: '/free/lottery',
        name: '免费领/抽奖',
        component: 'lottery'
      },{
        path: '/women/order',
        name: '妇联/心理咨询预约',
        component: 'order'
      }, {
        path: '/women/yuyue',
        name: '妇联/预约信息',
        component: 'yuyue'
      }, {
        path: '/women/firend',
        name: '妇联/交友',
        component: 'firend'
      }, {
        path: '/women/sereva',
        name: '妇联/评价',
        component: 'sereva'
      },{
        path: '/women/line',
        name: '妇联/匹配列表',
        component: 'line'
      }, {
        path: '/women/success',
        name: '妇联/预约成功',
        component: 'success'
      }, {
        path: '/women/hdybm',
        name: '妇联/活动预报名',
        component: 'success'
      }, {
        path: '/women/invitation',
        name: '妇联/邀请申请',
        component: 'invitation'
      }, {
        path: '/women/eva2',
        name: '妇联/交友活动评价',
        component: 'eva2'
      }, {
        path: '/women/invite_evaluate',
        name: '妇联/邀请人评价',
        component: 'invite_evaluate'
      }, {
        path: '/women/invite_list',
        name: '妇联/邀请列表',
        component: 'invite_list'
      }, {
        path: '/women/del',
        name: '妇联/个人报名详情',
        component: 'del'
      }, {
        path: '/community/activity',
        name: '活动社区/当前活动',
        component: 'activity'
      }, {
        path: '/community/com_activity',
        name: '活动社区/社区活动首页',
        component: 'com_activity'
      }, 
      {
        path: '/community/govern',
        name: '活动社区/参与治理首页',
        component: 'govern'
      }, {
        path: '/community/act_detail',
        name: '活动社区/社区活动详情',
        component: 'act_detail'
      }, {
        path: '/vote/voteHome',
        name: '投票/投票首页',
        component: 'voteHome'
      }, {
        path: '/vote/voteAnd',
        name: '投票/投票',
        component: 'voteAnd'
      }, {
        path: '/vote/voteResults',
        name: '投票/结果',
        component: 'voteResults'
      },{
        path: '/*',
        name: '~~~~~~~~~~~~~~~~~~~~',
        component: 'index'
      }]
    }
  },
  components: {
  },
  methods: {
    set_test_uid: function () {
      comfunction({
        params: {
          'uid': this.uid
        }
      }, Htp + '/ucuser/api/set_test_uid').then((res) => {
        if(res.code == 200){
          alert(res.data)
        }
      })
    },
    get_session: function () {
      comfunction({
        params: {}
      }, Htp + '/ucuser/api/get_session').then((res) => {
        if(res.code == 200){
          alert(res.data.uid)
        }
      })
    },
    del_session: function () {
      comfunction({
        params: {}
      }, Htp + '/ucuser/api/del_session').then((res) => {
        if(res.code == 200){
          console.log(res)
          alert(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .a {
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.28rem;
  }

  .c{
    text-decoration: underline;
    color: red;
  }
</style>
