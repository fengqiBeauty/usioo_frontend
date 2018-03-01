<template>
  <div>
    <div>
      <img src="../../common/images/cyzl_02.jpg" class='bg'>
    </div>
    <div class="btn-box">
      <div class="btn1" @click="sq_act">
        <img src="../../common/images/cyzl_05.jpg" alt="">
        <p>社区活动</p>
      </div>
      <div class="btn2">
        <img src="../../common/images/cyzl_07.jpg" alt="">
        <p>民生诉求</p>
      </div>
      <div class="btn3">
        <img src="../../common/images/cyzl_09.jpg" alt="">
        <p>随手拍</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    sq_act(){
      this.$router.push({path:'/community/com_activity'});
    }
  }
}
</script>
<style scoped>
.bg{width: 100%;}
.btn-box{display: -webkit-box;display: -webkit-flex;display: flex;padding-top: 30px;}
.btn-box img{width: 1.5rem;height:1.5rem;}
.btn1,.btn2,.btn3{
  flex:1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  flex-direction: column;}
</style>

