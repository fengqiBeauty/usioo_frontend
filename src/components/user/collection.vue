<template>
<div class="bg">
  <mt-navbar v-model="selected">
    <mt-tab-item id="zhyl" @click.native="">智慧养老</mt-tab-item>
    <mt-tab-item id="sqhd" @click.native="">社区活动</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected">
    <!-- 智慧养老收藏 -->
    <mt-tab-container-item id="zhyl">
      <div class="sad" v-if='isSad'>
        <p class='sad_text'>您暂时没有收藏的项目~~</p>
      </div>
      <div class="project" v-for='(item,index) in collects' :key='index' @click="toDetail(item.id)">
        <div class="pro">
          <p class="pro_title">{{item.title}}</p>
          <p class='end_time'>终止日期:{{item.end_time}}</p>
        </div>
        <div class="sc" @click.stop="changeLike(item.id,item.title)">
          <button class="f-but">取消收藏</button>
        </div>
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="sqhd">
      <!-- 社区活动收藏 -->
    </mt-tab-container-item>
  </mt-tab-container>
  <div class="tagging">技术支持 感识科技</div>
</div>
</template>

<script>
import { Navbar, TabItem , Button,Toast  } from 'mint-ui'
import { smartpension_record, pension_like_list,smartpension_change_like, weixin_login } from 'api/common'
export default {
  name: 'List',
  data () {
    return {
      selected: 'zhyl',
      isSad:false,
      collects:{}
    }
  },
  components: {
    'mt-navbar' : Navbar,
    'mt-tab-item' : TabItem
  },
  methods: {
    //获取列表
    load_list(){
      var self = this;
      pension_like_list().then((res) => {
        if(res.code == 200){
          self.collects = res.rows;
        }else if(res.code == 401){
          weixin_login('#/user/collection');
        }else{
          self.collects = [];
        }
        if(res.total == 0 || res.total == ''){
          self.isSad = true;
        }
      })
    },
    //点击取消收藏
    changeLike(num,title){
      var self = this;
      smartpension_change_like({
        'id':num
      }).then((res) => {
        if(res.code == 200){
          if(res.message == '已取消收藏'){
            Toast({
              message: '已取消\"'+title+'\"的收藏',
              duration: 1000
            }) 
            self.load_list();
          }
        }
      })
    },
    // //点击进入项目详情页面
    toDetail(pid){
      this.$router.push({ path: "/provideAged/more#provide" + pid });
    }
  },
  mounted () {
    this.load_list();
  }
}
</script>

<style scoped>
.tagging{position: fixed;bottom: 10px;font-size: 0.2rem;left:35%;color: #ccc;}
.f-wu{
  text-align: center;
  margin-top: 3rem;
  width:100%;
}
.selected {
  color: #5aa8e1;
  border-color: #5aa8e1;
}
.list {
  width: 100%;
  padding: 0 0 0.5rem;
}
.item {
  width: 100%;
  border-bottom: 3px solid #eee;
  box-sizing: border-box;
  padding: 0 2%;
  font-size: 0.16rem;
  white-space: normal;
  word-break: normal;
}
.item-title, .item-cj {
  display: inline-block;
  white-space:nowrap;
  overflow: hidden;
  line-height: 0.5rem;
}
.item-main {
  display: block;
  white-space:nowrap;
  overflow: hidden;
  line-height: 0.5rem;
}
.item-title {
  max-width: 70%;
}
.item-cj {
  max-width: 20%;
  float: right;
  color: #5aa8e1;
}
.sd {
  display: block;
  padding: 0.1rem 0;
  font-size: 0.17rem;
}
.im-in {
  color: #4cacf0;
}
.f-card{
  background:#EAEAEA;
  padding: 15px;
}
.ivu-card-head p, .ivu-card-head-inner{
  font-size: 0.26rem;
}
.ivu-card {
  font-size: 0.26rem;
}
.bg {
  width: 100%;
  height: 100%;
  position:absolute;
  overflow: hidden;
  background-color: #ededed;
}
.card{height: 4rem;background: #fff;width: 100%;margin: 10px;}
.card_title{height: 1rem;background-color: #4DACF0;color:#fff;font-size: 0.4rem;line-height: 1rem;padding-left: 20px;}
.bz,.time{padding:20px 30px;}
.bz p:nth-child(1),.time p:nth-child(1){color:#8A8A8A;}
.toEval{font-size: 0.25rem;float: right;margin-right: 15px;}
.f-but{border:1px solid #FFBC44;background: #fff;color:#FFBC44;padding:0.12rem 0.25rem;border-radius: 15px;}
.project{height:1.5rem;
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
  margin: 10px;}
.pro{flex:2;padding-left: 15px;}
.sc{flex:1}
.pro_title{font-size: 0.3rem;font-weight: 700}
.sad{
  position: relative;
  width:100%;
  height:300px;
  background: url('../../common/images/sad.png') center no-repeat;
}
.sad_text{
  position: absolute;
  bottom:0;
  width: 100%;
  text-align: center;
}
.end_time{font-size: 0.23rem;color:#8A8A8A}
</style>
