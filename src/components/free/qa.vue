<template>
<div style="height: 100%;">
<div class="qa">
  <p class="qatitle">{{title}}</p>
  <div class="tip">
    <span class="tip-item" :class='{selected: num === 1}' @click='tips(1)'>1</span>
    <!--<span class="tip-item" v-show="num <=2" :class='{selected: num === 2}' @click='tips(2)'>2</span>-->
    <i>--</i>
    <span class="tip-item" :class="{selected:num >= 2 && num < list.length}">{{num}}</span>
    <i>--</i>
    <!--<span class="tip-item" v-show="num >= list.length - 1 && num != 2" :class='{selected: num === list.length - 1}' @click='tips(3)'>{{list.length - 1}}</span>-->
    <span class="tip-item" :class='{selected: num === list.length}' @click='tips(list.length)'>{{list.length}}</span>
  </div>
  <div class="answer" >
    <!--<p class="question">{{tm.title}}</p>-->
    <div class="ans-area">
     		<p class="ans-topic" v-show="poic"><span style="padding-right: 0.1rem;">{{num}}.</span>{{ poic }}</p>
     		<p v-if="!poic" style="text-align: center;color: #666;font-size: 0.3rem;padding: 0.5rem;">暂无答题~</p>
	   
	   <mt-radio
				v-model="val"
				:options="obj" v-if="and == 1">
			</mt-radio>
			
			<mt-checklist
			  v-model="valcheck"
			  :options="obj" v-if="and == 2">
			</mt-checklist>

    </div>
    <mt-button size="large" class="butt" @click='clickFn(1)' v-show="num !== list.length" :disabled="!val" v-if="and == 1">下一题</mt-button>
    <mt-button size="large" class="butt" @click='clickFn(1)' v-show="num !== list.length" :disabled="valcheck.length == 0" v-if="and == 2">下一题</mt-button>
    <mt-button size="large" class="butt" @click='openOver' v-show="num === list.length" :disabled="!val" v-if="and == 1">提交</mt-button>
    <mt-button size="large" class="butt" @click='openOver' v-show="num === list.length" :disabled="valcheck.length == 0" v-if="and == 2">提交</mt-button>
    <mt-button size="large" class="butt die" @click='clickFn(-1)'>上一题</mt-button>
  </div>
  <div class="over over-cj" v-show='choujiang'>
    <span class="cj-exit" @click='closeOver'>x</span>
    <div class="cj">
      <p>提交成功!</p>
      <p>还有精彩好礼等你拿</p>
      <img src="../../common/images/gift.png" class="cjimg">
      <span class="qcj" @click='tocj'>去抽奖</span>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { Button,Toast,Radio,Checklist } from 'mint-ui'
import { free_question,weixin_login,free_question_list } from 'api/common'
export default {
  name: 'endorder',
  data () {
    return {
    	and:'',//单选还是多选
      id:'',
      obj:[],
      num: 1,
      choujiang: false,
      value:{},
      valcheck:[],//多选数组
      val:'',//单个单选答案
      valarr:[],//最终答案
      tm: {},
      poic:'',
      title: '“清风福保”纪检条例法规有奖问答',
      ques:'',
      list: [],
      rule:'',
      lotto:''//抽奖次数
    }
  },
  components: {
    'mt-button': Button,
    'mt-radio':Radio,
    'mt-checklist':Checklist
  },
  methods: {
    clickFn: function (n) {
      	if (n === 1) {
      			if (this.and == 1) {
      					this.valarr.push(this.val)
      					this.val = ''
      					this.valcheck = []
      					
      			} else {
      					this.valcheck = this.valcheck.toString(',')
      					this.valarr.push(this.valcheck)
      					this.val = ''
      					this.valcheck = []
      			}
      			this.num = this.num + 1
      			this.poic = this.list[this.num - 1].title
      			this.and = this.list[this.num - 1].type
      			this.obj = this.list[this.num - 1].options_arr
      	} else if (this.num > 1) {
      			this.num = this.num - 1
      			this.poic = this.list[this.num - 1].title
      			this.and = this.list[this.num - 1].type
      			this.obj = this.list[this.num - 1].options_arr
      			
      			if (this.and == 1) {
      					this.val = this.valarr[this.num - 1]
      					this.valarr.pop(this.num - 1)
      					console.log(this.valarr)
      			} else {
      					this.valcheck = this.valarr[this.num - 1].split(',')
      					this.valarr.pop(this.num - 1)
      					console.log(this.valarr)
      			}
	
      	}
    },
    closeOver: function () {//关闭
      this.choujiang = false
    },
    openOver: function () {//提交
    	if (this.and == 1) {
    			this.valarr.push(this.val)
    			this.val = ''
    			this.valcheck = []
    			
    	} else {
    			this.valcheck = this.valcheck.toString(',')
    			this.valarr.push(this.valcheck)
    			this.val = ''
      		this.valcheck = []
    	}
    	this.num = 1
			console.log(this.valarr)
			this.question_list();

    },
    tocj: function () {
    		this.$router.push({path: '/free/lottery',query: {id:this.id,lotto:this.lotto,rule:this.rule}})
    },
    tips: function (n) {//第一页或者最后一页
     	if (n === 1) {
     			this.num = 1
     	} else {
     			this.num = n
     	}
    },
    question:function(){//根据id获取题目
	    	free_question({
		    		params:{
		    					'askpaper_id': this.id,
		    			}
		    }).then((res)=>{
		  		if (res.code == 200) {
		  			this.list = res.rows
		  			this.poic = this.list[0].title
		  			this.obj = this.list[0].options_arr
		  			this.and = this.list[0].type
		  			console.log(res)
		  		} else if (res.code == 401) {
		  			weixin_login("#/free/qa")
		  		}
	    	})
    },
    question_list:function(){//提交答案
    		free_question_list({
    				params:{
    						'askpaper_id': this.id,
    						'answer_arr': this.valarr
    				}
    		}).then((res)=>{
    				if (res.code == 200) {
    					this.choujiang = true
    					this.lotto = res.remain_lotto_count
 							this.valarr = []
    				} else if(res.code == 401) {
    						weixin_login("#/free/qa")
    				} else {
    					Toast(res.message)
    					this.valarr = []
    				}
    			
    		})
    }
    
  },
  created: function () {
    for (var i = 0; i < this.list.length; i++) {
      this.value[i + 1] = []
    }
    this.tm = this.list[0]
  },
  mounted(){
		this.id = this.$route.query.id
		this.rule = this.$route.query.rule
		this.question()

  },
  watch:{


  }
}
</script>

<style scoped>
.qa-show{
	width: 100%;
	text-align: center;
	color: #666;
	box-sizing: border-box;
	padding-top: 2rem;
	font-size: 0.4rem;
	/*margin-top: 2rem;*/
}
.qa {
  background-image: url(../../common/images/bg.png);
  background-color: #5cb3f0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
}
.tip {
  text-align: center;
  padding-bottom: 0.16rem;
  margin-left: -0.12rem;
}
.tip-item {
  display: inline-block;
  border-radius: 50%;
  background-color: #7BBEEF;
  width:0.32rem;
  height:0.32rem;
  line-height: 0.2rem;
  margin: 0 0.12rem;
  padding: 0.06rem 0;
  color: #fff;
}
.selected {
  border-bottom: none;
}
.tip i {
  color: #fff;
}
.butt {
  margin: 0.1rem 10%;
  width:80%;
}
.selected {
  color: #4CACF0;
  background-color: #fff;
}
.die {
  color: #4CACF0;
  background-color: #fff;
  box-shadow: none;
}
.qatitle {
  line-height: 0.6rem;
  margin: 0;
  text-align: center;
  color: #fff;
}
.answer {
  width: 90%;
  margin-left: 5%;
  padding-bottom: 0.2rem;
  border-radius: 0.08rem 0.08rem;
  background-color: #fff;
  overflow: hidden;
}
.question {
  background-color: #D6EDFF;
  margin: 0;
  line-height: 0.6rem;
  text-align: center;
}
.over-cj {
  background-color: rgba(176,196,222,0.7);
  z-index: 1;
}
.cj {
  position: absolute;
  top: 17%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  text-align: center;
  color: #fff;
  border-radius: 0.1rem;
  z-index: 1;
  border: none;
  overflow: hidden;
}
.cjimg {
  height: 1.2rem;
  display: block;
  margin: 0.2rem auto;
}
.cj p {
  background-color: #feb626;
  margin: 0;
  padding-top: 0.1rem;
  line-height: 0.4rem;
}
.cj p:nth-child(1) {
  font-size: 0.27rem;
  font-weight: bold;
}
.cj p:nth-child(2) {
  margin-top: -0.05rem;
}
.cj-exit {
  position: absolute;
  right: 15%;
  top: calc(17% - 0.7rem);
  border-radius: 50%;
  background-color: #feb626;
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.45rem;
  font-size: 0.38rem;
  color: #fff;
  text-align: center;
}
.cj-exit:after {
  content:"";
  position: absolute;
  bottom: -0.2rem;
  left: 0.22rem;
  width: 0.06rem;
  height: 0.3rem;
  line-height: 0.6rem;
  background-color: #feb626;
}
.qcj {
  display: inline-block;
  background-image: url(../../common/images/btn.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0.25rem 0.01rem;
  padding: 0.1rem 0;
  width: 2rem;
  height: 0.4rem;
  margin-bottom: 0.16rem;
  line-height: 0.2rem;
}
.ans-area {
  /*height: 4.2rem;*/
}
.ans-topic{
	font-size: 0.3rem;
	padding: 0.05rem 0.15rem;
}
.ans-ta {
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  padding: 0.15rem;
  font-size: 0.15rem;
  resize: none;
}
</style>
