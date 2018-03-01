<template>
<div class="par">
  <!-- 个人中心 -->
  <div class="info-main">
    <img :src="person.image_url" class="photo" @click="$router.push({path: '/user/alter'})">
    <p class="header">
      <span class="name">{{person.nickname}}</span>
      <span class="point">积分</span>
      <span class="point-val">{{person.score1}}</span>
    </p>
    <span class="qd" @click='toqd'>去签到</span>
  </div>
  <div class="service">
    <div class="service-item" v-for=" (ele, index) in service" @click="$router.push({path: ele.path})">
      <img :src="ele.img" class="imgs">
      <span>{{ele.title}}</span>
      <span class="right">></span>
    </div>
  </div>
  <!--<mt-button size="large" class="butt">退出当前账号</mt-button>-->
</div>
</template>

<script>
import { Button } from 'mint-ui'
import { ucuser_read, weixin_login } from 'api/common'
export default {
  name: 'toorder',
  data () {
    return {
      person: {},
      service: [{
        title: '我的消息',
        path: '/user/message',
        img:require('../../common/images/p_3.png')
      }, {
        title: '我的活动',
        path: '/user/sbjl',
        img:require('../../common/images/p_4.png')
      }, {
        title: '我的收藏',
        path: '/user/collection',
        img:require('../../common/images/p_7.png')
      }, {
        title: '我的养老记录',
        path: '/provideAged/person',
        img:require('../../common/images/p_5.png')
      }, {
        title: '我的邀请记录',
        path: '/women/invite_list',
        img:require('../../common/images/p_7.png')
      }, {
        title: '心理预约记录',
        path: '/women/yy_record',
        img:require('../../common/images/p_5.png')
      }, {
        title: '我的交友匹配',
        path: '/women/line',
        img:require('../../common/images/p_5.png')
      }, {
        title: '上报记录',
        path: '/user/sbjl',
        img:require('../../common/images/p_6.png')
      }, {
        title: '中奖纪录',
        path: '/user/sbjl',
        img:require('../../common/images/p_7.png')
      }]
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    toqd: function () {
      this.$router.push({path: '/user/mrqd'})
    },
    toalter: function () {
      this.$router.push({path: '/user/alter/#1'})
    }
  },
  activated: function () {
    ucuser_read().then((res)=>{
      this.person = res.data
      if(res.code == 200){
        localStorage.setItem('person', JSON.stringify(res.data))
      }else if(res.code == 401){
        weixin_login('#/user/home');
      }else{}
    })
  }
}
</script>

<style scoped>
.par {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 0.2rem;
  background-color: #ededed;
  background-attachment: fixed;
  background-size: cover;
}
.info-main {
  width: 100%;
  padding-top: 0.33rem;
  text-align: center;
  background-image: url(../../common/images/usertbg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left top;
}
.header {
  color: #fff;
  margin: 0.05rem 0 0;
  font-size: 0.15rem;
}
.photo {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 3px solid #fff;
}
.name{font-size: 0.26rem}
.butt {
  margin: 0.32rem 5% 0 5%;
  width:90%;
}
.point{
  margin-left: 0.2rem;
}
.point,.point-val{
  font-size: 0.26rem;
  
}
.qd {
  display: inline-block;
  margin: -0.03rem 0 0;
  border-radius: 0.2rem 0.2rem;
  font-size: 0.24rem;
  width: 1.3rem;
  line-height: 0.8rem;
  height: 0.8rem;
  color: #a88145;
  background: url(../../common/images/sign_bg.png) no-repeat center center;
  background-size: 100%;
}
.service {
  width: 100%;
  color: #333;
}
.service-item {
  width: 100%;
  line-height: 0.8rem;
  font-size: 0.28rem;
  border-bottom: 1px solid #d4d4d4;
  box-sizing: border-box;
  padding: 0 0.2rem;
}
.right {
  font-size: 0.15rem;
  float: right;
  transform: scaleY(2);
  color: #ccc;
}
.imgs {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: -7%;
  margin-right: 0.18rem;
}
</style>
