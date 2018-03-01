<template>
<div class="par">
  <div v-title>邀请申请</div>
  <div class="info pa">以下是根据您提供的资料匹配的交友人选，选择感兴趣的对象。</div>
  <div class="info">匹配成功后，我们会为你们提供双方联系方式。</div>
  <img src="../../assets/201.jpeg" class="head">
  <p class="name">李云龙</p>
  <div class="list">
    <div class="item"><span class="left">年龄</span><span class="right">50岁</span></div>
    <div class="item"><span class="left">职业</span><span class="right">金融</span></div>
    <div class="item"><span class="left">学历</span><span class="right">本科</span></div>
    <div class="item"><span class="left">住房情况</span><span class="right">2套房产</span></div>
    <div class="item"><span class="left">户籍情况</span><span class="right">广东深圳</span></div>
  </div>
  <div class="buttons">
    <mt-button size="normal" class="butt">不感兴趣</mt-button>
    <mt-button size="normal" class="butt butt2">点击邀请</mt-button>
  </div>
  <mt-button size="large" class="butt0">换一批</mt-button>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'succ',
  data () {
    return {
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.3rem;
  box-sizing: border-box;
}
.butt0 {
  margin: 0.5rem 5% 0 5%;
  width:90%;
}
.buttons {
  font-size: 0;
  width: 100%;
  margin-top: 0.5rem;
  margin-left: 5%;
}
.butt {
  display: inline-block;
  width:40%;
  font-weight: 500;
}
.butt2 {
  margin-left: 10%;
  background-color: #f77239;
  box-shadow: 0px 0.04rem 0.16rem rgba(247, 114, 57, 0.56);
}
.pa {
  padding-top: 0.14rem;
}
.info {
  color: #6c6c6c;
  font-size: 12px;
  width: 90%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  text-align: center;
  margin: 0 auto;
}
.head {
  display: block;
  margin: 0.2rem auto 0.1rem;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}
.name {
  text-align: center;
  font-size: 0.2rem;
  margin: 0 0 0.4rem;
}
.list {
  width: 100%;
}
.item {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.1rem;
  border-bottom: 1px solid #e9e9e9;
  line-height: 0.6rem;
  font-size: 0.18rem;
}
.left {
  position: absolute;
  top: 0;
  left: 0.2rem;
  text-align: left;
  color: #9d9d9d;
}
.right {
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>
