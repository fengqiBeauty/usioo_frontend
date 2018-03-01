<template>
  <!-- 当前活动 -->
  <div>
    
    <div v-if="this.content">
      <div class="demo-spin-container" v-if="loading">
        <mt-spinner type="fading-circle" color="#3891F7"></mt-spinner>
      </div>
      <div class="swiper-inner">
      <!-- swiper -->
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in act_list" :key='index'>
            <div class="hd_title" >{{item.title}}</div>
            <div class="s_img">
              <img :src="item.slides[0]" alt="">
            </div>
            <div class="detail">
              <div class='s_time'>{{item.hold_time}}</div>
              <div class='s_rate'>
                <yd-rate slot="left"  v-model="item.grade" :readonly="true" active-color="#f39e34" size="0.32rem"></yd-rate><span>{{item.grade}}分</span>
              </div>
              <div class="s_me">剩余名额：{{item.remain_place}}</div>
              <div class="service-info">
                <i class="fa fa-eye fas"></i>{{item.views}}
                <i class="fa fa-heart fas"></i>70
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination" v-show="pagina"></div>
      </div>
      <div class="butt">
        <mt-button size="large" class="look_del" @click="to_details">查看详情</mt-button>
      </div>
    </div>
    <div v-else class="no_content">暂时没有活动~</div>
  </div>
</template>
<script>
import { Spinner } from "mint-ui";
import {Rate} from 'vue-ydui/dist/lib.rem/rate';
import { sq_community } from 'api/common'
export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: 0, //是否自动播放
        initialSlide: 0, //初始滑块
        loop: false, //是否循环滚动
        // height: 200,
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: "auto",
        coverflow: {
          rotate: 50, //旋转角度
          stretch: 0,
          depth: 100, //深度
          modifier: 1,
          slideShadows: false //是否显示阴影
        }
      },
      pagina:false,
      loading:true,
      content:true,
      act_list:{},
      title_arr:[]
    }
  },
  computed: {
  
  },
  components: {
    'yd-rate': Rate,
    "mt-spinner": Spinner
  },
  methods: {
    to_details(){
      // 获取到轮播当前的项目
      let length = this.act_list.length;
      let index = this.$refs.mySwiper.swiper.activeIndex % length;
      var pid = this.act_list[index].id;
    }
  },
  mounted () {
    sq_community({
      params:{
        type: 'before',
        sortby:"create_time",
        sort:"desc"
      }
    }).then((res) => {
      if(res.code == 200){
        this.loading = false;
        this.pagina = true;
        this.act_list = res.rows;
        console.log(this.act_list)
      }else{
        this.content = false;
      }
    })
  }
}
</script>
<style scoped>
.hd_title{font-weight: 700;width: 100%;text-align: center;margin-bottom: 30px;}
.swiper-inner {
  width: 100%;
  /* height: 500px; */
  margin: 0 auto;
  padding-top: 20px;
  /* padding-bottom: 50px; */
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 78%;
  /* height: 400px; */
  background-color: #fff;
  border-radius: 10px;
  /* padding-top: 20px; */
  padding-bottom: 20px;
}
.swiper-slide-active{
  border-bottom: 2px solid #ccc;
}
.s_rate{display: flex;align-items: center;}
.s_rate span:nth-child(2){margin-left: 20px;color:#f39e34}
.s_img,.s_img img{height: 170px;width: 100%;}
.s_img img{border-top-left-radius: 10px;border-top-right-radius: 10px;}
.detail{padding: 20px 10px 0;}
.detail div{margin-top: 10px;}
.s_me{color:#4682CC;width: 80%;font-weight: 700;}
.service-info {
  text-align: right;
  font-size: 0.22rem;
  color: #b7b7b4;
  margin-top: 5px;
  padding-right: 10px;
}
.fas {
  margin: 0 2%;
}
.swiper-pagination{position: static;}
.butt{padding:0 6% 15px;}
.demo-spin-container,.no_content{
  width: 100%;
	margin-top: 150px;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  position: relative;
}
</style>

