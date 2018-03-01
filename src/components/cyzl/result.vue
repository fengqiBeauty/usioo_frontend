<template>
<div class="bg">
  <div v-title>处理结果</div>
  <div class="item first"><span class="pro-title">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态:</span><span class="pro-info">处理完成</span></div>
  <div class="item"><span class="pro-title">处理办法:</span><span class="pro-info">不处理</span></div>
  <div class="item"><img src="../../common/images/201.jpeg" class="imgs"></div>
  <div class="item star-par">
    <span>打分</span>
    <div class="star inline-star" @click='check($event)'>
      <input type="radio" name="a" v-for="(e, i) in 6" :value="i" :checked="i === fy" v-model="fy">
    </div>
  </div>
  <div class="item">
    <span>评论</span>
    <textarea class="remark pj" placeholder="请输入您的评论" v-model='pinglun'></textarea>
    <div class="sub-par">
      <span class="sub tj">提交</span>
      <span class="sub" @click="$router.push({path: '/cyzl/sspmain'})">取消</span>
    </div>
  </div>
  <div class="infos">
    <p class="title">热门评论</p>
    <div class="item max" v-for="(ele, index) in pl">
      <img src="../../common/images/201.jpeg" alt="" class="head">
      <div class="right">
        <span class="name">{{ele.name}}</span><span class="time">{{ele.time}}</span>
        <p class="info-main">{{ele.main}}</p>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      pinglun: null,
      point: 5,
      fy: 5,
      pl: [{
        name: 'sb1',
        time: '2017-8-8',
        main: '这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论'
      }, {
        name: 'sb2',
        time: '2017-8-8',
        main: '这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论'
      }, {
        name: 'sb3',
        time: '2017-8-8',
        main: '这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论'
      }]
    }
  },
  methods: {
    check: function (event) {
      this.point = event.target.value
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #ededed;
}
.infos {
  background-color: #fff;
}
.pro-title {
  color: #949494;
}
.pro-info {
  margin-left: 0.1rem;
}
.item {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  line-height: 0.6rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
.imgs {
  display: block;
  padding: 0.2rem 0;
  width: 30%;
}
.sub-par {
  text-align: right;
  font-size: 0.16rem;
  line-height: 0.4rem;
}
.sub {
  margin-left: 0.1rem;
}
.tj {
  color: #ef9624;
}
.star-par {
  position: relative;
}
.inline-star {
  position: absolute;
  top: 0.03rem;
  left: 0.44rem; 
} 
.pj {
  font-size: 0.16rem;
  resize: none;
  display: block;
  width: 100%;
  border: none;
}
.title {
  margin: 0 0.1rem;
  color: #949494;
  font-size: 0.18rem;
  line-height: 0.4rem;
}
.infos {
  margin-top: 0.2rem;
}
.head {
  display: block;
  float: left;
  margin-top: 0.12rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.12rem;
}
.max {
  min-width: 0.8rem;
}
.info-main {
  margin: -0.12rem 0 0.2rem 0;
  line-height: 0.3rem;
  font-size: 0.17rem;
  white-space: normal;
  word-break: normal;
}
.right {
  display: table-cell;
}
.name {
  display: inline-block;
  line-height: 0.2rem;
  font-size: 0.16rem;
}
.time {
  margin-left: 0.05rem;
  color: #949494;
  font-size: 0.15rem;
}
</style>
