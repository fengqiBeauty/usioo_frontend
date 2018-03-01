<template>
<div class="par">
  <div class="pitem">
    <span class="ptitle">真实姓名</span><input class="yz" type="text" placeholder="请输入您的真实姓名">
  </div>
  <div class="pitem">
    <span class="ptitle">身份证号</span><input class="yz" type="password" placeholder="请输入您的身份证号">
  </div>
  <div class="pitem">
    <span class="ptitle">手机号码</span><input class="yz" type="text" placeholder="请输入您的手机号码">
  </div>
  <div class="pitem">
    <span class="ptitle">设置密码</span><input class="yz" type="password" placeholder="请输入密码">
  </div>
  <div class="buts">
    <mt-button size="large" class="butt butt1" @click='clickFn'>注册</mt-button>
    <mt-button size="large" class="butt" @click='clickFn'>已有账号,直接登陆</mt-button>
  </div>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'toorder',
  data () {
    return {
      key: ''
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    clickFn: function () {
    }
  }
}
</script>

<style scoped>
.par {
  width: 100%;
  min-height: 100%;
  background: url(../../common/images/btmbg.png);
  background-color: #ededed;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding-top: 0.16rem;
  font-size: 0;
}
.pitem {
  border-bottom: 1px solid #d1d1d1;
  margin: 0 5%;
  overflow: hidden;
  word-break:keep-all;
  white-space:nowrap;
}
.ptitle {
  display: inline-block;
  font-size: 0.26rem;
  width: 25%;
}
.yz {
  display: inline-block;
  width: 75%;
  border: none;
  height: 0.85rem;
  line-height: 0.85rem;
  font-size: 0.24rem;
  text-align: left;
  color: #b8b8b8;
  background-color: transparent;
}
.buts {
  padding: 0.6rem 0 0.2rem;
}
.butt1 {
  margin-bottom: 0.2rem;
}
.butt {
  margin: 0.2rem 5% 0;
  width:90%;
}
</style>
