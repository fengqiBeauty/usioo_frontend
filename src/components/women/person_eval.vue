<template>
<div v-if="eval">
  <!-- 服务评价 -->
  <p class="title">本次邀请评分</p>
  <div class="f-star" @click='check(fy)'>
    <yd-rate slot="left" v-model="fy" active-color="#f39e34"></yd-rate>
    <span class="f-starval">{{pingjia}}</span>
  </div>
  <textarea class="remark pj" placeholder="说说您对他的评价" v-model="remark"></textarea>
  <mt-button size="large" class="butt"  @click='clickFn'>提交</mt-button>
</div>
<div v-else>
  <p class="success pa">评价成功!</p>
  <p class="paicon pa"><i class="fa fa-check sa"></i></p>
</div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import {Rate} from 'vue-ydui/dist/lib.rem/rate'
import { women_evaluate,weixin_login,enter_name_info } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
      pingjia: '超高',
      title: '',
      remark: '',
      yz: '',
      fy: 5,
      num: 0,
      eval:true,
      imgsrc: '../../../static/logo.png',
      pjlist: ['很不满意', '不满意', '一般', '赞!', '超高']
    }
  },
  components: {
    'mt-button': Button,
    'yd-rate': Rate
  },
  methods: {
    //点击提交
    clickFn: function () {
      women_evaluate({
				params:{
					id: this.pj_id,
					content: this.remark,
					star: this.fy
				}
			}).then((res) => {
				if(res.code == 200){
          Toast({
            message: res.message,
            iconClass: 'fa fa-check',
            duration: 1000
          })
          this.eval = false;
        }else if(res.code == 400){
          Toast({
            message: res.message,
            duration: 1000
          })
          this.eval = true;
        }else if(res.code == 401){
          weixin_login('#/women/person_eval');
        }else{}
			})
		},
		// 选择星级
    check: function (fy) {
      this.pingjia = this.pjlist[fy - 1];
    }
  },
  created: function () {
    this.pj_id = localStorage.getItem('yq_id');
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.f-star{display: -webkit-box;display: -webkit-flex;display: flex;-moz-box-align: center; -webkit-box-align: center;align-items: center;padding-left: 0.2rem;}
.f-starval {
  font-size: 0.24rem;
  font-weight: 700;
  margin-left: 10px;
}
.title {
  padding: 0.2rem 0.2rem 0 0.2rem;
  font-weight: 600;
  margin: 0;
}
.butt {
  margin: 0.3rem 5% 0.2rem 5%;
  width:90%;
  letter-spacing: 0.1rem;
}
.st {
  position: relative;
  margin-left: 0.15rem;
}

.remark {
  font-size: 0.24rem;
  resize: none;
}
.pj {
  display: block;
  margin-top: 0.25rem;
  width: 100%;
  border: 1px solid #E9E9E9;
  min-height: 2rem;
  line-height: 0.3rem;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem;
}
.yzq {
  line-height: 1rem;
}
.yz {
  height: 0.3rem;
  width: 65%;
  border: none;
  margin-left: 3%;
  border-bottom: 1px solid #E9E9E9;
  line-height: 0.3rem;
}
.yzimg {
  width: 20%;
  height: 0.4rem;
  vertical-align: -20%;
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
.paicon {
  margin: 30px 0 60px 0;
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
.par {
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
}
.pa {
  text-align: center;
}
.success {
  margin-top: 1.5rem;
  font-size: 0.35rem;
  font-weight: 700;
}
</style>
