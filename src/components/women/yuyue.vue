<template>
<div class="hdybm yuyue">
  <div class="picker_box" >
    <mt-field label="预约业务" placeholder="请选择预约业务" class="f-hd" readonly v-model="title"></mt-field>
  </div>
  <div class="picker_box" @click="open">
    <mt-field label="预约日期" placeholder="请选择预约日期" class="f-hd" readonly v-model="project.sub_date" disableClear></mt-field>
    <span class="angle-right"><span class="iconfont icon-right" ></span></span>
  </div>
  <div class="picker_box" @click="show_time = true">
    <mt-field label="预约时间" placeholder="请选择预约时间" class="f-hd" readonly v-model="project.sub_time" disableClear></mt-field>
    <span class="angle-right"><span class="iconfont icon-right" ></span></span>
  </div>
    <div class="info">
      <p class="title">预约人信息</p>     
      <mt-field label="姓名" placeholder="请输入姓名" class="f-xm" v-model="project.real_name"></mt-field>
      <div class="sexr borbo f-sexbox sex2 f-mm">
        <span class="mint-cell-text f-sextitle">性别</span>
        <yd-radio-group class="sexType" size="20" v-model="project.sex" color="#3891F7">
            <yd-radio val="1"><span style="font-size: 0.24rem;">男</span></yd-radio>
            <yd-radio val="2"><span style="font-size: 0.24rem;">女</span></yd-radio>
        </yd-radio-group>
      </div> 
      <div class="sg_box">
        <mt-field label="身份证号" placeholder="请输入身份证号" v-model="project.id_card"></mt-field>
      </div>
      <div class="picker_box" @click="show_age = true">
        <mt-field label="年龄范围" placeholder="请选择年龄范围" readonly disableClear v-model="project.age"></mt-field>
        <span class="angle-right"><span class="iconfont icon-right" ></span></span>
      </div>
      <div class="picker_box" @click="show_location = true">
        <mt-field label="预约地址" placeholder="请选择预约地址" disableClear readonly v-model="project.address"></mt-field>
        <span class="angle-right"><span class="iconfont icon-right"></span></span>
      </div>
      <mt-field label="详细地址" placeholder="请输入详细地址" v-model="project.detail_address"></mt-field>
      <mt-field label="联系手机" placeholder="请输入手机号码" class="borbo" v-model="project.mobile"></mt-field>
      <div class="sexr borbo sex2">
        <span class="mint-cell-text">预约备注</span>
      </div>
      <textarea class="ta f-ta" placeholder="请填写备注信息" v-model="project.remark"></textarea>
    </div>
    <div class="btn">
      <mt-button size="large" class="butts" @click="to_order">预约信息提交</mt-button>
    </div>
    <!-- 预约时间 -->
    <yd-popup v-model="show_time" position="center" width="90%" height="30%">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      <mt-button type="default" class="f-btn" @click="show_time = false">确定</mt-button>
    </yd-popup>
    <!-- 预约日期 -->
    <yd-datetime start-date="2018-01-01" ref="date" slot="right" type="date" v-model="project.sub_date"></yd-datetime>
    <!-- 预约地址 -->
    <yd-cityselect v-model="show_location" ref="cityselectDemo" :callback="result" :items="district"></yd-cityselect>
    <!-- 年龄范围 -->
    <yd-popup v-model="show_age" position="center" width="90%" height="30%">
      <yd-radio-group v-model="project.age" color="#3891F7" class="xueli">
        <div>
          <yd-radio val="18岁以下"></yd-radio>
          <yd-radio val="18~24岁"></yd-radio>
        </div>
        <div>
          <yd-radio val="25~35岁"></yd-radio>
          <yd-radio val="36~40岁"></yd-radio>
        </div>
        <div>
          <yd-radio val="41~45岁"></yd-radio>
          <yd-radio val="45岁以上"></yd-radio>
        </div>
      </yd-radio-group>
      <mt-button type="default" class="f-btn" @click="show_age = false">确定</mt-button>
    </yd-popup>
  </div>
</div>
</template>

<script>
import { mental_order, weixin_login} from 'api/common'
import { Button, Field, DatetimePicker, Toast, MessageBox, Picker } from "mint-ui";
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
import District from 'ydui-district/dist/gov_province_city_area_id';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
export default {
  name: "order",
  data() {
    return {
      title:'',
      show_location: false,
      show_age: false,
      show_time: false,
      district: District,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      project:{
        mental_id:'',
        sub_date:'',
        sub_time:'',
        real_name:'',
        sex:1,
        mobile:'',
        id_card:'',
        age_range:'18岁以下',
        address:'',
        detail_address:'',
        remark:''
      }
    };
  },
  components: {
    "mt-button": Button,
    "yd-radio-group": RadioGroup,
    "yd-radio": Radio,
    "yd-datetime": DateTime,
    "yd-cityselect": CitySelect,
    "yd-popup": Popup,
    "mt-picker": Picker
  },
  computed: {
    
  },
  methods: {
    result(ret) {
      this.project.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    //预约时间
    open(){
      this.$refs.date.open();
    },
    //预约时间选择
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.project.sub_time = values[0];
    },
    //点击预约提交 
    to_order(){
      mental_order({
        params:this.project
      }).then((res) => {
        if(this.project.sub_time == ''){
          Toast({
            message: '请选择预约时间',
            duration: 1000
          })
          return;
        }
        if(this.project.real_name == ''){
          Toast({
            message: '请填姓名',
            duration: 1000
          })
          return;
        }
        if(this.project.mobile == ''){
          Toast({
            message: '请填联系手机',
            duration: 1000
          })
          return;
        }
        if(res.code == 200){
          this.$router.push({path: '/women/success'});
        }else if(res.code == 401){
          weixin_login('#/user/home');
        }else{}
      })
    }
    
  },
  mounted () {
    document.documentElement.scrollTop = 0;  
    window.pageYOffset = 0;  
    document.body.scrollTop = 0;  
    this.title = localStorage.getItem('project');
    this.slots[0].values = localStorage.getItem('time_slot_arr').split(",");
    this.project.mental_id = parseInt(window.location.href.split('#pro')[1]);
  }
};
</script>

<style scoped>
.hope_hy{display: flex;align-items: center;padding:15px 10px;}
.f-btn{padding: 0 0.6rem;margin-top: 20px;}
.sexType{margin-left: 1.2rem;}
.timeType{margin-left: 0.3rem;}
.but1 {
  top: 6rem;
}
.but2 {
  top: 7rem;
}
.but4 {
  opacity: 0;
  z-index: 1;
  background-color: #fff;
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
.info {
  box-sizing: border-box;
  padding: 0 0.1rem 0.1rem;
  color: #757575;
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
.btn{padding:20px;}
.btn2{width: 40%;display: inline-block;margin-top: 4rem;}
.btn3{width: 40%;display: inline-block;}
.btn_next{margin-left: 1rem;}
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
.ta {
  width: 100%;
  height: 2rem;
  resize: none;
  border: none;
  box-sizing: border-box;
  padding: 0.1rem 0.1rem;
  font-size: 0.24rem;
  border-bottom: 1px solid #dedede;
}
.f-ta{margin-top: -1px;}
.ta2 {
  width: 100%;
  height: 1rem;
  resize: none;
  border: none;
  box-sizing: border-box;
  padding: 0.1rem 0.1rem;
  font-size: 0.24rem;
  border-bottom: 1px solid #dedede;
}
.title {
  margin: 0.08rem 0.1rem;
  font-size: 0.24rem;
  font-weight: 700;
  color: #000;
}
.sexr {
 min-height: 0.6rem;
 line-height: 0.6rem;
 box-sizing: border-box;
 padding: 0 0.2rem;
}
.sex2{border-bottom: 1px solid #d9d9d9;}
.lb {
  display: inline-block;
  vertical-align: middle;
}
.sexa {
  background-image: url(../../common/images/checkok.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.sex1 {
  margin-left: 0.8rem;
}
.butt {
  margin: 0.2rem 5% 0;
  width:90%;
}
.picker_box{position: relative;}
.angle-right{position:absolute;right:0.05rem;top:0.25rem;}
.but {
  position: absolute;
  left: 30%;
  top:0;
  width:60%;
  padding: 0.7rem 0;
  background-color: #fff;
  letter-spacing: 1px;
  border-radius: 0.3rem;
  border: 1px solid #d4d4d4;
  text-align: center;
  font-size: 0.26rem;
}
/* picker样式 */
.slo {
  background-color: rgba(211, 211, 211, 0.95);
  z-index: 1;
}
.f-butts {
  margin: 0.2rem 30%;
  width:40%;
  text-align: center;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  height: 0.6rem;
  color: #5aa8e1;
  background-color: #e3f7fe;
}
.f-sexbox{display: flex;align-items: center;min-height: 48px;}
</style>
