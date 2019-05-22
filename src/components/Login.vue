<template>
  <div class="main">
    <div class="tab">
      <div @click="selectType(1)" :class="type==1?'active':''">密码登录</div>
      <div @click="selectType(2)" :class="type==2?'active':''">快速登录</div>
    </div>
    <ul v-if="type==1">
      <li>
        <input v-model="formData1.account" type="text" placeholder="登录名/手机号">
      </li>
      <li>
        <input v-model="formData1.password" type="password" placeholder="密码(默认为手机号后六位)">
      </li>
      <li>
        <input v-model="formData1.validataCode" type="text" placeholder="输入验证码">
        <img :src="imgMsg" @click="imgClick()" alt="">
      </li>
    </ul>
    <ul v-if="type==2">
      <li>
        <input v-model="formData.phone" type="number" placeholder="手机号">
      </li>
      <li>
        <input v-model="formData.validataCode" type="text" placeholder="输入验证码">
        <img :src="imgMsg" @click="imgClick()" alt="">
      </li>
      <li>
        <input v-model="formData.messageCode" type="text" placeholder="输入短信验证码">
        <span @click="getCode()">{{count}}</span>
      </li>
    </ul>
    <div class="buy" @click="login()">登录</div>
    <router-link to="/regist" class="regist">立即注册</router-link>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
  export default {
    name: "Login",
    data() {
      return {
        type:1,
        formData: {
          phone: '',
          validataCode: '',
          messageCode: '',
          t: ''
        },
        formData1:{
          account:'',
          password:'',
          validataCode:''
        },
        count: '获取验证码',
        timer: null,
        imgMsg: '',
        phoneReg: /^1[3|4|5|6|7|8][0-9]{9}$/,
        showPrompt: false,
        promptMsg: '',
        t: ''
      }
    },
    created() {
      if(this.$route.query.phone){
        this.formData.phone = this.$route.query.phone
      }
      this.imgClick()
    },
    methods: {
      //获取验证码
      getCode() {
        let params = {
          captcha: this.formData.validataCode,
          mobile: this.formData.phone,
          t: this.formData.t
        }
        if (params.mobile == '' || params.captcha == '') {
          this.showPrompt = true;
          this.promptMsg = "请填写手机号和图像验证码"
        } else {
          this.$axios.post("/smscode", params)
            .then(res => {
              if (res.code == '200') {
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                    } else {
                      this.count = "获取验证码";
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000)
                }
              } else {
                this.showPrompt = true;
                this.promptMsg = res.msg
              }
            })
        }

      },
      login() {
        let params = {}
        if(this.type==1){  //密码登录
          params={
            account: this.formData1.account,
            password: this.formData1.password,
            t: this.formData.t,
            type: 1,
            captcha: this.formData1.validataCode,//验证码
          }
        }else {
          params = {
            account: this.formData.phone,
            // password: '',
            captcha: this.formData.validataCode,//验证码
            smscode: this.formData.messageCode,//短信验证码
            t: this.formData.t, //时间戳+8位随机数
            type: 2  //2为短信登陆，1为密码登陆
          }
        }
        this.$axios.post("/login", params)
          .then(res => {
            if (res.code == '200') {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("phone", this.formData.phone);
              localStorage.setItem("userMessage", JSON.stringify(res.data));
              this.showPrompt = true;
              this.promptMsg = res.msg;
              let that = this;
              setTimeout(function () {
                that.$router.push("/my")
              })
            } else {
              this.showPrompt = true;
              this.promptMsg = res.msg
            }
          })
      },
      imgClick() {
        this.formData.t = new Date().getTime() + '' + Math.floor(Math.random() * 99999999)
        this.imgMsg = "http://manage.shangjkj.com/api/captcha.jpg?t=" + this.formData.t;
      },
      selectType(type){
        this.type=type
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .main {
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;
    .tab {
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
      width: 80%;
      padding-top: 2.9rem;
      font-size: 16px;
      font-weight: bold;
      color: #808080;
      .active{
        border-bottom: 0.04rem solid #000;
        color: #000;
      }
    }
    ul {
      padding: 0 15px;
      text-align: left;

      li {
        height: 55px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        color: #666666;

        input {
          margin-top: 23px;
          height: 30px;
          width: 70%;
        }

        img {
          float: right;
          margin-top: 28px;
          display: inline-block;
          height: 20px;
          width: 70px;
          border-radius: 4px;
        }

        span {
          float: right;
          margin-top: 28px;
          display: inline-block;
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #fff;
          background: #4e4e4e;
          border-radius: 4px;
        }
      }
    }

    .buy {
      margin: 13px 15px;
      height: 43px;
      line-height: 43px;
      background: #ff7350;
      border-radius: 5px;
      color: #fff;
    }
    .regist{
      float: right;
      margin-right: 20px;
      color: #ff7350;
    }
  }
</style>
