<template>
<div class="par">
  <div v-title>预约成功</div>
  <p class="success pa">预约成功!</p>
  <p class="paicon pa"><i class="fa fa-check sa"></i></p>
  <!-- <p class="serviced pa">预约成功!</p> -->
  <div class="info pa"></div>
  <mt-button size="large" class="butt"  @click='clickFn'>确认</mt-button>
</div>
</template>

<script>
import { Button } from 'mint-ui'
export default {
  name: 'succ',
  data () {
    return {
    }
  },
  components: {
    'mt-button': Button
  },
  methods: {
    clickFn: function () {
      this.$router.push({path:'/women/yy_record'});
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
}
.pa {
  text-align: center;
  margin: 0 auto;
}
.serviced {
  font-size: 0.26rem;
  font-weight: 500;
}
.success {
  margin-top: 1.5rem;
  font-size: 0.28rem;
}
.butt {
  margin: 0.5rem 5% 0 5%;
  width:90%;
}
.paicon {
  margin: 0.2rem 0;
}
.info {
  color: #6c6c6c;
  font-size: 16px;
  max-width: 70%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  padding-top: 0.2rem;
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
