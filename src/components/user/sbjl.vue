<template>
<div class="bg">
  <!-- 上报记录 -->
  <div class="nav">
    <span :class='{ selected: choose }' @click='choose = true'>已解决</span>
    <span :class='{ selected: !choose }' @click='choose = false'>待解决</span>
  </div>
  <div class="list">
    <div class="item" v-for='item in list' @click='tomain'>
      <div class="title">
        <span class="name">{{item.title}}</span>
        <span class="time">2017-1-1</span>
        <span class="tore">查看处理结果</span>
      </div>
      <p class="main">hhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhh</p>
      <img src="../../assets/201.jpeg"class="fl">
      <img src="../../assets/201.jpeg"class="fl">
      <img src="../../assets/201.jpeg"class="fl">
    </div>
  </div>
  <div class="over over-bg"></div>
</div>
</template>

<script>
export default {
  name: 'endorder',
  data () {
    return {
      choose: true,
      list: [{
        title: '1g1sdf53g'
      }]
    }
  },
  methods: {
    tomain: function () {
      this.$router.push({path: '/cyzl/sspmain'})
    },
    wyp: function () {
      this.$router.push({path: '/cyzl/ssppj'})
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.bg {
  width: 100%;
  min-height: 100%;
  background: #ededed url(../../assets/bg-report.png) bottom center no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
.list {
  width: 100%;
  padding-bottom: 0.2rem;
  background-color: #E9E9E9;
}
.nav span {
  border-bottom: 2px solid #4CACF0;
}
.item {
  width: 96%;
  margin-left: 2%;
  margin-bottom: 0.12rem;
  padding:  0 0.1rem 0.1rem 0.1rem;
  box-sizing: border-box;
  font-size: 0.16rem;
  background-color: #fff;
  overflow: hidden;
}
.fl{
   height: 0.9rem;
   width: 30%;
}
.main {
  margin: 0.05rem 0;
  word-break: normal;
  white-space: normal;
}
.list-title {
  
}
.list-more {
  font-size: 0.14rem;
  color: #AFAFAF;
}
.over-bg {
  background-color: #E9E9E9;
  z-index: -1;
}
.la {
  margin-right: 0.05rem;
}
.title {
  line-height: 0.5rem;
}
.name {
  display: inline-block;
  font-size: 0.16rem;
  width: 40%;
  vertical-align: middle;
  word-break: nowrap;
  white-space: nowrap;
  overflow: hidden;
}
.time {
  display: inline-block;
  margin-left: 0.05rem;
  color: #949494;
  font-size: 0.15rem;
  max-width: 27%;
  word-break: nowrap;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
  margin-left: 0.1rem;
  vertical-align: middle;
}
.tore {
  margin-top: 0.1rem;
  float: right;
  max-width: 27%;
  border: 1px solid #F09624;
  padding: 0 0.06rem;
  line-height: 0.27rem; 
  border-radius: 0.2rem;
  font-size: 0.14rem;
  color: #F09624;
}
</style>
