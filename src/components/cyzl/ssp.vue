<template>
<div class="bg">
  <p class="title">
    <span>{{tip[type]}}</span><span :class="{thide: tips, tshow: !tips}" @click="tips = !tips">></span>
  </p>
  <div class="over gg" v-show="tips"></div>
  <ul class="bar" v-show="tips">
    <li v-for="(e, i) in tip" class="gg-item" @click="changetip(i)" v-show="type != i">{{e}}</li>
  </ul>
  <div class="nav">
    <span :class='{ selected: choose }' @click='choose = true'>已解决</span>
    <span :class='{ selected: !choose }' @click='choose = false'>待解决</span>
  </div>
  <div class="list">
    <div class="item" v-for='item in list' @click='tomain'>
      <img src="../../common/images/201.jpeg"class="fl">
      <div class="right">
        <p class="list-title">{{item.title}}</p>
        <p class="list-more"><i class="fa fa-clock-o la"></i>2017-1-1</p>
        <p class="list-more"><i class="fa fa-map-marker la"></i>一家公司</p>
      </div>
    </div>
    <mt-button size="large" class="butts butt" @click='wyp'>我要拍</mt-button>
  </div>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'endorder',
  data () {
    return {
      choose: true,
      tips: false,
      type: 0,
      list: [{
        title: '“清风福保”纪检条例法规有奖问答'
      }, {
        title: '“海贼王”纪检条例法规有奖问答'
      }, {
        title: '“海贼王”纪检条例法规有奖问答'
      }],
      tip: ['市容秩序', '治安隐患', '安全隐患', '环境隐患', '其他']
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    tomain: function () {
      this.$router.push({path: '/cyzl/sspmain'})
    },
    changetip: function (n) {
      this.type = n
      this.tips = false
    },
    wyp: function () {
      this.$router.push({path: '/cyzl/ssppj'})
    }
  }
}
</script>

<style scoped>
.title {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin: 0;
  line-height: 0.7rem;
  border-bottom: 0.12rem solid #E9E9E9;
  background-color: #fff;
}
.gg {
  top: 0.7rem;
  z-index: 1;
  background-color: #ccc;
  opacity: 0.5;
}
.gg-item {
  line-height: 0.65rem;
  border-top: 1px solid #e9e9e9;
  padding-left: 0.2rem;
}
.bar {
  position: fixed;
  top: 0.7rem;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
  color: #b3b3b3;
}
.title span:nth-child(1) {
  font-weight: bold;
}
.title span:nth-child(2) {
  float: right;
  color: #9ED5F1;
  font-weight: bolder;
  font-size: 0.24rem;
}
.thide {
  transform: rotate(-90deg) scaleY(2);
}
.tshow {
  transform: rotate(90deg) scaleY(2);
}
.nav span {
  border-bottom: 2px solid #4CACF0;
}
.butt {
  margin: 0.2rem 5% 0 0.2rem;
  width:90%;
}

.list {
  width: 100%;
  padding-bottom: 0.2rem;
  background-color: #E9E9E9;
}
.item {
  width: 96%;
  margin-left: 2%;
  margin-bottom: 0.12rem;
  box-sizing: border-box;
  padding:10px;
  background-color: #fff;
  overflow: hidden;
}
.fl{
   float: left;
   height: 0.9rem;
   width: 30%;
}
.right{
  box-sizing: border-box;
  padding: 0 0.16rem;
  text-align: left;
  width: 70%;
  overflow: hidden;
}
.right p {
  height: 0.3rem;
  line-height: 0.3rem;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.list-more {
  font-size: 0.14rem;
  color: #AFAFAF;
}
.bg {
  width: 100%;
  min-height: 100%;
  padding-top: 0.82rem;
  box-sizing: border-box;
  background-color: #E9E9E9;
}
.la {
  margin-right: 0.05rem;
}
</style>
