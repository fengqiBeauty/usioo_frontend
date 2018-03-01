
<template>
<!-- 邀请列表 -->
<div class="par">
  <!-- <div class="info pa">以下是根据您提供的资料匹配的交友人选，选择感兴趣的对象。匹配成功后，我们会为你们提供双方联系方式。</div> -->
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">交友申请</mt-tab-item>
    <mt-tab-item id="2">我的邀请</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <div class="list">
        <div class="item" v-for="(e, index) in other_list" @click="to_details(e.enter_name_id)">
          <div class="f-list">
            <div class="left"><img :src="e.user.expand_info.women_image" class="icon"></div>
            <div class="center">
              <p class="center-item name">{{e.user.expand_info.real_name}}</p>
              <p class="center-item other">
                <span>{{e.user.birthday | age}}</span>|
                <span>{{e.user.occupation}}</span>
              </p>
            </div>
            <div class="right">
              <span class="cbut choose choose1" @click="accept(e.id)" v-show="e.status == 'wait_agree'">同意</span>
              <span class="cbut choose choose2" @click="reject(e.id)" v-show="e.status == 'wait_agree'">拒绝</span>
              <span class="wait" v-show="e.status == 'agreed' && !e.invite_evaluate">已同意</span>
              <span class="wait" v-show="e.status == 'rejected' ">已拒绝</span>
              <span class="wait cbut choose" v-show="e.status == 'agreed'&& !e.invite_evaluate" @click="toEval(e.invite_enter_name_id,e.id)">评价</span>            
              <span class="wait" v-show="e.invite_evaluate">已完成</span>            
            </div>
          </div>
          <div class="clear"></div>
          <div class="phone" v-if="e.status == 'agreed' && !e.invite_evaluate" @click="to_call">
            <span class="phone_num">联系方式：{{e.user.expand_info.women_phone}}</span>
            <a :href="'tel:'+e.user.expand_info.women_phone"><span class="phone_icon iconfont icon-phone01"></span></a>
          </div>
        </div>
      </div>
      <div class="demo-spin-container" v-if="no_content1">
         暂时没有好友申请~
      </div>   
      <div class="demo-spin-container" v-if="loading">
        <mt-spinner type="fading-circle" color="#3891F7"></mt-spinner> 
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <div class="list">
        <div class="item" v-for="(e, index) in me_list" @click="to_details(e.invite_enter_name_id)">
          <div class="f-list">
            <div class="left"><img :src="e.invite_user.expand_info.women_image" class="icon"></div>
            <div class="center">
              <p class="center-item name">{{e.invite_user.expand_info.real_name}}</p>
              <p class="center-item other">
                <span>{{e.invite_user.birthday | age}}</span>|
                <span>{{e.invite_user.occupation}}</span>
              </p>
            </div>
            <div class="right">
              <span class="wait" v-show="e.status != 'done'">{{e.status | status}}</span>
              <span class="wait cbut choose" v-show="e.status == 'agreed'" @click="toEval(e.invite_enter_name_id,e.id)">评价</span>
              <span class="wait" v-show="e.status == 'done'">{{e.status | status}}</span>                                            
            </div>
          </div>
          <div class="clear"></div>
          <div class="phone" v-if="e.status == 'agreed'" @click="to_call">
            <span class="phone_num">联系方式：{{e.invite_user.expand_info.women_phone}}</span>
            <a :href="'tel:'+e.invite_user.expand_info.women_phone"><span class="phone_icon iconfont icon-phone01"></span></a>
          </div>
        </div>
      </div>
      <div class="demo-spin-container" v-if="no_content2">
         暂时没有邀请好友~
      </div> 
      <div class="demo-spin-container" v-if="loading2">
        <mt-spinner type="fading-circle" color="#3891F7"></mt-spinner> 
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>

<script>
import { Button, Navbar, TabItem, Toast } from 'mint-ui'
import { women_invite,agree_invite,reject_invite,weixin_login } from 'api/common'
export default {
  name: 'succ',
  data () {
    return {
      page: 1,
      show1:true,
      selected:"1",
      no_content:false,
      no_content1:false,
      no_content2:false,
      me_agree:false,
      me_reject:false,
      loading:true,
      loading2:true,
      list: [],
      me_list:[],
      other_list:[]
    }
  },
  components: {
    'mt-button': Button,
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem
  },
  methods: {
    to_call(){
      event.stopPropagation();
    },
    load_me(){
      //我邀请的列表
      women_invite({
        params:{
          type:'me'
        }
      }).then((res) => {
        this.loading2 = false;
        if(res.code == 200){
          this.me_list = res.rows;
        }else if(res.code == 401){
          weixin_login('#/women/invite_list');
        }else{
          this.no_content2 = true;
        } 
      })
    },
    load_other(){
      //邀请我的列表
      women_invite({
        params:{
          type:'other'
        }
      }).then((res) => {
        this.loading = false;
        if(res.code == 200){
          this.other_list = res.rows; 
          this.loading = false;                      
        }else if(res.code == 401){
          weixin_login('#/women/invite_list');
        }else{
          this.no_content1 = true;
        } 
      })
    },
    // 点击同意
    accept(num){
      event.stopPropagation();
			agree_invite({
        params:{
          id: num
        }
      }).then((res) => {
        if(res.code == 200){
          this.show1 = false;
          this.me_agree = true;
          Toast({
            message: res.message,
            duration: 2000
          })
          this.load_other();
        }else if(res.code == 401){
          weixin_login('#/women/invite_list');
        }else{} 
			})
    },
    //点击拒绝
    reject(num){
      event.stopPropagation();
			reject_invite({
        params:{
          id: num
        }
      }).then((res) => {
        if(res.code == 200){
          Toast({
            message: res.message,
            duration: 2000
          })
          this.load_other();
        }else if(res.code == 401){
          weixin_login('#/women/invite_list');
        }else{} 
			})
    },
    //点击待评价
    toEval(num,yq_id){
      event.stopPropagation();
      this.$router.push({path: '/women/person_eval'});
      localStorage.setItem('eval_id',num);
      //邀请记录的id
      localStorage.setItem('yq_id',yq_id);
    },
    //查看报名详情
    to_details(invite_enter_name_id){
      this.$router.push({path:'/women/del#person'+invite_enter_name_id})
    }
  },
  mounted: function () {
    this.load_me();
    this.load_other();
  }
}
</script>

<style scoped>
.choose1{margin-right: 10px;}
.right .f-span{margin-right: 45px;}
.phone{margin:10px 0;display: flex;align-items: center;}
.phone_num{flex:1;font-size: 0.24rem;margin-left: 0.85rem;color: #8b8b8b;}
.phone_icon{font-size: 0.45rem;margin-right: 20px;color:green;}
.clear{
  clear: both;
}
/* 加载 */
.demo-spin-container{
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
}
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.3rem;
  box-sizing: border-box;
}
.butt {
  margin: 0.5rem 5% 0 5%;
  width:90%;
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
.list {
  width: 90%;
  margin: 0.2rem 5% 0;
}
.item {
	/* position: relative; */
  min-height: 1.5rem;
  padding-top: 0.2rem;
  /* padding-left: 15px; */
  border-bottom: 1px solid #e9e9e9;
}
.item:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
.left {
  float: left;
}
.icon {
  display: inline-block;
  margin-top: 0.07rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}
.cbut {
  padding: 0.1rem 0.25rem;
  font-size: 0.22rem;
  border-radius: 0.15rem;
  line-height: 0.8rem;
  border-width: 1px;
  border-style: solid;
}
/* 等待 */
.wait{
  line-height: 0.8rem;
  color:#6c6c6c;
  font-size: 0.22rem
}
/* 接受按钮 */
.choose {
  color: #fff;
  background-color: #4cacf0;
  /* margin-right: 10px; */
}
/* 拒绝按钮 */
.choose2{
	background-color: #f77239;
}
.unchoose {
  color: #b9b9b9;
  border-color: #b9b9b9;
  transition: all 2s;
}
.right {
  float: right;
	padding-top: 0.2rem;
}
.center-item {
  margin: 0;
  padding: 0;
  height: 0.3rem;
}
.center {
  float: left;
  margin-left: 0.05rem;
  padding-top: 0.2rem;
  max-width: calc(100% - 1.2rem);
  overflow: hidden;
}
.name {
  padding-left: 0.05rem;
  font-size: 0.26rem;
  line-height: 0.34rem;
}
.other {
  color: #8b8b8b;
  font-size: 0.24rem;
  line-height: 0.4rem;
}
.other span {
  display: inline-block;
  padding: 0 0.03rem;
}
</style>
