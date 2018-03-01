<template>
<div class="bg">
  <p class="score">
    <span class="score-point">90</span>
    <span class="score-name">分</span>
  </p>
  <button class="butt">签到</button>
  <div class="date">
    <p class="linear">
      <span class="linear1">连续签到</span>
      <span class="linear2">5</span>
      <span class="linear1">天</span>
    </p>
    <div class="rili">
      <div class="date-tip">
        <span class="tips">2017-</span>
        <span class="tips">9-</span>
        <span class="tips">25</span>
        <span class="tips xq">星期一</span>
      </div>
      <div class="main">
        <ul class="list main-tip">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <div class="day">
          <ul class="list days">
            <li v-for='ele in days' v-html='ele'></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'toorder',
  data () {
    return {
    }
  },
  methods: {
    clickFn: function () {
      if (this.flag) {
        this.move = true
        this.days ++
        this.flag = false
      }
    }
  },
  computed: {
    days: function () {
      let arr = []
      let date = new Date();
      let ys = date.getMonth() + 1
      date.setDate(1)
      if (date.getDay() > 0) {
        for (let i = 0; i < date.getDay(); i++) {
          arr.push('&nbsp')
        }
      }
      date.setMonth(ys)
      date.setDate(0)
      for (let i = 0; i < date.getDate(); i++) {
        arr.push(i + 1)
      }
      return arr
    }
  },
  deactivated: function () {
  }
}
</script>

<style scoped>
.bg {
  width: 100%;
  min-height: 100%;
  background-image: url(../../common/images/bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  box-sizing: border-box;
  padding-bottom: 0.2rem;
}
.score {
  margin: 0;
  padding: 0.39rem 0 0.3rem;
  text-align: center;
  color: #8fc166;
}
.score-point {
  font-size: 0.8rem;
  font-weight: bold;
}
.score-name {
  font-size: 0.3rem;
}
.date {
  margin: 0.3rem 0 0;
}
.linear {
  margin: 0 9%;
  border-radius: 0.1rem;
  background-color: #fff;
  line-height: 0.45rem;
  text-align: center;
}
.linear1 {
  color: #559124;
}
.linear2 {
  color: #f9745f;
}
.date-tip {
  color: #fff;
  margin: 0;
  line-height: 0.4rem;
  height: 0.55rem;
  padding-top: 0.15rem;
  padding-left: 10%;
  box-sizing: border-box;
  text-align: center;
  background-image: url(../../common/images/datetopbg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.tips {
  display: inline-block;
}
.xq {
  margin-left: 0.2rem;
}
.rili {
  background-color: #fff;
  border-radius: 0.1rem;
  margin: -0.16rem 6% 0;
}
.main {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.1rem 0.1rem;
  background-color: #eee;
}
.list {
  margin: 0.15rem 0;
  padding: 0;
  width: 100%;
}
.main-tip li {
  display: table-cell;
  font-size: 0.24rem;
  line-height: 0.3rem;
  color: #559124;
  width: 1%;
  text-align: center;
}
.day {
  background-color: #fff;
  font-size: 0;
}
.days li {
  display: inline-block;
  font-size: 0.24rem;
  line-height: 0.26rem;
  padding-bottom: 0.24rem;
  height: 0.7rem;
  width: 14.28%;
  box-sizing: border-box;
  text-align: left;
  text-indent: 0.253333rem;
  border: 1px solid #f6f6f6;
  color: #888888;
}
.get {
  background-image: url(../../common/images/checkok.png);
  background-repeat: no-repeat;
  background-size: 50% 50%;
  background-position: center;
}
.moves {
  animation:move 2s;
}
.clicked {
  animation:clicks 1s;
}
@keyframes move {
  from {top:2rem;opacity: 0}
  to {top:0;opacity: 1}
}
@keyframes clicks {
  0% {opacity: 1}
  50% {opacity: 0}
  100% {opacity: 1}
}
.butt {
  margin: 0 34%;
  width:32%;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.24rem;
  line-height: 0.7rem;
  height: 0.7rem;
  color: #fff;
  background-color: #69c56f;
}
</style>
