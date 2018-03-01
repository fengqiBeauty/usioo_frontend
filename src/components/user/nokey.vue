<template>
<div class="par">
  <div class="pitem">
    <span class="ptitle">手机号</span><input class="yz" type="text" placeholder="手机号">
  </div>
  <div class="pitem yzmpar">
    <span class="ptitle">验证码</span><input class="yz" type="password" placeholder="验证码">
    <span class="yzm">获取验证码</span>
  </div>
  <mt-button size="large" class="butt" @click='clickFn'>下一步</mt-button>
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
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding-top: 0.16rem;
  font-size: 0;
  overflow: hidden;
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
  margin: 0.6rem 0 0;
}
.butt {
  margin: 0.6rem 5% 0.2rem;
  width:90%;
}
.yzmpar {
  position: relative;
}
.yzm {
  position: absolute;
  top: 0.18rem;
  right: 0.1rem;
  color: #e49941;
  border: 1px solid #e49941;
  border-radius: 0.2rem;
  font-size: 0.14rem;
  padding: 0.05rem 0.1rem;
  z-index: 1;
}
</style>
