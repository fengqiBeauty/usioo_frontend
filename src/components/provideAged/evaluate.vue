<template>
<div>
  <!-- 我要评价 -->
  <p class="title">{{title}}</p>
  <div class="f-star" @click='check(fy)'>
    <yd-rate slot="left" v-model="fy" active-color="#f39e34"></yd-rate>
    <span class="f-starval">{{pingjia}}</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对该活动的评价吧" v-model="remark"></textarea>
  <!-- <div class="yzq">
    <input class="remark yz" type="text" placeholder="输入右侧验证码" v-model="yz" maxlength="4">
    <img :src="imgsrc" class="yzimg" @click='cyzm'>
  </div> -->
  <mt-button size="large" class="butt"  @click='clickFn'>提交</mt-button>
</div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate'
import { weixin_login,smartpension_evaluate_self,ucuser_read } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      pingjia: '超高',
      title: '',
      remark: '',
      yz: '',
      fy: 5,
      num: 0,
      imgsrc: '../../../static/logo.png',
      pjlist: ['很不满意', '不满意', '一般', '赞!', '超高']
    }
  },
  components: {
    'mt-button': Button,
    'yd-rate': Rate
  },
  methods: {
    //点击提交按钮的时候
    clickFn: function () {
      smartpension_evaluate_self({
        'pension_record_id': window.location.href.split('#pid')[1],
        'content': this.remark,
        'organ_star': this.fy,
        'captcha': this.yz
      }).then((res) => {
        if (res.code === 200) {
          Toast({
            message: '评价成功',
            iconClass: 'fa fa-check',
            duration: 1000
          })
          setTimeout(function () {
            history.go(-2)
          }, 1000)
        }else {
          Toast({
            message: res.message,
            duration: 1000
          })
          this.cyzm()
        }
      })
    },
    check: function (fy) {
      this.pingjia = this.pjlist[fy - 1];
    },
    cyzm: function () {
      this.imgsrc = 'api'+'/smartpension/pension_evaluate/getCaptcha/' + new Date().getTime()
    }
  },
  created: function () {
    ucuser_read().then((res) => {
      if(res.code == 401 || !localStorage.getItem('person')){
        weixin_login('#/provideAged/evaluate');
      }else{}
    })
    if (!localStorage.getItem('ortitle') || !localStorage.getItem('jglist') || !localStorage.getItem('orid')) {
      this.$router.push({path: '/provideAged/more'})
    }
    this.title = localStorage.getItem('ortitle')
    this.cyzm()
  }
}
</script>

<style scoped>
.f-star{display: -webkit-box;display: -webkit-flex;display: flex;-moz-box-align: center; -webkit-box-align: center;align-items: center;padding-left: 0.2rem;}
.f-starval {
  font-size: 0.24rem;
  font-weight: 700;
  margin-left: 10px;
}
.title {
  padding: 0.2rem 0.2rem 0 0.2rem;
  margin: 0;
}
.butt {
  margin: 0.3rem 5% 0.2rem 5%;
  width:90%;
  letter-spacing: 0.1rem;
}
.st {
  position: relative;
  margin-left: 0.15rem;
}
.starval {
  position: absolute;
  font-size: 0.24rem;
  left: 3rem;
  top: 0.2rem;
  overflow: hidden;
}
.remark {
  font-size: 0.24rem;
  resize: none;
}
.pj {
  display: block;
  margin-top: 0.25rem;
  width: 100%;
  border: 1px solid #E9E9E9;
  min-height: 2rem;
  line-height: 0.3rem;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem;
}
.yzq {
  line-height: 0.8rem;
}
.yz {
  height: 0.3rem;
  width: 65%;
  border: none;
  margin-left: 3%;
  border-bottom: 1px solid #E9E9E9;
  line-height: 0.3rem;
}
.yzimg {
  width: 20%;
  height: 0.4rem;
  vertical-align: -20%;
}
</style>
