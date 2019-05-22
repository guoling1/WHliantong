<template>
  <div class="main">
    <ul>
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
    <div class="buy" @click="login()">注册</div>
    <router-link to="/login" class="regist">立即登录</router-link>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
  export default {
    name: "Login",
    data() {
      return {
        formData: {
          phone: '',
          validataCode: '',
          messageCode: '',
          t: ''
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
        if (!this.phoneReg.test(this.formData.phone)) {
          this.showPrompt = true;
          this.promptMsg = '请输入正确的手机号'
        } else {
          let params = {
            mobile: this.formData.phone,
            smscode: this.formData.messageCode,//短信验证码
            // t:this.formData.t
          }
          let that = this;
          this.$axios.post("/register", params)
            .then(res => {
              if (res.code == '200') {
                this.showPrompt = true;
                this.promptMsg = res.msg;
                setTimeout(function () {
                  that.$router.push("/login?phone="+this.formData.phone)
                },1000)
              } else {
                this.showPrompt = true;
                this.promptMsg = res.msg
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
      imgClick() {
        this.formData.t = new Date().getTime() + '' + Math.floor(Math.random() * 99999999)
        this.imgMsg = "http://manage.shangjkj.com/api/captcha.jpg?t=" + this.formData.t;
      },
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .main {
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;

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
