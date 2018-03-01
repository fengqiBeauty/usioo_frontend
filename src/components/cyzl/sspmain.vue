<template>
<div class="bg">
  <img src="../../common/images/201.jpeg" class="imgs">
  <div class="list">
    <div class="main">
      <h4 class="title">{{list.title}}</h4>
      <div class="tpar"><span class="type">{{list.type}}</span></div>
      <p class="list-more"><i class="fa fa-clock-o la"></i>2017-1-1</p>
      <p class="list-more"><i class="fa fa-map-marker la"></i>一家公司</p>
      <div class="feihua">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
    </div>
  </div>
  <mt-button size="large" class="butts butt" @click='clickFn'>查看处理结果</mt-button>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'endorder',
  data () {
    return {
      choose: true,
      list: {
        title: '这是一个新闻题目',
        type: '市容秩序'
      }
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    clickFn: function () {
      this.$router.push({path: '/cyzl/result'})
    }
  }
}
</script>

<style scoped>
.imgs {
  width: 100%;
}
.butt {
  margin: 0.5rem 10% 0 10%;
  width:80%;
  font-size: 0.17rem;
}
.bg {
  background-color: #E9E9E9;
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
}
.list {
  width: 100;
}
.main {
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.1rem;
}
.type{
  border:1px solid #4CACF0;
  color: #4CACF0;
  border-radius: 0.1rem;
  padding: 0.05rem;
  font-size: 0.16rem;
}
.title {
  margin: 0;
}
.tpar {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.list-more {
  font-size: 0.22rem;
  color: #AFAFAF;
  margin: 0.1rem 0.05rem;
}
.la {
  margin-right: 0.05rem;
}
.feihua {
  font-size: 0.24rem;
}

</style>
