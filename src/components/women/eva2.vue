<template>
<div>
  <!-- 活动评价 -->
  <p class="title">活动评分</p>
  <div class="star st" @click='check(fy)'>
    <!-- <input type="radio" name="a" v-for="(e, i) in 6" :value="i" :checked="i === fy" v-model="fy"> -->
      <yd-rate slot="left" v-model="fy" active-color="#f39e34"></yd-rate>
    <span class="starval">{{pingjia}}</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对该活动的评价吧" v-model="remark"></textarea>
  <p class="title">对他 / 她评分</p>
  <div class="star st" @click='check2(fy2)'>
    <!-- <input type="radio" name="a" v-for="(e, i) in 6" :value="i" :checked="i === fy" v-model="fy"> -->
      <yd-rate slot="left" v-model="fy2" active-color="#f39e34"></yd-rate>    
    <span class="starval">{{pingjia2}}</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对他 / 她的评价吧" v-model="remark"></textarea>
  <p class="title">其他建议或者意见反馈</p>
  <textarea class="remark pj" placeholder="其他建议或者意见反馈" v-model="remark"></textarea>
  <mt-button size="large" class="butt"  @click='clickFn'>提交</mt-button>
</div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate'
import { smartpension_evaluate_self, weixin_login } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      pingjia: '超高',
      pingjia2: '超高',
      title: '',
      remark: '',
      yz: '',
      fy: 5,
      fy2: 5,
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
        }else if(res.code === 401){
          weixin_login('#/women/sereva')
        } else {
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
    check2: function (fy) {
      this.pingjia2 = this.pjlist[fy - 1];
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
  /* font-size: 0.16rem; */
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
  font-size: 0.16rem;
  left: 3.2rem;
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
  min-height: 1.2rem;
  line-height: 0.3rem;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem;
}
.yzq {
  line-height: 0.6rem;
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
