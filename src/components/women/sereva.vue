<template>
<div v-if="eval">
  <!-- 服务评价 -->
  <p class="title">本次心理咨询评分</p>
  <div class="star st" @click='check(fy)'>
    <!-- <input type="radio" name="a" v-for="(e, i) in 6" :value="i" :checked="i === fy" v-model="fy"> -->
    <yd-rate slot="left"  active-color="#f39e34" size="0.42rem" v-model="fy"></yd-rate>
    <span class="starval">{{pingjia}}</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对该咨询的评价" v-model="remark"></textarea>
  <p class="title">其他建议或者意见反馈</p>
  <textarea class="remark pj" placeholder="其他建议或者意见反馈" v-model="remark"></textarea>
  <div class="yzq">
    <input class="remark yz" type="text" placeholder="输入右侧验证码" v-model="yz" maxlength="4">
    <img :src="imgsrc" class="yzimg" @click='cyzm'>
  </div>
  <mt-button size="large" class="butt"  @click='clickFn'>提交</mt-button>
</div>
<div v-else>
  <p class="success pa">评价成功!</p>
  <p class="paicon pa"><i class="fa fa-check sa"></i></p>
  <mt-button size="large" class="butt"  @click='clickFn'>确认</mt-button>
</div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate';
import { smartpension_evaluate_self } from 'api/common'
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
      eval:true,
      imgsrc: '../../../static/logo.png',
      pjlist: ['很不满意', '不满意', '一般', '赞!', '超高']
    }
  },
  components: {
    'mt-button': Button,
    'yd-rate': Rate,
  },
  methods: {
    //点击提交
    clickFn: function () {
      this.eval = false;
    },
    check: function (fy) {
      this.pingjia = this.pjlist[fy-1];
    },
    //切换验证码
    cyzm: function () {
      this.imgsrc = 'api'+'/smartpension/pension_evaluate/getCaptcha/' + new Date().getTime()
    }
  },
  created: function () {
    if (!localStorage.getItem('ortitle') || !localStorage.getItem('jglist') || !localStorage.getItem('orid')) {
      this.$router.push({path: '/provideAged/more'})
    }
    this.title = localStorage.getItem('ortitle')
    this.cyzm()
  }
}
</script>

<style scoped>
.title {
  padding: 0.2rem 0.2rem 0 0.2rem;
  font-weight: 600;
  margin: 0;
}
.butt {
  margin: 0.3rem 5% 0.2rem 5%;
  width:90%;
  letter-spacing: 0.1rem;
}
.st {
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
  margin-left: 0.15rem;
  align-items: center;
}
.starval {
  margin-left: 10px;
  font-size: 0.24rem;
  font-weight: 700;
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
  min-height: 1.2rem;
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

.info {
  color: #6c6c6c;
  font-size: 16px;
  max-width: 70%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  padding-top: 0.2rem;
}
.sa {
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  border-radius: 50%;
  background-color: #6FC771;
  color: #fff;
}
.paicon {
  margin: 30px 0 60px 0;
}
.info {
  color: #6c6c6c;
  font-size: 16px;
  max-width: 70%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  padding-top: 0.2rem;
}
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
}
.pa {
  text-align: center;
}
.success {
  margin-top: 1.5rem;
  font-size: 0.35rem;
  font-weight: 700;
}
</style>
