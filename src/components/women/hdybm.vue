<template>
<div class="hdybm">
  <!-- 活动预报名 -->
  <header class="nav-list" >
    <yd-step :current="current" current-color="#3891F7">
        <yd-step-item>
            <span slot="bottom">基本信息</span>
        </yd-step-item>
        <yd-step-item>
            <span slot="bottom">工作信息</span>
        </yd-step-item>
        <yd-step-item>
            <span slot="bottom">家庭信息</span>
        </yd-step-item>
        <yd-step-item>
            <span slot="bottom">其他</span>
        </yd-step-item>
    </yd-step>
  </header>
  <!-- 个人基本信息 -->
  <transition name="fade">
    <div v-show="selected == 1" class="f-box ">
      <mt-field label="报名活动" placeholder="请选择活动名称" class="f-hd" readonly v-model="title"></mt-field>
      <div class="info">     
        <p class="title">参与者信息</p>
        <div class="bx-box">
          <mt-field label="姓名*" placeholder="请输入姓名" class="f-xm" v-model="ep_info.real_name"></mt-field>
        </div>
        <div class="sexr borbo f-sexbox sex2 f-mm">
          <span class="mint-cell-text f-sextitle">性别*</span>
          <yd-radio-group class="sexType" size="20" v-model="sex" color="#3891F7">
              <yd-radio val="1"><span style="font-size: 0.24rem;">男</span></yd-radio>
              <yd-radio val="2"><span style="font-size: 0.24rem;">女</span></yd-radio>
          </yd-radio-group>
        </div> 
        <div class="borbo photo_box sex2">
          <span class="mint-cell-text">照片</span>
          <div class="photo">
            <img :src="img"  @click="setAvatar" ref="img">
          </div>
          <input type="file" class="but but1 but4" accept="image/JPG,jpg,gif,jpeg,png,PNG,bmp" @change="changeImage($event)" ref="avatarInput">
          <span class="photo_text">请点击上传图片</span>
        </div>
        <div class="sg_box">
          <mt-field label="身高"  class="borbo" v-model="height"></mt-field>
          <span class="cm">cm</span>
        </div>
        <div class="tz_box">
          <mt-field label="体重"  class="borbo" v-model="weight"></mt-field>
          <span class="kg">kg</span>
        </div>
        <div class="picker_box">
          <mt-field label="性格" placeholder="请输入性格" class="borbo" v-model="ep_info.women_character"></mt-field>
        </div>
        <div class="picker_box bx-box" @click="open">
          <mt-field label="出生日期*" placeholder="请选择出生日期" class="borbo" v-model="birthday" disableClear readonly></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <div class="picker_box" @click="show_location = true">
          <mt-field label="通讯地址*" placeholder="请选择所在地区" class="borbo" disableClear v-model="location" readonly></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <mt-field label="详细地址" placeholder="请输入详细地址" class="borbo" v-model="detail_address"></mt-field>
        <div class="bx-box">
          <mt-field label="联系手机*" placeholder="请输入手机号码" class="borbo" v-model="ep_info.women_phone"></mt-field>     
        </div>
        <div class="picker_box" @click="show_edu = true">
          <mt-field label="学历" placeholder="请选择学历程度" class="borbo" v-model="education" disableClear readonly></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <mt-field label="毕业院校" placeholder="请输入毕业院校" class="borbo" v-model="graduate"></mt-field>
        <mt-field label="住房情况" placeholder="请输入住房情况" class="borbo" v-model="ep_info.women_house"></mt-field>
        <mt-field label="收入情況" placeholder="请输入收入情况" class="borbo" v-model="ep_info.women_income"></mt-field>      
        <div class="picker_box" @click="show_census = true">
          <mt-field label="户籍情况" placeholder="请选择户籍情况" class="borbo" disableClear readonly v-model="census"></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <mt-field label="联系邮箱" placeholder="请输入联系邮箱" class="borbo" v-model="ep_info.women_email"></mt-field>
        <mt-field label="QQ" placeholder="请输入QQ号码" class="borbo" v-model="ep_info.women_qq"></mt-field>
        <div class="sexr borbo sex2">
          <span class="mint-cell-text">自我评价</span>
        </div>
        <textarea class="ta f-ta" placeholder="请填写评价内容" v-model="ep_info.women_self_evaluate"></textarea>
      </div>
      <div class="btn">
        <mt-button size="large" class="butts" @click="nextStep()">保存，填写下一步</mt-button>
      </div>
      <!-- 性格 -->
      <!-- <yd-popup v-model="show_char" position="center" width="90%" height="30%">
          <yd-checkbox-group v-model="ep_info.women_character" color="#3891F7">
            <div>
              <yd-checkbox val="外向"></yd-checkbox>
              <yd-checkbox val="内向"></yd-checkbox>
              <yd-checkbox val="温柔"></yd-checkbox>
            </div>
            <div>
              <yd-checkbox val="活泼"></yd-checkbox>
              <yd-checkbox val="直爽"></yd-checkbox>
              <yd-checkbox val="腼腆"></yd-checkbox>
            </div>
            <div>
              <yd-checkbox val="害羞"></yd-checkbox>
              <yd-checkbox val="单纯"></yd-checkbox>
              <yd-checkbox val="乐观"></yd-checkbox>
            </div>
            <div>
              <yd-checkbox val="积极"></yd-checkbox>
              <yd-checkbox val="幽默"></yd-checkbox>
              <yd-checkbox val="成熟"></yd-checkbox>
            </div>
          </yd-checkbox-group>
          <mt-button type="default" class="f-btn" @click="show_char = false">确定</mt-button>
      </yd-popup> -->
      <!-- 出生日期 -->
      <yd-datetime start-date="1950-01-01" ref="datetime" v-model="birthday" slot="right" type="date"></yd-datetime>
      <!-- 通讯地址 -->
      <yd-cityselect v-model="show_location" ref="cityselectDemo" :callback="result2" :items="district"></yd-cityselect>
      <!-- 学历 -->
      <yd-popup v-model="show_edu" position="center" width="90%" height="30%">
        <yd-radio-group v-model="education" color="#3891F7" class="xueli">
          <div>
            <yd-radio val="博士"></yd-radio>
            <yd-radio val="硕士"></yd-radio>
            <yd-radio val="本科"></yd-radio>
          </div>
          <div>
            <yd-radio val="大专"></yd-radio>
            <yd-radio val="中专"></yd-radio>
            <yd-radio val="高中"></yd-radio>
          </div>
          <div>
            <yd-radio val="初中"></yd-radio>
            <yd-radio val="小学"></yd-radio>
            <yd-radio val="其他"></yd-radio>
          </div>
        </yd-radio-group>
        <mt-button type="default" class="f-btn" @click="show_edu = false">确定</mt-button>
      </yd-popup>
      <!-- 户籍情况 -->
      <yd-popup v-model="show_census" position="center" width="90%" height="30%" class="f-hj">
        <yd-radio-group v-model="census" color="#3891F7" class="xueli">
          <div>
            <yd-radio val="农村居民家庭户"></yd-radio>
          </div>
          <div>
            <yd-radio val="农村居民集体户"></yd-radio>
          </div>
          <div>
            <yd-radio val="城镇居民家庭户"></yd-radio>
          </div>
          <div>
            <yd-radio val="城镇居民集体户"></yd-radio>
          </div>
        </yd-radio-group>
        <mt-button type="default" class="f-btn" @click="show_census = false">确定</mt-button>
      </yd-popup>
    </div>
  </transition>
  <!-- 工作信息 -->
  <transition name="fade">
    <div v-show="selected == 2" >
      <div class="info"> 
        <div class="picker_box">
          <mt-field label="职业" placeholder="请输入从事职业" class="borbo" v-model="occupation"></mt-field>
          <!-- <span class="angle-right"><span class="iconfont icon-right"></span></span> -->
        </div>
        <div class="picker_box" @click="show_address = true">
          <mt-field label="工作地点" placeholder="请选择所在地区" class="borbo" v-model="ep_info.work_address" disableClear></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <mt-field label="详细地址" placeholder="请输入详细地址" class="borbo" v-model="ep_info.work_detail_address"></mt-field>
      </div>
      <div class="btn">
        <mt-button size="large" class="btn2" @click="previousStep">返回上一页</mt-button>
        <mt-button size="large" class="btn2 btn_next" @click="nextStep()">继续填写</mt-button>
      </div>
      <!-- 职业-->
      <transition name="fade">
      <div class="over slo" v-show="false">
        <mt-picker :slots="slots" @change="" class="f-picker"></mt-picker>
        <mt-button size="large" class="f-butts" @click='over = false'>确定</mt-button>
      </div>
      </transition>
      <!-- 工作地点 -->
      <yd-cityselect v-model="show_address" ref="cityselectDemo" :callback="result3" :items="district"></yd-cityselect>
    </div>
  </transition>
  <!--  家庭信息-->
  <transition name="fade">
    <div v-show="selected == 3" class="f-mm">
      <div class="info">
        <mt-field label="家庭成员" placeholder="请输入家庭成员" class="borbo" v-model="ep_info.women_family"></mt-field>
        <div class="picker_box">
          <div class="sexr borbo f-sexbox f-hy sex2">
            <span class="mint-cell-text f-sextitle" style="width:25%">婚姻状况*</span>
            <yd-radio-group style="margin-left:0.8rem" size="20" v-model="ep_info.women_marita_status" color="#3891F7">
                <yd-radio val="未婚"><span style="font-size: 0.24rem;">未婚</span></yd-radio>
                <yd-radio val="离异"><span style="font-size: 0.24rem;">离异</span></yd-radio>
            </yd-radio-group>
          </div>
        </div>
      </div>
      <div class="btn">
        <mt-button size="large" class="btn2" @click="previousStep">返回上一页</mt-button>
        <mt-button size="large" class="btn2 btn_next" @click="nextStep()">继续填写</mt-button>
      </div>
    </div>
  </transition>
  <!-- 其他信息 -->
  <transition name="fade">
    <div v-show="selected == 4">
      <div class=" info">
        <p class="title">关于活动：</p>
        <div class=" borbo f-sexbox2 sex2" style="padding-left:10px;">
          <span class="mint-cell-text">举办时间*</span>
          <yd-radio-group class="timeType" size="20" v-model="hope_time" color="#3891F7">
              <yd-radio val="周五晚"><span style="font-size: 0.24rem;">周五晚</span></yd-radio>
              <yd-radio val="周六"><span style="font-size: 0.24rem;">周六</span></yd-radio>
              <yd-radio val="周日"><span style="font-size: 0.24rem;">周日</span></yd-radio>
          </yd-radio-group>
        </div>
      </div>
      <div class="info">
        <div class="sexr borbo">
          <span class="mint-cell-text">爱情寄语</span>
        </div>
        <textarea class="ta" placeholder="请填写爱情寄语" v-model="love_message"></textarea>
        <div class="sexr borbo">
          <span class="mint-cell-text">备注</span>
        </div>
        <textarea class="ta2" placeholder="填写备注" v-model="remark"></textarea>
        <p class="title">希望他/她：</p>
        <div class="sg_box">
          <mt-field label="身高" placeholder="" class="f-sg" v-model="hope_height"></mt-field>
          <span class="cm">cm</span>
        </div>
        <div class="tz_box">
          <mt-field label="体重" placeholder="" class="borbo" v-model="hope_weight"></mt-field>
          <span class="kg">kg</span>
        </div>
        <div class="picker_box">
          <mt-field label="年龄*" placeholder="请输入希望年龄" class="borbo" v-model="hope_age"></mt-field>
          <!-- <span class="angle-right"><span class="iconfont icon-right"></span></span> -->
        </div>
        <div class="picker_box" @click="show_hope_location=true">
          <mt-field label="地区" placeholder="请选择希望地区" class="borbo" v-model="hope_location" disableClear readonly></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <div class="picker_box">
          <mt-field label="职业" placeholder="请输入希望职业" class="borbo" v-model="hope_occupation"></mt-field>
        </div>
        <mt-field label="工作地点" placeholder="请输入希望工作地点" class="borbo" v-model="hope_work_address" ></mt-field>
        <mt-field label="收入情况" placeholder="请填写希望年收入" class="borbo" v-model="hope_women_income"></mt-field>
        <div class="picker_box" @click="show_want_edu = true">
          <mt-field label="学历" placeholder="请选择希望学历程度" class="borbo" v-model="hope_education" disableClear readonly></mt-field>
          <span class="angle-right"><span class="iconfont icon-right"></span></span>
        </div>
        <mt-field label="毕业院校" placeholder="请输入希望毕业院校" class="borbo" v-model="hope_graduate"></mt-field>
        <mt-field label="住房情况" placeholder="请输入希望住房情况" class="borbo" v-model="hope_women_house"></mt-field>
        <div class="picker_box">
          <mt-field label="性格" placeholder="请选择希望性格" class="f-hy2" v-model="hope_women_character"></mt-field>
        </div>
        <div class="picker_box">
          <div class="hope_hy f-hy2 sex2">
            <span class="mint-cell-text f-sextitle">婚姻状况</span>
            <yd-checkbox-group v-model="hope_women_marita_status" class="f-check-group" color="#3891F7">
              <yd-checkbox val="未婚"></yd-checkbox>
              <yd-checkbox val="离异"></yd-checkbox>
            </yd-checkbox-group>
          </div>
        </div>
        <div class="read">
          <yd-checkbox val="" v-model="agree" color="#3891F7" size="18"></yd-checkbox>
          <span class="agreement" @click="show_agreement = true">我已阅读并同意《关于至善福保交友活动说明》</span>
        </div>
      </div>
      <div class="btn">
        <mt-button size="large" class="btn3" @click="previousStep">返回上一页</mt-button>
        <mt-button size="large" class="btn3 btn_next" @click="checkSubmit">确认提交</mt-button>
      </div>
      <!-- 希望年龄 -->
      <transition name="fade">
        <div class="over slo" v-show="false">
          <mt-picker :slots="slots" @change="" class="f-picker"></mt-picker>
          <mt-button size="large" class="f-butts" @click='over = false'>确定</mt-button>
        </div>
      </transition>
      <!-- 职业 -->
      <transition name="fade">
        <div class="over slo" v-show="false">
          <mt-picker :slots="slots" @change="" class="f-picker"></mt-picker>
          <mt-button size="large" class="f-butts" @click='over = false'>确定</mt-button>
        </div>
      </transition>
      <!-- 学历 -->
      <yd-popup v-model="show_want_edu" position="center" width="90%" height="30%">
        <yd-radio-group v-model="hope_education" color="#3891F7" class="xueli">
          <div>
            <yd-radio val="博士"></yd-radio>
            <yd-radio val="硕士"></yd-radio>
            <yd-radio val="本科"></yd-radio>
          </div>
          <div>
            <yd-radio val="大专"></yd-radio>
            <yd-radio val="中专"></yd-radio>
            <yd-radio val="高中"></yd-radio>
          </div>
          <div>
            <yd-radio val="初中"></yd-radio>
            <yd-radio val="小学"></yd-radio>
            <yd-radio val="其他"></yd-radio>
          </div>
        </yd-radio-group>
        <mt-button type="default" class="f-btn" @click="show_want_edu = false">确定</mt-button>
      </yd-popup>
      <!-- 地区 -->
      <yd-cityselect v-model="show_hope_location" ref="cityselectDemo" :callback="result4" :items="district"></yd-cityselect>
      <!-- 协议 -->
      <transition name="fade">
        <div class="mark" v-show="show_agreement" @click="show_agreement = false">
          <div class="pop">
            <div v-html="agreement"></div>
            <div class="f-fbtn">
              <mt-button type="default" class="f-btn" @click="show_agreement = false">关闭</mt-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <div class="gide" v-show="show_spin" >
    <mt-spinner type="fading-circle" color="#3891F7" class='f-spin'></mt-spinner>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { upload_picture, activity_women, ucuser_update, women_enter_save, weixin_login, ucuser_read } from 'api/common'
import { Button, Swipe, SwipeItem, Field, DatetimePicker, Toast, MessageBox,Spinner } from "mint-ui";
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.rem/checkbox';
import {Step, StepItem} from 'vue-ydui/dist/lib.rem/step';
import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
import District from 'ydui-district/dist/gov_province_city_area_id';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
export default {
  name: "order",
  data() {
    return {
      title:'',//活动名称
      agreement:'',//协议
      img_id:'',//图片类型id
      show_location:false,//通讯地址
      show_char:false,//性格选择
      show_address:false,
      show_agreement:false,
      show_census:false,
      show_edu:false,//学历选择
      show_want_edu:false,
      show_want_char:false,
      show_hope_location:false,
      show_spin:true,//页面加载
      model2: '新疆 乌鲁木齐市 天山区',
      district: District,
      selected: 1,
      check: '2',
      radio1: 1,
      hope_time: '周五晚',
      love_message:'',
      remark:'',
      current: 1,
      activity:false,
      ac_name:'',
      agree:false,
      hope_height:'',
      hope_weight:'',
      hope_age:'',
      hope_location:'',
      hope_occupation:'',
      hope_work_address:'',
      hope_detail_address:'',
      hope_women_income:'',
      hope_education:'',
      hope_graduate:'',
      hope_women_house:'',
      hope_work_detail_address:'',
      hope_women_character:'',
      hope_women_marita_status:[],
      sex:1,
      height:'',
      weight:'',
      occupation:'',
      birthday:'',
      location:'',
      detail_address:'',//类型：String  可有字段  备注：详细地址
      education:'本科',
      graduate:'',
      census:'',//户籍情况 
      ep_info:{
        real_name:'',
        women_image:'',
        women_phone:'',
        women_house:'',
        women_email:'',
        women_qq:'',
        women_self_evaluate:'',
        work_address:'',//工作地点
        work_detail_address:"",//类型：String  可有字段  备注：工作详细地址
        women_family:"",  //类型：String  可有字段  备注：单身交友-家庭成员
        women_marita_status:"未婚",//类型：String  可有字段  备注：单身交友-婚姻状况
        women_income:"", //类型：String  可有字段  备注：单身交友-收入情况
        women_character:'' //类型：String  可有字段  备注：单身交友-性格
      },    
      slots: [
        {
          flex: 1,
          values: ['博士', '硕士', '本科','大专','高中','中专','初中','小学','其他'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      items:['个人基本信息','工作信息','家庭信息','其他信息'],
      img:' '
    };
  },
  components: {
    "mt-button": Button,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    "yd-step": Step,
    "yd-step-item": StepItem,
    "yd-radio-group": RadioGroup,
    "yd-radio": Radio,
    "yd-checkbox": CheckBox,
    "yd-checkbox-group": CheckBoxGroup,
    "yd-datetime": DateTime,
    "yd-cityselect": CitySelect,
    "yd-popup": Popup,
    "mt-spinner": Spinner
  },
  methods: {
    result2(ret) {
      this.location = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    result3(ret) {
      this.ep_info.work_address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    result4(ret) {
      this.hope_location = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    // 点击图片会触发setAvatar函数，该函数会触发input的click事件
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    changeImage(e) {
      const refs = this.$refs;
      const elImg = refs.img;
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        elImg.src = this.result;       
      }
      if(that.$refs.avatarInput.files.length !== 0){
        var img = new FormData();
        img.append('file',that.$refs.avatarInput.files[0]);
        //修改头像
        upload_picture(img).then((res) => {
          that.ep_info.women_image = res.data.id;
          localStorage.setItem('image_id',that.ep_info.women_image);
          if(res.code == 200){
            Toast({
              message: res.message,
              iconClass: 'fa fa-check',
              duration: 1000
            })
          }else if(res.code == 401){
            weixin_login('#/women/hdybm');
          }else{}
        })
      }
    },
    //点击下一步
    nextStep(){
      var that = this;
      if(this.ep_info.real_name == ''){
        Toast({
          message: '姓名不能为空',
          duration: 1000
        })
        return;
      }
      if(this.location == ''){
        Toast({
          message: '请选择通讯地址',
          duration: 1000
        })
        return;
      }
      if(this.ep_info.women_phone == ''){
        Toast({
          message: '手机号不能为空',
          duration: 1000
        })
        return;
      }
      if(this.ep_info.women_image == ''){
        Toast({
          message: '请您上传头像',
          duration: 1000
        })
        return;
      }
      this.selected++;
      this.current++;
      document.body.scrollTop = 0;
      var ep_info = {
        'real_name':this.ep_info.real_name,
        'women_phone':this.ep_info.women_phone,
        'women_house':this.ep_info.women_house,
        'women_email':this.ep_info.women_email,
        'women_qq':this.ep_info.women_qq,
        'women_self_evaluate':this.ep_info.women_self_evaluate,
        'work_address':this.ep_info.work_address,//工作地点
        'work_detail_address':this.ep_info.work_detail_address,//类型：String  可有字段  备注：工作详细地址
        'women_family':this.ep_info.women_family,  //类型：String  可有字段  备注：单身交友-家庭成员
        'women_marita_status':this.ep_info.women_marita_status,//类型：String  可有字段  备注：单身交友-婚姻状况
        'women_income':this.ep_info.women_income, //类型：String  可有字段  备注：单身交友-收入情况
        'women_character':this.ep_info.women_character //类型：String  可有字段  备注：单身交友-性格
      }
      //如果沒有修改头像的话
      var image_id = Number(localStorage.getItem('image_id'));
      if(Number(this.ep_info.women_image) > 0){
        Vue.set(ep_info,'women_image',image_id)
      }
      //修改用户资料
      ucuser_update({
        'sex':this.sex,
        'height':this.height,
        'weight':this.weight,
        'occupation':this.occupation,
        'birthday':this.birthday,
        'location':this.location,
        'detail_address':this.detail_address,//类型：String  可有字段  备注：详细地址
        'education':this.education,
        'graduate':this.graduate,
        'census':this.census,//户籍情况 
        'expand_info' : ep_info
      }).then((res) => {
        if(res.code != 200){
          Toast({
            message: res.message,
            duration: 1000
          })
        }else if(res.code == 401){
          weixin_login('#/women/hdybm');
        }else{};
      });
    },
    //确认提交
    checkSubmit(){
      if(this.hope_age == ''){
        Toast({
          message: '请输入希望年龄',
          duration: 1000
        })
        return;
      }
      // var hope_character = this.hope_women_character.toString();
      var hope_marita = this.hope_women_marita_status.toString();
      var hopeInfo = {
        height: this.hope_height,
        weight: this.hope_weight,
        age: this.hope_age,
        location:this.hope_location,
        occupation: this.hope_occupation,
        work_address: this.hope_work_address,
        women_income: this.hope_women_income,
        education: this.hope_education,
        graduate: this.hope_graduate,
        women_house: this.hope_women_house,
        women_character: this.hope_women_character,
        women_marita_status: hope_marita,
      }    
      if(this.agree){
        MessageBox({
          title: '确认提交？',
          message: '提交信息后不可更改，是否确认？',
          confirmButtonText: '是',
          cancelButtonText: '再看看',
          showCancelButton: true
        }).then(action => {
          women_enter_save({
            'remark':this.remark,
            'love_message':this.love_message,
            'hope_time': this.hope_time,
            'hope_info':hopeInfo
          }).then((res) => {
            if(res.code == 200){
              this.$router.push({path: '/women/line'})
            }else if(res.code == 400){
              Toast({
                message: res.message,
                duration: 1000
              })
            }else if(res.code == 401){
              weixin_login('#/women/hdybm');
            }else{};
          })
        });   
      }else{
        Toast({
          message: '请阅读并同意至善福保交友活动说明',
          duration: 2000
        })
        return;
      }
    },
    //返回上一页
    previousStep(){
      this.selected--;
      this.current--;
      document.body.scrollTop = 0;
    },
    open(){
      this.$refs.datetime.open();
    }
  },
  mounted: function() {
    activity_women().then((res) => {
      this.title = res.data.title;
      this.agreement = res.data.explain
    })
    ucuser_read().then((res) => {
      if(res.code == 200){
        this.show_spin = false;
        var user = res.data;
        this.ep_info = user.expand_info;
        this.sex = user.sex;
        this.height = user.height;
        this.weight = user.weight;
        this.birthday = user.birthday;
        this.location = user.location;
        this.detail_address = user.detail_address;
        this.education = user.education;
        this.graduate = user.graduate;
        this.census = user.census;
        this.occupation = user.occupation;
      }else if(res.code == 401){
        weixin_login('#/women/hdybm');
      }else{};
    })
  }
};
</script>

<style scoped>
.mark,.gide{position: fixed;left:0;right:0;top:0;bottom:0;width:100%;height:100%;background-color: rgba(0, 0, 0, 0.5);z-index: 10;}
.pop{position: absolute;top:0;left:0;bottom:0;right:0;margin:auto;width: 90%;height:80%;background: #fff;border-radius: 8px;overflow: auto;padding:15px 10px;}
.hope_hy{display: flex;align-items: center;padding:15px 10px;}
.f-spin{position: absolute;top:0;left:45%;bottom:0;right:0;margin:auto;width:100%;height:100px;}
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
.nav-list {
  display: table;
  margin: 0;
  width: 100%;
  margin: 20px 0;
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
.btn{padding:20px;}
.btn2{width: 40%;display: inline-block;margin-top: 4rem;}
.btn3{width: 40%;display: inline-block;}
.btn_next{margin-left: 1rem;}
.read{
  margin-top: 20px;
  padding-left: 0.1rem;
  position: relative;
}
.agreement{position: absolute;top: 0.02rem;left:0.5rem}
.agreement:hover{
  border-bottom:0.5px solid #ccc;
}
.f-check{
  width:0.35rem;
  height: 0.35rem;
  margin-left: 10px;
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
  -o-appearance: checkbox;
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

.bg {
  padding-bottom: 0.3rem;
}
.bar {
  border-bottom: 0.1rem solid #e9e9e9;
}
.item {
  margin: 0;
  box-sizing: border-box;
  padding: 0 0.1rem;
  border-bottom: 1px solid #e9e9e9;
}
.f-fbtn{text-align: center;}
.right {
  float: right;
}
.info {
  color: #757575;
}
.i-title {
  display: inline-block;
  width: 1rem;
  color: #9d9d9d;
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
.sex {
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  border: none;
  width: 0.2rem;
  height: 0.2rem;
}
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
.sg_box,.tz_box,.picker_box{position: relative;}
.cm,.kg{position:absolute;left:60%;top:0.2rem;z-index: 1;font-weight: 700;}
.angle-right{position:absolute;right:0.05rem;top:0.25rem;}
.photo_box{height:2rem;
  display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box;     /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  position:relative;
  padding-left: 0.2rem;
}
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
.photo{
  width:1.5rem;height:1.5rem;
  /* border: 1px solid #ddd; */
  display: inline-block;margin-left: 1.2rem;background-color:#fff; 
}

.photo img{width:1.5rem;height:1.5rem;}
.photo_text{margin-left: 0.2rem;}
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
.f-sexbox2{display: flex;align-items: center;padding:0.15rem 0;}
</style>
