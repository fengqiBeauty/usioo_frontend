<template>
<div class="par">
  <div class="item">
    <span class="item-title">手机号</span>
    <input class="yz" type="text" placeholder="请输入您的手机号">
  </div>
  <div class="item">
    <span class="item-title">密<i class="none">蠁</i>码</span>
    <input class="yz" type="password" placeholder="请输入密码">
    <i class="fa fa-eye-slash"></i>
  </div>
  <mt-button size="large" class="butt" @click='clickFn'>登陆</mt-button>
  <mt-button size="large" class="butt" @click='clickFn'>身份绑定</mt-button>
  <p class="wang">忘记密码?</p>
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
  height: 100%;
  background: url(../../assets/btmbg.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.item {
  border-bottom: 1px solid #E9E9E9;
  padding: 0.15rem 0;
  margin: 0 0.16rem;
}
.item-title {
  display: inline-block;
  width: 30%;
  line-height: 0.45rem;
  font-size: 0.18rem;
  font-weight: bold;
}
.yz {
  display: inline-block;
  height: 0.3rem;
  width: 60%;
  border: none;
  line-height: 0.45rem;
  font-size: 0.18rem;
  text-align: left;
}
.butt {
  margin: 0.2rem 5%;
  width:90%;
}
.wang {
  margin-left: 6%;
  margin-top: -0.05rem;
  color: #4CACF0;
  font-size: 0.15rem;
}
.none {
  color: #fff;
}
</style>
