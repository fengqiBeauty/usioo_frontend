<template>
<div class="par">
  <!-- 预约成功 -->
  <p class="serviced pa">"{{title}}"服务</p>
  <p class="success pa">预约成功!</p>
  <p class="paicon pa"><i class="fa fa-check sa"></i></p>
  <mt-button size="large" class="butt" @click='clickFn'>确认</mt-button>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'endorder',
  data () {
    return {
      title: ''
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    clickFn: function () {
      // history.go(-2)
      this.$router.push({path: '/provideAged/person'})
    }
  },
  mounted: function () {
    this.title = localStorage.getItem('ortitle')
  }
}
</script>

<style scoped>
.par {
  background-color: #ededed;
  height: 100%;
}
.pa {
  text-align: center;
  margin: 0;
}
.serviced {
  /* font-size: 0.16rem; */
  padding-top: 2rem;
  
}
.success {
  font-size: 0.3rem;
  margin-top: 0.15rem;
  font-weight: 900;
}
.butt {
  margin: 0.8rem 5% 0.2rem 5%;
  width:90%;
}
.paicon {
  margin: 0.3rem 0;
}
.sa {
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  border-radius: 50%;
  background-color: #6FC771;
  color: #fff;
}
</style>
