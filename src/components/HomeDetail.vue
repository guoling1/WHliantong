<template>
  <div class="main">
    <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!isMask" :loop="!isMask" dots-position="center" :show-desc-mask="isMask"></swiper>
    <div class="productMessage">
      <p class="name">{{productData.name}}</p>
      <p class="price">现&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价 ：<span>￥{{productData.price}}</span></p>
      <p class="price">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存 ：<span>有货</span></p>
    </div>
    <div class="selectBox">
      <div class="item">
        <p class="left">颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色 ：</p>
        <ul class="right">
          <li v-for="item in productData.colorList" :class="color==item.name?'active':''" @click="selectColor(item.name)">{{item.name}}</li>
        </ul>
      </div>
      <div class="item">
        <p class="left">内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存 ：</p>
        <ul class="right">
          <li v-for="item in productData.memoryList" :class="memory==item.name?'active':''" @click="selectMemory(item.name)">{{item.name}}</li>
        </ul>
      </div>
      <div class="item">
        <p class="left">活动类型 ：</p>
        <ul class="right" style="margin-left: 90px">
          <li style="margin-bottom: 10px;margin-right: 50px" :class="aa==1?'active':''" @click="aaF(1)">存款止付合约购机</li>
          <li style="margin-bottom: 10px;margin-right: 50px" :class="aa==2?'active':''" @click="aaF(2)">信用卡分期合约购机</li>
        </ul>
      </div>
      <!--<div class="item itemPhone">-->
        <!--<p class="left">手机号码 ：</p>-->
        <!--<ul class="right">-->
          <!--<li @click="infoEntry(1)">选新号码</li>-->
          <!--<li @click="infoEntry(2)">老用户办理</li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>

    <toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import {Swiper, Popup, TransferDom, Actionsheet} from 'vux'

  const TIME_COUNT = 60;
  export default {
    name: 'HomeDetail',
    data() {
      return {
        showhs:false,
        menus:{
          menu1: '新用户',
          // menu2: '老用户'
        },
        hideBlur: false,
        /*formData:{
          phone:'',
          password:''
        },*/
        formData: {
          phone: '',
          validataCode: '',
          messageCode: ''
        },
        id: this.$route.query.id,
        productData: {
          packageList: [{name: ''}]
        },
        isMask: false,
        aspectRatio: 1,
        swiperList: [{img: require('../assets/phone.png')}],
        showAddress: false,
        showBank: false,
        showTips: false,
        showLogin: false,
        showFormat: false,
        addressList: [],
        address: {name: '请选择'},
        color: '',
        memory:'',
        aa:'',
        warnText: false,
        errMsg: '',
        showPrompt: false,
        promptMsg: '',
        count: '获取验证码',
        timer: null,
        stock: "",
        selectPhone: '请选择',
        phoneReg: /^1[3|4|5|7|8][0-9]{9}$/,
        imgMsg: {
          img: ''
        },
        messCode: '',
        isImgCode: false,
        rcdMobile: '',
        phone: '请选择',
        netMode:'',
        zhanyeStatus:''
      }
    },
    created() {
      window.scrollTo(0, 0)
      this.init();
    },
    methods: {
      init() {
        window.scrollTo(0, 0)
        // if (localStorage.getItem('color')) {
        //   this.color = localStorage.getItem('color')
        //   localStorage.removeItem('color')
        // }
        this.getData();
      },
      infoEntry(type){
        this.$router.push('/inforEntry?type='+type)
      },
      //获取产品信息
      getData() {
        this.$axios.get("/mobile/getProductInfo/"+this.$route.query.id)
          .then(res => {
            this.productData = res.data;
            //轮播图
            var arr = []
            for (let i = 0; i < res.data.swiperList.length; i++) {
              arr.push({img: res.data.swiperList[i].url})
            }
            this.swiperList = arr;
            this.stock = res.data.amount;
            this.color = res.data.colorList[0].name;
            this.memory = res.data.memoryList[0].name;
            /*if(this.productData.content){
              document.getElementById("content").innerHTML = this.productData.content
            }
            if(this.productData.configDetail){
              document.getElementById("content1").innerHTML = this.productData.configDetail
            }*/
          })
          .catch(err => {
            this.errMsg = err
            this.warnText = true
          })
      },
      selectColor(color) {
        this.color = color
        // this.color = color.color;
        // this.stock = color.amount
      },
      selectMemory(memory){
        this.memory = memory
      },
      aaF(a){
        if(a==1){
          this.$router.push('/homeDetail1?id=149');
        }else {
          this.$router.push('/homeDetail2?id='+this.$route.query.id)
        }
      },
      selectBank() {
        //选择银行前先选择区域
        if (this.address.name == "请选择") {
          this.$axios.post("/open/api/area/list", {areaId: this.address.id})
            .then(res => {
              this.showBank = true;
              this.bankList = res.data;
            })
            .catch(err => {
              this.errMsg = err
              this.warnText = true
            })
        } else {
          this.showPrompt = true;
          this.promptMsg = '请先选择区域'
        }

    },
    confirm() {
      let formData = {
        addressName: this.address.name,
        // addressId:this.address.id,
        addressId: 1655,
        color: this.color,
      }
      if(!formData.addressId || this.phone == "请选择" || formData.color == '请选择') {
        this.showPrompt = true;
        this.promptMsg = "请补全信息"
      }else{
        this.showTips = true;
      }
    },
    confirmTips() {
      if (localStorage.getItem("userMessage")) {
        let formData = {
          addressName: "郑州",
          // addressId:this.address.id,
          addressId: 1655,
          productName: this.productData.name,
          setMealPrice: this.productData.price,
          setMealName: this.productData.name,
          circle: this.productData.circle,
          price: this.productData.price,
          busiType: this.productData.busiType,
          color: this.color,
          memory: this.productData.memory,
          deposit: this.productData.deposit,
          phone: this.phone,
          id: this.$route.query.id,
          netMode: this.netMode,
          zhanyeStatus: this.zhanyeStatus
        }
        this.showTips = false;
        if(this.GLOBAL.isKDApp) {
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/shopInfor?addressName=郑州&addressId=1655&productName='+this.productData.name+'&setMealPrice='+this.productData.price+'&setMealName='+this.productData.name+'&circle='+this.productData.circle+'&price='+this.productData.price+'&busiType='+this.productData.busiType+'&color='+this.color+'&memory='+this.productData.memory+'&deposit='+this.productData.deposit+'&phone='+this.phone+'&id='+this.$route.query.id+'&netMode='+this.netMode+'&zhanyeStatus='+this.zhanyeStatus});
        }else{
          this.$router.push({path:"/shopInfor",query:formData})
        }
      }else {
        this.showTips = false;
        this.showLogin = true;
        this.imgClick()
      }
    },
    confirmFormat(){
      if(this.stock==0){
        this.showPrompt = true;
        this.promptMsg = "暂无库存，请选择其他颜色或内存"
      }else {
        this.showFormat = false;
      }
    },
    toBuy(){
      if(!this.phoneReg.test(this.formData.phone)){
        this.showPrompt = true;
        this.promptMsg = '请输入正确的手机号'
      }else if(this.formData.messageCode==''){
        this.showPrompt = true;
        this.promptMsg = '请输入验证码'
      }else {
        this.$axios.get("/open/validate/verify", {params: {code: this.formData.validataCode, key: this.imgMsg.key}})
          .then(res => {
            if (res.retCode != "0000") {
              this.showPrompt = true;
              this.promptMsg = res.retMsg;
              this.isImgCode = false;
            } else {
              this.isImgCode = true;
              if(!this.isImgCode){
                this.showPrompt = true;
                this.promptMsg = '图形验证码不正确'
              }else {
                let params = {
                  mobile:this.formData.phone,
                  code:this.formData.messageCode
                }
                if(sessionStorage.getItem('bk')==1){
                  this.url = '/open/oauth/rcdLogin'
                }else {
                  this.url = '/open/oauth/smsLogin'
                }
                this.$axios.post("/open/oauth/smsLogin",params)
                  .then(res=>{
                    if(res.retCode=='0000'){
                      localStorage.setItem('userMessage', JSON.stringify(res.data.customer));
                      localStorage.setItem('token', JSON.stringify(res.data.token));
                      localStorage.setItem('sessionid', JSON.stringify(res.data.sessionid));
                      this.$store.commit('LOGIN', res.data.token);
                      this.showLogin = false;
                      let formData = {
                        addressName:"郑州",
                        // addressId:this.address.id,
                        addressId:1655,
                        productName:this.productData.name,
                        setMealPrice:this.productData.price,
                        setMealName:this.productData.name,
                        circle:this.productData.circle,
                        price:this.productData.price,
                        busiType:this.productData.busiType,
                        color:this.color,
                        memory:this.productData.memory,
                        deposit:this.productData.deposit,
                        phone:this.phone,
                        id:this.$route.query.id,
                        netMode: this.netMode,
                        zhanyeStatus: this.zhanyeStatus
                      }
                      this.showTips = false;
                      if(this.GLOBAL.isKDApp){
                        window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/shopInfor?addressName=郑州&addressId=1655&productName='+this.productData.name+'&setMealPrice='+this.productData.price+'&setMealName='+this.productData.name+'&circle='+this.productData.circle+'&price='+this.productData.price+'&busiType='+this.productData.busiType+'&color='+this.color+'&memory='+this.productData.memory+'&deposit='+this.productData.deposit+'&phone='+this.phone+'&id='+this.$route.query.id+'&netMode='+this.netMode+'&zhanyeStatus='+this.zhanyeStatus});
                      }else{
                        this.$router.push({path:"/shopInfor",query:formData})
                      }
                      /*this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
                        .then(res=>{
                          localStorage.setItem("phone",this.formData.phone)
                          this.phone = this.formData.phone;
                          this.showLogin = false;
                          let formData = {
                            addressName:"郑州",
                            // addressId:this.address.id,
                            addressId:1655,
                            productName:this.productData.name,
                            setMealPrice:this.productData.packageList[0].price,
                            setMealName:this.productData.packageList[0].name,
                            circle:this.productData.packageList[0].circle,
                            price:this.productData.price,
                            busiType:this.productData.busiType,
                            color:this.color,
                            memory:this.productData.memory,
                            deposit:this.productData.deposit,
                            phone:this.phone
                          }
                          this.showTips = false
                          this.$router.push({path:"/shopInfor",query:formData})
                        })*/
                    }else {
                      this.showPrompt = true;
                      this.promptMsg = res.retMsg
                    }
                  })
                  .catch(err=>{
                    this.showPrompt = true;
                    this.promptMsg = '系统异常'
                  })
              }
            }
          })
      }
    },
    //获取验证码
    getCode(){
      this.$axios.post("/open/oauth/smscode",{mobile:this.formData.phone})
        .then(res=>{
          if(res.retCode=='0000'){
            this.messCode = res.data;
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
          }
        })
    },
    login(){
      if(!this.phoneReg.test(this.formData.phone)){
        this.showPrompt = true;
        this.promptMsg = '请输入正确的手机号'
      }else if(this.formData.messageCode==''){
        this.showPrompt = true;
        this.promptMsg = '请输入验证码'
      } else {
        this.$axios.get("/open/validate/verify", {params: {code: this.formData.validataCode, key: this.imgMsg.key}})
          .then(res => {
            if (res.retCode != "0000") {
              this.showPrompt = true;
              this.promptMsg = res.retMsg;
              this.isImgCode = false;
            } else {
              this.isImgCode = true;
              if(!this.isImgCode){
                this.showPrompt = true;
                this.promptMsg = '图形验证码不正确'
              }else {
                let params = {
                  mobile:this.formData.phone,
                  code:this.formData.messageCode
                }
                this.$axios.post("/open/api/customer/save",params)
                  .then(res=>{
                    if(res.retCode=='0000'){
                      // localStorage.setItem("token",res.data.token);
                      // localStorage.setItem("phone",this.formData.phone);
                      this.$router.go(-1)
                    }else {
                      this.showPrompt = true;
                      this.promptMsg = res.retMsg
                    }
                  })
                  .catch(err=>{
                    this.showPrompt = true;
                    this.promptMsg = '系统异常'
                  })
              }}
          })
      }

      },
      //点击图片重新获取验证码
      imgClick() {
        this.$axios.post("/open/validate/gcode")
          .then(res => {
            if (res.retCode == "0000") {
              this.imgMsg = res.data
            }
          })
      },
      //验证图形验证码
      validateCode() {
        this.$axios.get("/open/validate/verify", {params: {code: this.formData.validataCode, key: this.imgMsg.key}})
          .then(res => {
            if (res.retCode != "0000") {
              this.showPrompt = true;
              this.promptMsg = res.retMsg;
              this.isImgCode = false;
            } else {
              this.isImgCode = true;
            }
          })
      }
    },
    components: {
      Swiper,
      Popup,
      Actionsheet
    },
    watch: {
      '$route.query.reload': function (v) {
        console.log(v)
        if (v && !this._inactive) this.init()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .regist {
    /*margin: 50px 0;*/
    width: 100%;
    /*padding-bottom: 50px;*/
    .top {
      background: #444c59;
      color: #fff;
      .close {
        background-image: url("../assets/closeWrite.png") !important;
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
          width: 60%;
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
      background: #fe8d23;
      border-radius: 5px;
      color: #fff;
    }
  }

  .main {
    background: #f4f4f4;
    margin: 50px 0 0;
    width: 100%;
    padding-bottom: 50px;
    text-align: left;
    .productMessage {
      padding: 0 10px 10px;
      border-bottom: 1px solid #ff7653;
      .name {
        margin: 13px 0;
        font-weight: bold;
        font-size: 17px;
      }
      .price {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
        span {
          font-size: 18px;
          font-weight: normal;
          color: #ff7653;
        }
      }
      .oldPrice {
        margin: 11px 0;
        font-size: 13px;
        text-decoration: line-through;
      }
    }
    .selectBox{
      padding: 10px;
      .item{
        /*margin-top: 10px;*/
        .left{
          float: left;
          font-size: 17px;
          font-weight: bold;
        }
        .right{
          margin-left: 90px;
          li{
            display: inline-block;
            padding: 2px 5px;
            font-size: 13px;
            border: 1px solid #797979;
            color: #3a3a3c;
            border-radius: 3px;
            margin: 0 10px 10px 0;
          }
          li.active{
            color: #ff7653;
            border: 1px solid #ff7653;
          }
        }
      }
      .itemPhone{
        .right li{
          background: #ff7653;
          color: #fff;
          border-radius: 10px;
        }
      }
    }
    .attr {
      font-size: 15px;

    }
    .val {
      float: right;
      font-size: 15px;
      font-weight: bold;
      color: #fe8d23;
    }
    .address {
      margin: 0 15px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      border-bottom: 1px dashed #d7d7d7;
    }
    .select {
      font-size: 15px;
      margin: 5px 15px 0;
      text-align: left;
      div {
        position: relative;
        display: inline-block;
        width: 85%;
        vertical-align: top;
        img {
          position: absolute;
          right: -13px;
          /*top: 15px;*/
          width: 4px;
          height: 17px;
        }
      }
      .selectColor, .color {
        display: inline-block;
        width: 100%;
        background: #fe8d23;
        border-radius: 3px;
        padding: 0 8px;
        color: #fff;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .color {
        /*margin-left: 30px;*/
        /*background: #fe8d23;*/
        /*border-radius: 3px;*/
        /*padding: 0 8px;*/
        /*color: #fff;*/
        /*font-size: 14px;*/
        width: auto;
      }
    }
    .bank {
      margin: 0 15px;
      text-align: left;
      border-bottom: 1px dashed #d7d7d7;
      .top {
        height: 40px;
        line-height: 40px;
      }
      .bottom {
        margin: 23px 0 14px;
        display: flex;
        justify-content: space-around;
        font-size: 12px;
      }
    }
    .format {
      margin: 14px 0 37px;
      .val {
        font-size: 13px;
        color: #999999;
        float: none;
      }
    }

    .detail {
      .subject {
        i {
          display: inline-block;
          width: 40px;
          height: 3px;
          vertical-align: super;
        }
        i:nth-child(1) {
          background-image: url("../assets/left.png");
          background-size: 40px 3px;
        }
        i:nth-child(3) {
          background-image: url("../assets/right.png");
          background-size: 40px 3px;
        }
      }
    }

    .end {
      position: fixed;
      bottom: 0;
      width: 100%;
      font-size: 14px;
      height: 45px;
      line-height: 45px;
      input {
        width: 70%;
        height: 100%;
        text-align: center;
      }
      .button {
        display: inline-block;
        float: right;
        background: #fe8d23;
        color: #fff;
        width: 30%;
      }
    }

    .showBank {
      color: #444c59;

      .top {
        height: 41px;
        line-height: 41px;
        border-bottom: 1px solid #444c59;
        font-size: 18px;
        .close {
          position: absolute;
          top: 14px;
          right: 10px;
          display: inline-block;
          background-image: url("../assets/closeBlack.png");
          background-size: 13px 13px;
          width: 13px;
          height: 13px;
        }
      }
      .bankUl {
        padding: 32px 22px 37px;

        li {
          margin-bottom: 5px;
          height: 29px;
          line-height: 29px;
          font-size: 14px;
          color: #999;
          border: 1px solid #999;
          border-radius: 4px;
        }
        li.active {
          color: #fff;
          background: #444c59;
        }
      }

    }
    .showTips {
      .top {
        background: #444c59;
        color: #fff;
        .close {
          background-image: url("../assets/closeWrite.png");
        }
      }
      .content {
        padding: 15px;
        text-align: left;

        p {
          line-height: 30px;
          font-size: 14px;
        }

        ul {
          li {
            height: 55px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
            color: #666666;
            input {
              margin-top: 23px;
              height: 30px;
              width: 100%;
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
      }
      .buy {
        margin: 30px auto 13px;
        width: 203px;
        height: 43px;
        line-height: 43px;
        background: #fe8d23;
        border-radius: 5px;
        color: #fff;
      }
      .bottom {
        display: flex;
        justify-content: space-around;

        div {
          display: inline-block;
          width: 120px;
          height: 30px;
          line-height: 30px;
          color: #fff;
          background: #999999;
          border-radius: 4px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        div:nth-child(2) {
          background: #fe8d23;
        }
      }
    }
    .vux-popup-dialog {
      overflow: inherit;
      background: #fff;
    }
    .showFormat {
      .top {
        border-bottom: 1px solid #d7d7d7;
        text-align: left;
        img {
          display: inline-block;
          margin: -20px 15px 0 10px;
          width: 119px;
          height: 119px;
          border: 1px solid #999999;
          border-radius: 4px;
        }
        .right {
          display: inline-block;
          font-size: 12px;
          p:nth-child(2) {
            margin: 18px 0 14px;
          }
          .price {
            font-size: 19px;
            color: #fe8d23;
          }
        }
      }
      ul {
        padding: 0 10px;
        text-align: left;
        li {
          .subject {
            margin: 14px 0 0;
            font-size: 14px;
          }
          span {
            display: inline-block;
            margin-top: 14px;
            text-align: center;
            width: 82px;
            height: 25px;
            line-height: 25px;
            background: #f6f6f6;
            font-size: 12px;
            margin-right: 15px;
            border-radius: 4px;
          }
          span.active {
            background: #fe8d23;
            color: #fff;
          }
        }
        .taocan span {
          width: auto;
          padding: 0 10px;
        }
      }
      .button {
        width: 100%;
        margin-top: 46px;
        height: 44px;
        line-height: 44px;
        background: #fe8d23;
        color: #fff;
      }
    }
    .addressList {
      height: 30px;
      line-height: 30px;
      font-size: 14px
    }

  }
</style>
