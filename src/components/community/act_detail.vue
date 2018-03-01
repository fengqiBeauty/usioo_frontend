<template>
<div>
  <!-- 智慧养老详情 -->
  <div class="headerer">
    <img :src="wd.image_url" class="infoimg">
  </div>
  <div class="main">
    <div class="nav h"><span :class='{ choosed: choose }' @click='choose = !choose'>介绍</span><span :class='{ choosed: !choose }' @click='choose = !choose'>评论</span></div>
    <div class="maininfo" v-show="choose">
      <div class="item">
        <p class="act_title">【公益培训】中国象棋课程培训</p>
        <p class="act_like"><span>434人喜欢</span><span>好评率100%</span><span>25人评论</span></p>
        <p class="act_sy">剩余名额：28</p>
      </div>
      <div class="item">
        <p>中国象棋文化是中华民族文化的结晶。中国象棋文化是中华民族文化的结晶。中国象棋文化是中华民族文化的结晶。中国象棋文化是中华民族文化的结晶。中国象棋文化是中华民族文化的结晶。中国象棋文化是中华民族文化的结晶。</p>
      </div>
      <div class="item">
        <p>
          <i class="iconfont icon-rili1 f-icon"></i>
          <span class="f-icon">8月7日起每周一至周五下午3:00-4:00</span>
        </p>
      </div>
      <div class="item">
        <div class="flex-box">
          <i class="iconfont icon-weibiaoti104 f-icon"></i>
          <p class="f-icon">福田保税区桂花路15号红树福田保税区桂花路15号红树</p>
        </div>
      </div>
      <div class="item">
        <div class="flex-box">
          <i class="iconfont icon-xiangqing f-icon"></i>
          <div style="margin-left:5px;">
            <div class="f-icon">报名对象：福保街道中小学</div>
            <div class="f-icon">注意事项：请认真阅读街道文化请认真阅读街道文化</div>
            <div class="f-icon act_sj">
              <div>报名时间：</div>
              <div>
                <span>2017-07-28 00:00 开始</span><br><span>2017-07-28 00:00 结束</span>                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="act_like">* 举办单位 福保街道文化站</p>
      </div>
      
    </div>
    <div class="maininfo" v-show="!choose">
      <div class="item pl_item">
        <img src="../../common/images/201.jpeg" alt="" class="f-left">
        <div class="f-right">
          <div class="right_top">
            <div class="top_left">
              <p>用户1</p>
              <p class="pl_time">2017-07-07</p>
            </div>
            <div class="top_right"> 
              <yd-rate slot="left" :readonly="true" active-color="#f39e34" size="0.38rem"></yd-rate>
            </div>
          </div>
          <div class="right_bottom">11111111111111111111111</div>
        </div>
      </div>
      <div class="item pl_item">
        <img src="../../common/images/201.jpeg" alt="" class="f-left">
        <div class="f-right">
          <div class="right_top">
            <div class="top_left">
              <p>用户1</p>
              <p class="pl_time">2017-07-07</p>
            </div>
            <div class="top_right"> 
              <yd-rate slot="left" :readonly="true" active-color="#f39e34" size="0.38rem"></yd-rate>
            </div>
          </div>
          <div class="right_bottom">11111111111111111111111</div>
        </div>
      </div>
    </div>
    <div class="item_bottom">
      <p class="flo_p"><i class="iconfont icon-xihuan"></i>&nbsp;喜欢</p>
      <p class="flo_p" @click="to_eval()"><i class="iconfont icon-pingjia"></i>&nbsp;评价</p>
      <p class='want_bm' @click="sign_up">我要报名</p>
    </div>
  </div>
</div>
</template>

<script>
import { Button, Toast, Picker } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate';
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
    'mt-picker': Picker,
    'yd-rate': Rate,
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
      this.$router.push({path: '/community/com_order'})
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
          console.log(res)
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
    },
    //我要报名
    sign_up(){
      this.$router.push({path:'/community/com_order'});
    },
    //评价
    to_eval(){
      this.$router.push({path:'/community/com_eval'});
    }
  },
  // 养老项目详情
  //activated钩子函数，keep-alive组件激活时调用。该钩子在服务器端渲染期间不被调用。
  activated: function () {
    document.body.scrollTop = 0;
    this.choose = true;
    var arr = [];
    var that = this;
    var id = parseInt(window.location.href.split('#provide')[1]) || 1
    this.id = id
    
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
      //that.jgxq = that.wd.organs_info[that.wd.organ_ids[0]];
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
      //var t = new Date(that.wd.end_time * 1000).getTime() - new Date().getTime()
      that.t = new Date(that.wd.end_time).getTime() - new Date().getTime()
      // 判断项目是否过期，过期时倒计时显示‘已过期’
      if (that.t <= 0) {
        that.time = '已过期'
        return
      }
      // 没有过期时显示倒计时
      var day = Math.floor(that.t / 1000 / 60 / 60 / 24)
      var hour = Math.floor(that.t / 1000 / 60 / 60 % 24)
      var min = Math.floor(that.t / 1000 / 60 % 60)
      var sec = Math.floor(that.t / 1000 % 60)
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
      that.time = day + hour + ':' + min + ':' + sec
      setTimeout(time, 1000)
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.act_title{font-weight: 700;}
.act_like{font-size: 0.22rem;color:#ccc;}
.act_like span {margin-right: 20px;}
.act_sy,.f-icon{color:#4081CD}
.flex-box{	
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}
.flex-box p{margin-left: 5px;}
.flex_p{
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.act_sj{
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}
.item_bottom{
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
  padding: 0.1rem 0.25rem;
}
.item_bottom p{
  flex:1;
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.want_bm{width: 100px;height: 0.7rem;color:#fff;display:flex;justify-content: center;line-height: 0.7rem;background: linear-gradient(to right, #4081CD,#4081CD,#4081CD,#76BAFB);}
.pl_item{
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}
.f-left {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.08rem;
}
.f-right{flex:1;}
.right_top{
  display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}
.top_left{flex:3}
.top_right{flex:1;}
.pl_time{color:#ccc; }
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

.item{
  border-bottom: 1px solid #E9E9E9;
  font-size: 0.26rem;
  line-height: 0.45rem;
  padding: 0.1rem 0.25rem;
}
.maininfo {
  border-bottom: 0.1rem solid #E9E9E9;
}
.bottom {
  border-bottom: 0.1rem solid #E9E9E9;
}
.st {
  position: relative;
}
.choosed {
  /* background-color: #4CACF0; */
  color: #4081CD;
}
/* .nav span {
  border-bottom: 2px solid #4CACF0;
} */
.panel p:nth-child(2) span{
  font-size: 0.28rem;
}
.more {
  margin: 0.05rem 0;
  text-align: center;
  color: #4CACF0;
  font-size: 0.26rem;
}
.h{border:none;}
</style>
