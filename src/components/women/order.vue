<template>
<div>
  <div v-title>心理咨询预约</div>
  <header class="nav-list" >
    <span class="nav-item" v-for="(item,index) in projects" @click="check_nav(index,item.id)" :key='index'><b class="bs" :class="{select: selected === (index+1)}">{{item.title}}</b></span>
  </header>
  <div v-show="selected == (index+1)" v-for="(item,index) in projects" :key='index'>
    <div class="swipepar">
      <mt-swipe>
        <mt-swipe-item v-for="(i,index) in item.slides" :key='index'><img :src="i" class="swimg"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="info borbut">
      <h3 class="info-title">业务描述</h3>
      <p class="info-main wrap" v-html="item.content"></p>
    </div>
    <div class="info borbut0">
      <h3 class="info-title">条件需求</h3>
      <p class="info-main wrap" v-html="item.condition">啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
    </div>
    <div class="eva">
      <p class="eva-title">用户评论</p>
      <p class='no_pj' v-if='no_content'>暂时没有评论</p>
      <div class="eva-item" v-for='(i,index) in pj_list' :key='index'>
        <img :src="i.head_pic" class="left">
        <div class="right">
          <p><span class="user">{{i.nickname}}</span><span class="time">{{i.create_time}}</span></p>
          <p class="star f-star">
            <!-- <input type="radio" class="plstar" v-for="(e, i) in 6" :value="i"> -->
            <yd-rate slot="left" :readonly="true" active-color="#f39e34" size="0.32rem"  v-model='i.star'></yd-rate>
          </p>
          <p class="sb wrap">{{i.content}}</p>
        </div>
      </div>
      <p class="more" v-if='!no_content' @click='getmore(item.id)'>{{morepl}}<span class="mores">></span></p>
      <div class="buttons">
        <mt-button size="normal" class="butt" @click="to_order(item.title,item.id,item.sub_enable,item.time_slot_arr)" v-if='item.sub_enable == 1'>立即预约</mt-button>
        <mt-button size="normal" class="butt" :disabled='!Boolean(item.sub_enable)' v-else>不可预约</mt-button>
        <mt-button size="normal" class="butt butt2">在线咨询</mt-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Button, Swipe, SwipeItem,Toast } from "mint-ui";
import { Rate } from 'vue-ydui/dist/lib.rem/rate';
import { mental_project_list,mental_order,get_mental_evaluate,weixin_login } from 'api/common';
export default {
  name: "order",
  data() {
    return {
      page:1,
      selected: 1,
      plnum:2,
      morepl:'查看更多评论',
      firstId:'',
      no_content:false,
      show_more:true,
      isClick:false,
      projects:[],
      pj_list:[]
    };
  },
  components: {
    "mt-button": Button,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    'yd-rate': Rate,
  },
  methods: {
    // 切换项目
    check_nav(index,p_id){
      this.plnum = 2;
      this.selected = index+1;
      this.get_evaluate(p_id);
    },
    to_order(title,id,sub_enable,time_slot_arr){
      this.$router.push({path: '/women/yuyue#pro' + id});
      localStorage.setItem('project',title);
      localStorage.setItem('time_slot_arr',time_slot_arr); 
    },
    // 获取项目详情列表
    get_project(){
      mental_project_list({
        sortby: 'sort',
        sort: 'asc'
      }).then((res) => {
        if(res.code == 200){
          this.projects = res.rows;
          this.firstId = this.projects.length;
        }
      })
    },
    //获取项目评论列表
    get_evaluate(id){
      get_mental_evaluate({
        params:{
          mental_id: id
        }
      }).then((res) => {
        if(res.total == 0){
          this.no_content = true;
          this.show_more = false;
        }
        if(res.code == 200){
          this.no_content = false;
          this.show_more = true;
          this.pj_list = res.rows;
          var page = res.page_sort.page;
          var size =  res.page_sort.size;
          var more = Number(page) * Number(size);
          var total = res.total;
          if(total > more){
            this.morepl = '查看更多评论';
          }else{
            this.morepl = '没有更多评论了';
          }
        }else if(res.code == 401){
          weixin_login('#/women/order');
        }else{
          this.pj_list = [];
        }
      })
    },
    // 点击查看更多
    getmore(id){
      var that = this;
      get_mental_evaluate({
        params:{
          page:this.plnum,
          mental_id: id
        }
      }).then((res) => {
        console.log(res)
        if (res.rows) {
          var page = res.page_sort.page;
          var size =  res.page_sort.size;
          var more = Number(page) * Number(size);
          var total = res.total;
          //判断是否有更多评论
          if(total > more){
            this.morepl = '查看更多评论';
  
          }else{
            this.morepl = '没有更多评论了';
          }
          if (res.rows.length === 0) {
            that.pl = [];
            this.morepl = '没有更多评论了'
          }
          console.log(this.plnum)
          for (var i of res.rows) {
            this.pj_list.push(i)
            this.plnum++
          }
        } else {
          this.morepl = '没有更多评论了'
        }
      })
  
    }
  },
  mounted: function() {
    this.get_project();
    this.get_evaluate(this.firstId);
  }
};
</script>

<style scoped>
.nav-list {
  display: table;
  margin: 0;
  width: 100%;
  margin: 0.02rem 0;
}
.nav-item {
  display: table-cell;
  text-align: center;
}
.swipepar {
  height: 2.8rem;
}
.swimg {
  height: 2.8rem;
  width: 100%;
}
.bs {
  font-size: 0.26rem;
  display: inline-block;
  font-weight: 500;
  line-height: 0.6rem;
  border-bottom: 3px solid #fff;
}
.select {
  transition: all 1s;
  border-bottom-color: #4cacf0;
}
.info {
  box-sizing: border-box;
  padding: 0 0.1rem 0.1rem;
}
.info-title {
  margin: 0.1rem 0;
}
.wrap {
  white-space: pre-wrap;
  word-break: normal;
  word-wrap: break-word;
}
.info-main {
  color: #b6b6b6;
  margin: 0.01rem 0;
}
.borbut {
  border-bottom: 1px solid #e9e9e9;
}
.borbut0 {
  border-bottom: 0.1rem solid #e9e9e9;
}
.eva {
  padding: 0 0 0.3rem;
}
.eva-title {
  margin-left: 2.5%;
  font-size: 0.26rem;
  color: #808080;
  padding: 0.2rem 0;
}
.eva-title:after {
  display: block;
  content: "clear";
  height: 0;
  clear: both;
  visibility: hidden;
}
.eva-item {
  width: 95%;
  padding: 2.5%;
  border-bottom: 1px solid #e9e9e9;
}
.left {
  float: left;
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  margin-right: 0.08rem;
}
.right {
  display: table-cell;
  width: 10rem;
}
.right p {
  margin: 0.04rem 0 0.08rem;
}

.time {
  float: right;
  color: #808080;
  font-size: 0.22rem;
}
.more {
  text-align: center;
  color: #808080;
  margin: 0;
  font-size: 0.22rem;
  line-height: 0.4rem;
}
.mores {
  display: inline-block;
  margin-left: 0.04rem;
  transform: rotate(90deg) scaleY(1.5) scaleX(0.8);
  font-weight: 600;
}
.buttons {
  font-size: 0;
  width: 100%;
  margin-top: 0.1rem;
  box-sizing: border-box;
  padding: 0.2rem 10% 0.1rem;
}
.butt {
  display: inline-block;
  width: 45%;
  font-weight: 500;
}
.butt2 {
  margin-left: 10%;
}
.sb {
  display: table;
  width: 100%;
  table-layout: fixed;
  word-wrap: break-word;
}
.f-star>input{width:0.35rem;}
.f-star>input:before{font-size:0.35rem;}
.no_pj{text-align: center;}
</style>
