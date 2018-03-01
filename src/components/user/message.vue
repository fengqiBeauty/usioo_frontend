<template>
<div>
  <!-- 消息列表 -->
  <div class="nav qalistnav">
    <span :class='{ selected: choose }' @click='choose = true'>未读消息</span>
    <span :class='{ selected: !choose }' @click='choose = false'>全部消息</span>
  </div>
  <div class="list">
    <div class="item" v-for='item in list'>
      <span class="item-title">{{item.title}}</span><span class="item-cj" @click='clickFn'>查看</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'endorder',
  data () {
    return {
      choose: true,
      list: [{
        title: '您的"什么服务"预约成功'
      }, {
        title: '您的"什么服务"预约成功'
      }, {
        title: '您的"什么服务"预约成功'
      }]
    }
  },
  methods: {
    clickFn: function () {
    }
  }
}
</script>

<style scoped>
.qalistnav {
  overflow: hidden;
}
.list {
  width: 100%;
}
.item {
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 3%;
}
.item-title, .item-cj {
  display: inline-block;
  white-space:nowrap;
  overflow: hidden;
  line-height: 0.8rem;
}
.item-title {
  max-width: 70%;
}
.item-cj {
  max-width: 20%;
  float: right;
  color: #5aa8e1;
}
.nav span {
  border-bottom: 2px solid #4CACF0;
}
</style>
