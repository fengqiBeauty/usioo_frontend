<template>
<!-- 社区活动首页 -->
  <div>
      <div>
        <img src="../../common/images/huodong1_02.png" class='bg'>
      </div>
      <div class="btn-box">
        <div class="img-btn1" @click="before_act"></div>
        <div class="img-btn2" @click="now_act"></div>
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    before_act(){
      this.$router.push({path:'/community/before_act'});
    },
    now_act(){
      this.$router.push({path:'/community/activity'});      
    }
  }
}
</script>
<style scoped>
.bg{width: 100%;}
.btn-box{display: -webkit-box;display: -webkit-flex;display: flex;}
.img-btn1{background-image: url(../../common/images/wq.jpg);background-size: 90% 100%;background-position: center;background-repeat: no-repeat}
.img-btn2{background-image: url(../../common/images/dq.jpg);background-size: 90% 100%;background-position: center;background-repeat: no-repeat}
.img-btn1,.img-btn2{
  flex:1;
  height: 65px;
  min-height: 65px;
  float: left;
  margin-bottom: 30px;
}
</style>

