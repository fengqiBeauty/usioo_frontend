<template>
<div class='more_div'>
  <!-- 智慧养老详情 -->
  <div class="headerer">
    <img :src="wd.image_url" class="infoimg">
    <div class="info"><span class="info-type">生活照料</span><span class="info-title">{{wd.title}}</span></div>
  </div>
  <div class="panel">
    <p class="f-p"><span class="clock"></span><span class="djs">倒计时</span><span class="time">{{time}}</span></p>
    <p class="f-p"><span class="persontip">剩余名额：</span><span class="number">{{wd.remain_place}}人</span><span class="persontip">参与人数：</span><span class="number">{{wd.amount-wd.remain_place}}人</span></p>
    <div class="buttons">
      <mt-button size="normal" class="butt" @click='clickyd' :disabled='isDisabled2'>{{sub_Text}}</mt-button> 
      <mt-button size="normal" class="butt butt2" @click='changeLike' :disabled='isDisabled' :class="{isSc:sc}">{{likeText}}</mt-button> 
    </div>
   
  </div>
  <div class="main">
    <div class="nav h"><span :class='{ choosed: choose }' @click='choose = !choose'>详情</span><span :class='{ choosed: !choose }' @click='choose = !choose'>评论</span></div>
    <div class="maininfo" v-show="choose">
      <div class="item">
        <p><i class="fa fa-clock-o icons"></i><span class="xm-title">项目时间</span></p>
        <p>{{wd.hold_time | hex}}</p>
      </div>
      <div class="item">
        <p><i class="fa fa-map-marker icons"></i><span class="xm-title">主办地点</span></p>
        <p>{{wd.address | hex}}</p>
      </div>
      <div class="item">
        <p><i class="fa fa-building-o icons"></i><span class="xm-title">主办单位</span></p>
        <p>{{wd.organizers | hex}}</p>
      </div>
      <div class="item">
        <p><i class="fa fa-credit-card icons"></i><span class="xm-title">项目金额</span></p>
        <p>{{wd.money | hex}}</p>
      </div>
      <div class="item">
        <p><i class="fa fa-calculator icons"></i><span class="xm-title">项目详情</span></p>
        <p class="" v-html="wd.content"></p>
      </div>
    </div>
    <div class="maininfo" v-show="!choose">
      <div class="item plpl" v-for='ele in pl'>
        <p v-if="ele.organ_star !== undefined"><i class="fa fa-commenting icons"></i><span class="xm-title">评论</span></p>
        <p class="star plst">
          <input type="radio" class="plstar" v-for="(e, i) in 6" :value="i" :checked="i === ele.organ_star" v-model="ele.organ_star" disabled v-if="ele.organ_star !== undefined">
        </p>
        <p>{{ele.content | hex}}</p>
      </div>
      <!-- 获取更多评论 -->
      <p class="more" @click='morepls' v-if="isClick">{{morepl}}</p>
      <p class="more" v-else>{{morepl}}</p>
    </div>
    <div class="maininfo" v-show="choose">
      <p @click="yyxz = !yyxz" class="f-maininfo">
        <i class="fa fa-info-circle icons left"></i>
        <span class="xm-title">预约须知</span>
        <span class="right" :class="{ 'right-show': yyxz, 'right-hide': !yyxz }">></span>
      </p>
      <transition name="fade">
        <div v-show="yyxz">
          <div class="item">
            <p class="ty" v-html='wd.sub_notice'></p>
          </div>
        </div>
      </transition>
    </div>
    <div class="maininfo " v-show="choose">
      <p @click="fwjg = !fwjg" class="f-maininfo">
        <i class="fa fa-hospital-o icons left"></i>
        <span class="xm-title">服务机构</span>
        <span class="right" :class="{ 'right-show': fwjg, 'right-hide': !fwjg }">></span>
      </p>
      <transition name="fade">
        <div v-show="fwjg">
          <div class="item">
            <p class="ty">名称</p>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
          <div class="item">
            <p class="ty">介绍</p>
            <p class="hj">{{jgxq.content | hex}}</p>
          </div>
          <div class="item">
            <p class="ty">满意度</p>
            <p class="star hj st">
              <input type="radio" v-for="(e, i) in 6" :value="i" :checked="i === fy" v-model="fy" disabled >
              <span class="stpoint">{{jgxq.grade}}</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
    <p class="f-copy">技术支持 感识科技</p>
  </div>
</div>
</template>

<script>
import { Button, Toast, Picker } from 'mint-ui'
import { smartpension_pension_evaluate } from 'api/common'
import { smartpension_change_like } from 'api/common'
import { smartpension_pension_read } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      wd: {},
      organ: {},
      time: '',
      yyxz: false,
      fwjg: false,
      choose: true,
      ws: [],
      jgxq: {
        content: '',
        grade: 0
      },
      id: 1,
      plnum: 2,
      morepl: '获取更多评论',
      pl: [{}],
      slots: [{
        flex: 1,
        values: [],
        className: 'slot1'
      }],
      like:'',
      likeText:'',
      isDisabled:false,
      isDisabled2:false,
      sub_Text:'',
      sc:'',
      isClick:''
    }
  },
  components: {
    'mt-button': Button,
    'mt-picker': Picker
  },
  computed: {
    fy: function () {
      if (this.jgxq.grade) {
        return Math.ceil(this.jgxq.grade / 2)
      } else {
        return 0
      }
    }
  },
  methods: {
    clickpj: function () {
      this.$router.push({path: '/provideAged/person'})
    },
    onValuesChange: function (picker, values) {
      if (values[0] !== undefined) {
        this.jgxq = this.organ[values[0].split('.')[0]]
      }
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    // 点击“我要预约”
    clickyd: function () {
      if (this.wd.remain_place <= 0) {
        Toast({
          message: '抱歉，预约人数已满！',
          duration: 1000
        })
        return
      }
      if(this.t <= 0){
        Toast({
          message: '抱歉，预约项目已经过期！',
          duration: 1000
        })
        return
      }
      this.$router.push({path: '/provideAged/toorder'})
    },
    // 点击获取更多评论
    morepls: function () {
      smartpension_pension_evaluate({
        params: {
          'pension_id': this.id,
          'page': this.plnum
        }
      }).then((res) => {
        if (res.rows) {
          var page = res.page_sort.page;
          var size =  res.page_sort.size;
          var more = Number(page) * Number(size);
          var total = res.total;
          //判断是否有更多评论
          if(total > more){
            this.morepl = '查看更多评论';
            //是否可以点击
            this.isClick = true;
          }else{
            this.morepl = '没有更多评论了';
            //是否可以点击
            this.isClick = false;
          }
          if (res.rows.length === 0) {
            that.pl = [];
            this.morepl = '没有更多评论了'
          }
          for (var i of res.rows) {
            this.pl.push(i)
            this.plnum++
          }
        } else {
          this.morepl = '没有更多评论了'
        }
      })
    },
    //点击收藏
    changeLike(){
      smartpension_change_like({
        'id': this.wd.id
      }).then((res) => {
        if(res.code == 200){
          this.isDisabled = false;
          if(res.message == '已取消收藏'){
            this.likeText = '收藏';
            this.sc = false;
            Toast({
              message: '已取消收藏',
              duration: 1000
            })
          }else{
            this.likeText = '取消收藏';
            this.sc = true;
            Toast({
              message: '收藏成功',
              duration: 1000
            })
          }
        }
      })
    }
  },
  // 养老项目详情
  //activated钩子函数，keep-alive组件激活时调用。该钩子在服务器端渲染期间不被调用。
  activated: function () {
    document.documentElement.scrollTop = 0;  
    window.pageYOffset = 0;  
    document.body.scrollTop = 0;  
    this.choose = true;
    var arr = [];
    var that = this;
    var id = parseInt(window.location.href.split('#provide')[1]) || 1;
    this.id = id;
    //养老项目详情
    smartpension_pension_read({
      params: {
        'id': id
      }
    }).then((res) => {
      if (res.code === 200) {
        that.wd = res.data;
        if(that.wd.sub_status == 1){
          this.sub_Text = '已预约';
          this.isDisabled2 = true;
        }else{
          this.sub_Text = '我要预约';
          this.isDisabled2 = false;
        }
        if(that.wd.like_status == 0){
          that.likeText = '收藏';
          this.sc = false;
        }else{
          that.likeText = '取消收藏';
          this.sc = true;
        } 
      }else if(res.code === 401){
        weixin_login('#/provideAged/more')
      } else {
        Toast({
          message: '信息获取失败',
          duration: 1000
        })
        return
      }
      if (!that.wd.organs_info) {
        that.wd.organs_info = {}
      }
      for (var i in that.wd.organs_info) {
        that.organ[that.wd.organs_info[i].id] = that.wd.organs_info[i];
        arr.push(that.wd.organs_info[i].id + '.' + that.wd.organs_info[i].name);
      }
      that.slots[0].values = arr;
      // that.jgxq = that.wd.organs_info[that.wd.organ_ids[0]];
      that.$store.commit('addorder', that.wd);
      localStorage.setItem('ortitle', that.wd.title);
      localStorage.setItem('orid', that.wd.id);
      localStorage.setItem('jglist', JSON.stringify(that.organ));
      time()
    })
    //指定项目的评价列表
    smartpension_pension_evaluate({
      params: {
        'pension_id': id
      }
    }).then((res) => {
      if (res.code === 200) {
        that.pl = res.rows;
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
        if (res.rows.length === 0) {
          that.pl = [];
          this.morepl = '没有更多评论了'
        }
      } else {
        Toast({
          message: '评论获取失败',
          duration: 1000
        })
      }
    })
    // 计算倒计时
    function time () {
      //判断android，ios
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if(!isAndroid){
        that.wd.end_time = that.wd.end_time.replace(/-/g,'/');
      }
      that.t = new Date(that.wd.end_time).getTime() - new Date().getTime();
      // 判断项目是否过期，过期时倒计时显示‘已过期’
      if (that.t <= 0) {
        that.time = '已过期';
        return;
      }else{
        //没有过期时显示倒计时
        var day = Math.floor(that.t / 1000 / 60 / 60 / 24);
        var hour = Math.floor(that.t / 1000 / 60 / 60 % 24);
        var min = Math.floor(that.t / 1000 / 60 % 60);
        var sec = Math.floor(that.t / 1000 % 60);
        if (day > 0) {
          day = day + '天'
        } else {
          day = ''
        }
        if (hour < 10) {
          hour = '0' + hour
        }
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        that.time = day + hour + ':' + min + ':' + sec;
        setTimeout(time, 1000)
      }
      
     
    }
  },
  mounted () {
   
  }
}
</script>

<style scoped>
/* .more_div{width:100%;overflow-x: hidden;} */
.f-p{
  word-break:break-all;
  word-wrap:break-word ;
}
.infoimg {
  display: block;
  width: 100%;
}
.headerer {
  position: relative;
}
.info {
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
  color: #fff;
  line-height:1rem;
  box-sizing: border-box;
  padding: 0 0.2rem;
  background-color: rgba(76,172,240,0.75);
}
.info-type {
  border: 1px solid #fff;
  border-radius: 0.05rem;
  /* font-size: 0.16rem; */
  font-size: 0.26rem;
  padding: 0.03rem 0.07rem;
}
.info-title {
  margin-left: 0.2rem;
  /* font-size: 0.17rem; */
  font-size: 0.27rem;
  font-weight: 500;
}
.clock {
  display: inline-block;
  width: 25%;
  height: 0.22rem;
  background: url(../../common/images/yang.png) no-repeat;
  background-size: 0.22rem 0.22rem;
  text-align: left;
  overflow: visible;
  vertical-align: -15%;
}
.panel {
  width: 100%;
  padding: 0.1rem 0;
  box-sizing: border-box;
  border-top: 0.1rem solid #E9E9E9;
  border-bottom: 0.1rem solid #E9E9E9;
}
.panel p {
  margin: 0.1rem 10%;
  text-align: center;
}
.panel p:nth-child(1) span{
  display: inline-block;
}
.panel p:nth-child(2) span{
  display: inline-block;
  width: 25%;
  font-size: 0.17rem;
}
.djs {
  width: 25%;
  color: #808080;
  margin-left: -12%;
}
.time {
  width: 70%;
  font-size: 0.4rem;
  color: #F09624;
}
.number {
  font-size: 0.2rem;
}
.buttons {
  font-size: 0;
  width: 100%;
  margin-top: 0.2rem;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  padding: 0.2rem 10% 0.1rem;
  text-align: center;
}
.butt {
  display: inline-block;
  width:45%;
  font-weight: 500;
}
.butt2 {
  margin-left: 10%;
}
.main {
  width:100%;
}
.item {
  border-bottom: 1px solid #E9E9E9;
  font-size: 0.28rem;
  line-height: 0.45rem;
  padding: 0 0.25rem;
}
.item p {
   margin: 0.1rem 0;
}
.item p:nth-child(2){
  box-sizing: border-box;
  white-space: normal;
  word-break: normal;
  padding: 0 10%;
}
.ty {
  box-sizing: border-box;
  padding: 0 10%;
}
.icons {
  width:8%;
  font-size: 0.28rem;
}
.xm-title {
  vertical-align: 5%;
  font-size: 0.28rem;
  color: #F09624;
  margin-left: 0.1rem;
}
.maininfo {
  border-bottom: 0.1rem solid #E9E9E9;
}
p.f-maininfo{
  height: 48px;
  line-height:48px;
}
.left {
  margin-left: 0.2rem;
}
.right {
  float: right;
  margin-right: 0.2rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: #ccc;
}
.right-hide {
  transform: scaleY(1.5);
}
.right-show {
  transform: rotate(90deg) scaleY(1.5);
}
p.star {
  height: 0.6rem;
  line-height: 0.6rem;
}
.bottom {
  border-bottom: 0.1rem solid #E9E9E9;
}
.hj {
  color: #b3b3b3;
}
.hj img, .hg span {
  display: inline-block;
}
.st {
  position: relative;
}
.choosed {
  background-color: #4CACF0;
  color: #fff;
}
.nav span {
  border-bottom: 2px solid #4CACF0;
}
.ry {
  padding: 0 10%;
  margin: 0.2rem;
}
.persontip {
  color: #808080;
  text-align: left;
  box-sizing: border-box;
}
.panel p:nth-child(2) span{
  font-size: 0.28rem;
}
.picker-slot{
  font-size: 0.28rem;
}
.stpoint {
  /* top: 0.11rem; */
  font-size: 0.35rem;
  color: #f39e34;
}
.plpl {
  position: relative;
}
.plst {
  position: absolute;
  top: -0.24rem;
  right: 0;
  transform: scale(0.7);
}
.more {
  margin: 0.05rem 0;
  text-align: center;
  color: #4CACF0;
  font-size: 0.26rem;
}
.plpl p:nth-child(3) {
  white-space: normal;
}
.isSc{background-color: #94CDF6;}
.f-copy{font-size: 0.18rem;line-height: 0.6rem;color:#ccc;text-align: center;}
input[type=radio]{
  vertical-align: baseline;
}
</style>
