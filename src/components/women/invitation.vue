<template>
<div class="par">
  <div v-title>邀请申请</div>
  <div class="info pa">以下是根据您提供的资料匹配的交友人选，选择感兴趣的对象。匹配成功后，我们会为你们提供双方联系方式。</div>
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">详情</mt-tab-item>
    <mt-tab-item id="2">评价</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <img :src="expand_info.women_image" class="head">
      <p class="name">{{expand_info.real_name}}</p>
      <div class="list">
        <div class="item"><span class="left">年龄</span><span class="right">{{user.birthday | age}}</span></div>
        <div class="item"><span class="left">职业</span><span class="right">{{user.occupation | hex}}</span></div>
        <div class="item"><span class="left">学历</span><span class="right">{{user.education | hex}}</span></div>
        <div class="item"><span class="left">住房情况</span><span class="right">{{expand_info.women_house | hex}}</span></div>
        <div class="item"><span class="left">户籍情况</span><span class="right">{{user.census | hex}}</span></div>
      </div>
      <div class="buttons">
        <mt-button size="normal" class="butt butt1" @click="uninterested">不感兴趣</mt-button>
        <mt-button size="normal" class="butt butt2" @click="toInvite">点击邀请</mt-button>
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <div class="eva" v-if="!no_content">
        <p class="eva-title">用户评论</p>
        <div class="eva-item" v-for="(e,index) in pj_list" :key="index">
          <div class="f-right">
            <p><span class="user"><img :src="e.user.expand_info.women_image" class="f-left">{{e.user.expand_info.real_name}}</span><span class="time">{{e.create_time}}</span></p>
            <!-- <p class="star f-star"><input type="radio" class="plstar" v-for="(e, i) in 6" :value="i" v-model="e.star" readonly></p> -->
            <yd-rate slot="left" v-model="e.star" :readonly="true" active-color="#f39e34" size="0.42rem"></yd-rate>
            <p class="sb wrap">{{e.content}}</p>
          </div>
        </div>
        <p class="more" @click='morepls' v-if="isClick">{{morepl}}</p>
        <p class="more" v-else>{{morepl}}</p>
      </div>
      <div class="no_content" v-if="no_content">
        暂时没有评价~~
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>
<script>
import { Button,Toast, Navbar, TabItem } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate';
import { activity_invite,enter_name_info,not_interest,zd_women_evaluate,weixin_login} from 'api/common'
export default {
  name: 'succ',
  data () {
    return {
      selected:"1",
      morepl:'获取更多评论',
      isClick:'',
      no_content:false,
      person:{},
      pj_list:[],
      user:{
        birthday:'',
        occupation:'',
        education:'',
        census:''
      },
      expand_info:{
        real_name:'',
        women_house:'',
        women_image:''
      }
    }
  },
  components: {
    'mt-button': Button,
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'yd-rate': Rate
  },
  methods: {
    //点击邀请
    toInvite(){
      activity_invite({
        params:{
          id:this.id
        }
      }).then((res) => {
        if(res.code == 200){
          Toast({
            message: res.message,
            iconClass: 'fa fa-check',
            duration: 1000
          })
        }else if(res.code == 400){
          Toast({
            message: res.message,
            duration: 1000
          })
        }else if(res.code == 401){
          weixin_login('#/women/invitation');
        }else{} 
      })
    },
    //不感兴趣
    uninterested(){
      not_interest({
        params:{
          id:this.id
        }
      }).then((res) => {
        if(res.code == 200){
          Toast({
            message: res.message,
            iconClass: 'fa fa-check',
            duration: 1000
          })
        }else if(res.code == 400){
          Toast({
            message: res.message,
            duration: 1000
          })
        }else if(res.code == 401){
          weixin_login('#/women/invitation');
        }else{} 
      })
    },
    // 点击获取更多评论
    morepls: function () {
      this.page++;
      zd_women_evaluate({
      params:{
        id: this.id,
        page:this.page
      }
    }).then((res => {
      this.pl = res.rows;
      var page = res.page_sort.page;
      var size =  res.page_sort.size;
      var more = Number(page) * Number(size);
      var total = res.total;
      //判断初始时是否有更多评论
      if(total > more){
        this.morepl = '查看更多评论';
        //是否可以点击
        this.isClick = true;
      }else{
        this.morepl = '没有更多评论了';
        //是否可以点击
        this.isClick = false;
      }
      if(res.code == 200){
        this.pj_list = res.rows;        
      }
      if(res.total == 0){
        this.no_content = true;
      }
    }))
    }
  },
  mounted: function () {
    this.id = localStorage.getItem('invite_id');
    //获取指定报名id详情
    enter_name_info({
      params:{
        id:this.id
      }
    }).then((res) => {
      if(res.code == 200){
        this.person = res.data;
        this.user = this.person.user;
        this.expand_info = this.user.expand_info;
      }
    })
    //获取指定id的评价列表
    zd_women_evaluate({
      params:{
        id: this.id
      }
    }).then((res => {
      this.pl = res.rows;
      var page = res.page_sort.page;
      var size =  res.page_sort.size;
      var more = Number(page) * Number(size);
      var total = res.total;
      //判断初始时是否有更多评论
      if(total > more){
        this.morepl = '查看更多评论';
        //是否可以点击
        this.isClick = true;
      }else{
        this.morepl = '没有更多评论了';
        //是否可以点击
        this.isClick = false;
      }
      if(res.code == 200){
        this.pj_list = res.rows;   
        console.log(this.pj_list)     
      }
      if(res.total == 0){
        this.no_content = true;
      }
    }))
  }
}
</script>

<style scoped>
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.3rem;
  box-sizing: border-box;
}
.butt0 {
  margin: 0.5rem 5% 0 5%;
  width:90%;
}
.buttons {
  font-size: 0;
  width: 100%;
  margin-top: 0.5rem;
  margin-left: 5%;
}
.butt {
  display: inline-block;
  width:40%;
  font-weight: 500;
}
.butt1{
  background-color: #f77239;
}
.butt2 {
  margin-left: 10%;
  box-shadow: 0px 0.04rem 0.16rem rgba(247, 114, 57, 0.56);
}
.pa {
  padding-top: 0.14rem;
}
.info {
  color: #6c6c6c;
  
  width: 90%;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-all;
  text-align: center;
  margin: 0 auto;
}
.head {
  display: block;
  margin: 20px auto 0.1rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.name {
  text-align: center;
  font-size: 0.26rem;
  margin: 0 0 0.4rem;
}
.list {
  width: 100%;
}
.item {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.1rem;
  border-bottom: 1px solid #e9e9e9;
  line-height: 0.6rem;
  font-size: 0.26rem;
}
.left {
  position: absolute;
  top: 0;
  left: 0.2rem;
  text-align: left;
  color: #9d9d9d;
}
.right {
  display: inline-block;
  width: 100%;
  text-align: center;
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
.f-left {
  float: left;
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  margin-right: 0.08rem;
}
.f-right {
  display: table-cell;
  width: 10rem;
}
.f-right p {
  margin: 10px 0 0.08rem;
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
.no_content{
  text-align: center;
  width:100%;
  margin-top: 100px;
}
</style>

