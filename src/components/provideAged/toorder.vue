<template>
<div class="bg">
  <!-- 我要预约 -->
  <div class="f-person" @click="perfect" v-if="!showCard">
    <div class="f-Licon">
      <div class="head_pic">
        <span class="iconfont icon-touxiang2 f-icon_people"></span>
      </div>
    </div>
    <div class="f-card">
      <span class="addText">请您完善个人信息</span>
    </div>
    <div class="f-Ricon">
      <span class="iconfont icon-gengduo"></span>
    </div>
  </div>

  <div class="f-person" @click="perfect" v-if="showCard">
    <div class="f-Licon">
      <div class="head_pic">
        <img :src="user.image_url" alt="">
      </div>
    </div>
    <div class="f-card">
      <p><span class="user_name">{{expand_info.real_name}}</span><span class="user_sex"  v-text="user.sex == 1?'男':(user.sex == 2?'女':'保密')"></span></p>
      <p>手机号：{{expand_info.phone}}</p>
      <p>身份证：{{expand_info.id_card}}</p>
    </div>
    <div class="f-Ricon">
      <span class="iconfont icon-gengduo"></span>
    </div>
  </div>
  <div class="f-person2">
    <p class="info">
      <span>项目</span>
      <span>{{xm}}</span>
    </p>
    <p class="info" @click="over = true">
      <span>机构选择</span>
      <span>{{jg}}></span>
    </p>
    <p class="info"><span>备注</span><input class="remark" type="text" placeholder="请填写备注" v-model='remark'></p>
  </div>
  <mt-button size="large" class="butt" @click='clickFn'>提交</mt-button>
  <transition name="fade">
  <div class="over slo" v-show='over'>
    <mt-picker :slots="slots" @change="onValuesChange" class="f-picker"></mt-picker>
    <!-- <button class="butts" @click="over = false">返回</button> -->
    <mt-button size="large" class="butts" @click='over = false'>确定</mt-button>
  </div>
  </transition>
  <!-- <div class="tagging">技术支持 感识科技</div> -->
</div>
</template>

<script>
import { Button, Picker, Toast } from 'mint-ui'
import { smartpension_save, ucuser_read, weixin_login } from 'api/common'
export default {
  name: 'toorder',
  data () {
    return {
      remark: '',
      xm: '',
      jg: '',
      pid: '',
      over: false,
      jgs: [],
      slots: [{
        flex: 1,
        values: [1, 3],
        className: 'slot1'
      }],
      user:{},
      expand_info:{},
      showCard:''
    }
  },
  components: {
    'mt-button': Button,
    'mt-picker': Picker
  },
  methods: {
    // 点击提交
    clickFn: function () {
      // 判断个人信息是否完整
      if(this.expand_info.real_name == '' || this.expand_info.id_card == '' || this.expand_info.phone == ''){
        Toast({
          message: '请完善您的个人信息~',
          duration: 1000
        })
        return;
      }
      //如果信息完整的话向后台提交
      smartpension_save({
        'pension_id': this.pid,
        'organ_id': this.jg.split('.')[0],
        'remark': this.remark
      }).then((res) => {
        if (res.code === 200) {
          this.$router.push({path: '/provideAged/endorder'})
        }else if(res.code === 401){
          weixin_login('#/provideAged/toorder')
        } else {
          Toast({
            message: res.message,
            duration: 1000
          })
        }
      })
    },
    onValuesChange: function (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
      this.jg = values[0]
    },
    //完善个人信息
    perfect(){
      this.$router.push({path:'/provideAged/perfect'})
    }
  },
  mounted: function () {
    if (!localStorage.getItem('ortitle') || !localStorage.getItem('jglist') || !localStorage.getItem('orid')) {
      this.$router.push({path: '/provideAged/more'})
    }
    this.pid = localStorage.getItem('orid')
    this.xm = localStorage.getItem('ortitle')
    let arr = JSON.parse(localStorage.getItem('jglist'))
    let a = []
    for (var i in arr) {
      a.push(arr[i].id + '.' + arr[i].name)
    }
    this.jgs = a
    this.slots[0].values = this.jgs
    this.jg = this.jgs[0];
    //获取用户信息
    ucuser_read().then((res) => {
      //先判断是否登录
      if (res.code === 200) {
        this.user = res.data;
        this.expand_info = this.user.expand_info;
        localStorage.setItem('expand_info',JSON.stringify(this.expand_info));
        if(this.expand_info.phone == '' || this.expand_info.id_card == '' || this.expand_info.real_name == ''){
          this.showCard = false;
        }else{
          this.showCard = true;
        }
      }else if(res.code === 401){
        weixin_login('#/provideAged/toorder')
      }
    })

  }
}
</script>

<style scoped>
.addText{font-size: 0.36rem;}
.f-person{height:2.5rem;background-color: #fff;margin: 10px 0;display: flex;}
.f-card{flex:11;
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 20px;}
.f-Licon{flex:1;
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding-left: 10px;
}
.f-Ricon{flex:2;
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  justify-content: center
}
.f-sex{margin-left: 40px;}
.f-person2{height: 3rem;background-color: #fff;margin: 10px 0;}
.f-icon_people{font-size: 1.3rem;color:#ccc;}
.head_pic img{width: 1.5rem;height: 1.5rem;border-radius: 50%;}
.info {
  /* font-size: 0.28rem; */
  line-height: 0.8rem;
  border-bottom: 1px solid #E9E9E9;
  box-sizing: border-box;
  padding: 0 0.1rem;
  overflow:hidden;
  letter-spacing: 0.002rem;
}
.slo {
  background-color: rgba(211, 211, 211, 0.95);
  z-index: 1;
}
.info {
  margin: 0;
}
.info span {
  overflow: hidden;
}
.info span:nth-child(2) {
  float:right;
  color: #808080;
}
.butt {
  margin: 0.5rem 5% 0.2rem 5%;
  width:90%;
  letter-spacing: 0.1rem;
}
.remark {
  width: 100%;
  display: block;
  border: none;
  margin-bottom: 0.2rem;
  font-size: 0.26rem;
}
.butts {
  margin: 0.2rem 30%;
  width:40%;
  text-align: center;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  height: 0.6rem;
  color: #5aa8e1;
  background-color: #e3f7fe;
}
.bg {
  min-height: 100%;
  overflow: hidden;
  background-color: #ededed;
}
.user_name{font-size: 0.4rem;}
.user_sex{margin-left: 30px;}
.tagging{position: absolute;bottom: 10px;font-size: 0.2rem;left:35%;color: #ccc;}

</style>
