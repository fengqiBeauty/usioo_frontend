<template>
<div>
  <div v-title>交友活动</div>
  <div class="swipepar">
    <mt-swipe>
      <mt-swipe-item  v-for="(item,index) in imgs" :key="index"><img :src="item" class="swimg"></mt-swipe-item>
    </mt-swipe>
  </div>
  <div class="info">
    <h3 class="info-title">活动介绍</h3>
    <p class="info-main wrap" v-html="fr_activity.content"></p>
  </div>
  <div class="info">
    <h3 class="info-title">主办方介绍</h3>
    <p class="info-main wrap" v-html="fr_activity.organizers"></p>
  </div>
  <div class="info">
    <h3 class="info-title">参与方式</h3>
    <p class="info-main wrap" v-html="fr_activity.join_way"></p>
  </div>
    <mt-button size="normal" class="butt" @click='to_hdybm' v-if="goStar" :disabled="isDisabled">去报名</mt-button>
    <mt-button size="normal" class="butt" @click='to_details' v-else :disabled="isDisabled">查看报名详情</mt-button>
  </div>
</div>
</template>

<script>
import { Button, Swipe, SwipeItem, Toast } from 'mint-ui'
import { activity_women,women_enter_read,weixin_login } from 'api/common'
export default {
  name: 'toorder',
  data () {
    return {
      selected: 1,
      bm_text:'我要报名',
      isDisabled:true,
      imgs:[],
      fr_activity:{},
      goStar:true
    }
  },
  components: {
    'mt-button': Button,
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  methods: {
    to_hdybm(){
      this.$router.push({path:'/women/hdybm'});
    },
    to_details(){
      this.$router.push({path:'/women/del'});
    }
  },
  mounted: function () {
    activity_women().then((res) => {
      console.log(res.data);
      if(res.code == 200){
        this.fr_activity = res.data;
        this.imgs = res.data.slides;
      }
      if(res.data.enter_status == 1){
        //查看报名详情
        this.goStar = false;
        this.isDisabled = false;
      }else{
        //去报名
        this.goStar = true;
        this.isDisabled = false;
      }
    });
    
  }
}
</script>

<style scoped>
.logo {
  width: 100%;
  height: 1.8rem;
  display: block;
}
.swipepar {
  height: 2.8rem;
}
.swimg {
  height: 2.8rem;
  width: 100%;
}
.info {
  box-sizing: border-box;
  padding: 0 0.1rem 0.1rem;
  border-bottom: 1px solid #e9e9e9;
}
.info-title {
  margin: 0.2rem;
}
.wrap {
  white-space: normal;
  word-break: normal;
}
.info-main {
  color: #b6b6b6;
  margin: 0.01rem 0;
}
.butt {
  width:90%;
  margin: 0.2rem 5% 0.2rem;
}
.info p{
  padding-left:0.4rem;
}
</style>
