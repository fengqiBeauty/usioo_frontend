<template>
<div class="bg">
  <div class="item">
    <span class="item-title">项目</span>
    <span class="yzs ss">></span>
    <span class="yzs ss">市容秩序</span>
  </div>
  <div class="item">
    <span class="item-title">标题</span>
    <input class="remark yz yzs" type="text" placeholder="请输入标题">
  </div>
  <div class="item">
    <span class="item-title">地点</span>
    <input class="remark yz yzs" type="text" placeholder="请输入详细地点">
  </div>
  <div class="item itemimg" @click='sheetVisible = true'>
    <img src="../../common/images/201.jpeg" alt="" class="imgs">
    <span class="tjtp">添加图片</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对该活动的评价吧"></textarea>
  <div class="item">
    <input class="remark yz yzm" type="text" placeholder="输入右侧验证码">
    <img src="../../common/images/avatar.png" class="yzimg" alt="">
  </div>
  <mt-button size="large" class="butts butt"  @click='clickFn'>提交</mt-button>
  <mt-actionsheet
  :actions="[{name: '拍照'}, {name: '从相册中选择'}]"
  v-model="sheetVisible">
</mt-actionsheet>
</div>
</template>

<script>
import { Button, Actionsheet } from 'mint-ui'
export default {
  name: 'endorder',
  data () {
    return {
      sheetVisible: false
    }
  },
  components: {
    'mt-button': Button,
    'mt-actionsheet': Actionsheet
  },
  methods: {
    clickFn: function () {
      this.$router.push({path: '/provideAged/index'})
    },
    check: function (event) {
      this.pingjia = this.pjlist[event.target.value - 1]
    }
  }
}
</script>

<style scoped>
.bg {
  padding-bottom: 0.3rem;
}
.title {
  padding: 0.2rem 0.2rem 0 0.2rem;
}
.butt {
  margin: 0.3rem 10% 0 10%;
  width:80%;
}
.remark {
  font-size: 0.16rem;
  resize: none;
}
.item {
  border-bottom: 1px solid #E9E9E9;
  box-sizing: border-box;
  padding: 0 0.2rem;
}
.pj {
  display: block;
  width: 100%;
  border: 1px solid #E9E9E9;
  box-sizing: border-box;
  padding: 0 0.16rem;
  height: 1.5rem;
  line-height: 0.3rem;
  margin-top: -1px;
}
.item-title {
  display: inline-block;
  max-width: 28%;
  line-height: 0.45rem;
}
.yz {
  height: 0.3rem;
  padding: 0;
  max-width: 68%;
  border: none;
  line-height: 0.3rem;
  text-align: right;
}
.yzs {
  float: right;
  margin-top: 0.1rem;
}
.yzm {
  text-align: left;
}
.yzimg {
  width: 25%;
}
.ss {
  color: #666;
  font-size: 0.16rem;
}
.imgs {
  display: inline-block;
  height: 0.8rem;
  vertical-align: middle;
}
.itemimg {
  height: 1.1rem;
  line-height: 1.1rem;
}
.tjtp {
  display: inline-block;
  margin-left: 0.1rem;
}
</style>
