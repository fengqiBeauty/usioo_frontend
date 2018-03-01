<template>
<div class="par">
  <div class="pitem">
    <span class="ptitle">设置新密码</span><input class="yz" type="text" placeholder="设置新密码">
  </div>
  <div class="pitem">
    <span class="ptitle">再输入一次</span><input class="yz" type="password" placeholder="再输入一次">
  </div>
  <mt-button size="large" class="butt" @click='clickFn'>确认</mt-button>
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
  box-sizing: border-box;
  padding-left: 0.1rem;
  font-size: 0.24rem;
  text-align: left;
  color: #b8b8b8;
  background-color: transparent;
}
.butt {
  margin: 0.6rem 5% 0.2rem;
  width:90%;
}
</style>
