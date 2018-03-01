<template>
<div class="bg">
  <!-- 智慧养老首页 -->
  <div class="header">
    <span class="logo"></span>
    <span class="title">生活照料</span>
  </div>
  <!-- 分类列表 -->
  <div class="menu">
    <div class="item" :class="{selected:index == selected}" v-for="(ele, index) in list" :key="ele.id" @click='choose(ele.id,index)'>
      <!-- <i class="ie" :class="['ie' + (index + 1), {active: selected === index}]"></i> -->
      <i class="ie" v-bind:style="{backgroundImage: 'url(' + ele.image_url + ')'}" :class="selected === index?'active':''"></i>
      <p>{{ele.title}}</p>
    </div>
  </div>
  <!-- 轮播图 -->
  <div class="project">
    <div class="demo-spin-container" v-if="loading">
      <mt-spinner type="fading-circle" color="#3891F7"></mt-spinner>
    </div>
    <div>
      <div class="swiper-inner">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in items" :key="index" @click.native='more'>
            <img :src="item.image_url" class="f-img">
            <div class="f-title">{{item.title}}</div>
            <div class="f-time">{{item.hold_time}}</div> 
            <div class="service-info"><i class="fa fa-eye fas"></i><span>{{item.views}}</span><i class="fa fa-heart fas"></i><span>{{item.amount-item.remain_place}}</span></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <mt-button size="large" :class="len? 'butt' : 'but'" @click='more'>{{appointment}}</mt-button>
  </div>
</div>
</template>

<script>
import { Button, Toast, Spinner } from "mint-ui";
import { smartpension_pension } from 'api/common'
import { smartpension_pension_add_views } from 'api/common'
import { smartpension_cate } from 'api/common'
export default {
  name: "provideAged",
  data() {
    return {
      selected: 0,
      movestep: 17,
      movesteps: 17,
      show: false,
      start: null,
      list: [],
      items: [],
      appointment: "",
      len: "",
      loading:true,
      // 轮播图配置选项
      swiperOption: {
        autoplay: 0, //是否自动播放
        initialSlide: 0, //初始滑块
        loop: false, //是否循环滚动
        height: 200,
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: "auto",
        coverflow: {
          rotate: 50, //旋转角度
          stretch: 0,
          depth: 80, //深度
          modifier: 1,
          slideShadows: true //是否显示阴影
        }
      }
    };
  },
  components: {
    "mt-button": Button,
    "mt-spinner": Spinner
  },
  methods: {
    more: function() {
      // 获取到轮播当前的项目
      let length = this.items.length;
      let index = this.$refs.mySwiper.swiper.activeIndex % length;
      var pid = this.items[index].id;
      smartpension_pension_add_views({
        id: pid
      }).then((res) => {

      })
      this.$router.push({ path: "/provideAged/more#provide" + pid });
    },
    // 选择每个类别
    choose: function(num, index) {
      this.selected = index;
      this.items = {};
      //获取养老项目列表，按sort字段从小到大排序
      smartpension_pension({
        params: {
          cats_id: num,
          sortby: 'sort',
          sort: 'asc'
        }
      }).then((res) => {
        this.items = res.rows;
        if (res.total == 0) {
          this.len = false;
          this.appointment = "此分类暂无项目";
        } else {
          this.len = true;
          this.appointment = "预约";
        }
      })
    }
  },
  computed: {},
  created: function() {
    var that = this;
    //获取养老项目分类
    smartpension_cate().then((res) => {
      if(res.code == 200){
        that.list = res.rows;
      }else {
        Toast({
          message: "获取失败",
          duration: 1000
        });
      }
    });
     //获取养老项目列表
    smartpension_pension({
      params: {
        cats_id: 1,
        sortby: 'sort',
        sort: 'asc'
      }
    }).then((res) => {
      if(res.code == 200){
        that.loading = false;
        that.items = res.rows;
      }else {
        Toast({
          message: "获取失败",
          duration: 1000
        });
      }
    })
  },
  mounted: function() {
    //获取养老项目列表
    smartpension_pension({
      params: {
        cats_id: 1,
        sortby: 'sort',
        sort: 'asc'
      }
    }).then((res) => {
      this.items = res.rows;
      this.items.total = res.total;
      if (res.total == 0) {
        this.len = false;
        this.appointment = "此分类暂无项目";
      } else {
        this.len = true;
        this.appointment = "预约";
      }
    })
  }
};
</script>

<style scoped>
.demo-spin-container{
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #ededed;
}
.f-title {
  margin-top: 16px;
  font-size: 0.26rem;
}
.f-time{margin-top: 12px;font-size: 0.22rem;}
/*swiper容器*/
.swiper-inner {
  width: 100%;
  margin: 0 auto;
  /*padding要用swiper-inner高度减去swiper-slide高度除以二*/
  padding: 0;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 4.8rem;
  background-color: #fff;
  text-align: center;
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  border-radius: 10px;
}
.f-img {
  height: 3.2rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.header {
  text-align: left;
  font-size: 0.28rem;
  font-weight: bold;
  padding: 0.1rem 0.17rem;
  box-sizing: border-box;
  line-height: 0.5rem;
}
.menu {
  width: 100%;
  font-size: 0;
}
.logo {
  display: inline-block;
  background-image: url(../../common/images/pension-h1.png);
  width: 0.24rem;
  height: 0.24rem;
  background-repeat: no-repeat;
  background-size: 100%;
  vertical-align: middle;
}
.item {
  display: inline-block;
  width: 33.33%;
  border: 1px solid #e9e9e9;
  text-align: center;
  box-sizing: border-box;
  padding: 0.1rem 0;
  overflow: hidden;
}
.item p {
  font-size: 0.25rem;
  margin: 0.1rem 0 0 0;
  width: 100%;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
}
.icon {
  font-size: 0.27rem;
  line-height: 0.36rem;
}
.title {
  vertical-align: middle;
}
.project {
  position: relative;
  width: 100%;
  background-color: #ededed;
  text-align: center;
  padding: 0.2rem 0;
}
.butt {
  margin: 0.3rem 10% 0.2rem 10%;
  width: 80%;
}
.but {
  background-color: #ccc;
  margin: 0.3rem 10% 0.2rem 10%;
  width: 80%;
}

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
.header {
  background-color: #fff;
}
.bg {
  min-height: 100%;
  background-color: #ededed;
}

.ie {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-repeat: no-repeat;
  background-size: 100%;
}
.active {
  background-position: bottom center;
}
</style>
