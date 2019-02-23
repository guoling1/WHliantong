<template>
  <div class="main">
    <div class="top">
      <p class="p1">恭 喜 您 ！</p>
      <p class="p2">交 易 已 成 功</p>
      <p class="p3"><img src="../assets/email.png" alt="">电子协议已发送到您的邮箱</p>
      <p class="p3">2019-01-31</p>
      <p class="p4">关注公众号可查询订单详细信息</p>
    </div>
    <div class="name">扫描二维码关注</div>
    <img src="../assets/qrcode1.png" alt="" class="qrCode">
    <div class="button">点击关注</div>
  </div>
</template>

<script>
  export default {
    name: 'Agreement',
    data() {
      return {
        showSubmit: false,
        orderMsg: {},
        productData: JSON.parse(localStorage.getItem("productMessage"))
      }
    },
    created() {
      if (this.GLOBAL.isKDApp) {
        aladdin.header.config({
          //导航头部背景颜色
          backgroundColor: '#ffffff',
          //是否显示导航头部底部线条
          underlineVisible: false,
          //是否显示左区域按钮
          leftVisible: true,
          //是否显示右区域按钮
          rightVisible: true,
          //导航头部中间区域，
          middle: [{
            //类型（text、image、search等）
            type: 'text',
            //标题 页面title，自定义
            title: '提交订单',
            //文字颜色
            textColor: '#f37937',
            //文字大小
            fontSize: 18,
            //背景颜色
            backgroundColor: '#ffffff',
            //回调事件
            click: function () {
              //do something
            }
          }],
          //左区域
          left: [{
            //图标
            //icon: '/navBar/images/navBar/scan@2x.png',
            //图标颜色
            //tintColor: '#999999',
            //背景颜色
            //backgroundColor: '#ffffff',
            //是否显示小红点
            //badge: false,
            //回调事件
            click: function () {
              window.aladdin.navigator.back();
            }
          }],
          //右区域
          right: [{
            //图标
            //icon: '/navBar/images/navBar/customer@2x.png',
            //回调事件
            //click: function () {
            //do something
            //}
          }]
        }, function (err, param) {
          //设置导航栏回调
        });
      }
      // this.getData()
    },
    methods: {
      getData() {
        this.$axios.post("/open/api/order/detail/get", {id: this.$route.query.id})
          .then(res => {
            this.orderMsg = res.data;
          })
      },
      submit() {
        this.showSubmit = true;
      },
      pay() {
        if (this.GLOBAL.isKDApp) {
          window.aladdin.navigator.forward({url: 'http://test.hdjincheng.cn/#/payMethod?orderNo=' + this.orderMsg.orderNo + '&id=' + this.$route.query.id});
        } else {
          this.$router.push({path: "/payMethod", query: {orderNo: this.orderMsg.orderNo, id: this.$route.query.id}})
        }
      }
    },
    components: {
      // XDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    padding: 0 15px;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    text-align: left;
    .top{
      margin-top: 7px;
      width: 100%;
      height: 263px;
      background: url("../assets/tradeBG.png") no-repeat;
      background-size: 100% auto;
      text-align: center;
      font-size: 14px;
      .p1{
        padding: 55px 0 22px;
        font-size: 22px;
        color: #fff;
      }
      .p2{
        margin-bottom: 26px;
        font-size: 26px;
        color: #fff;
      }
      .p3{
        line-height: 28px;
      }
      img{
        margin-right: 6px;
        width: 20px;
        height: auto;
      }
      .p4{
        margin-top: 18px;
        font-size: 16px;
        color: #ffe81c;
      }
    }
    .name{
      margin: 26px 0 10px;
      font-size: 16px;
      color: #ff6852;
      text-align: center;
    }
    .qrCode{
      display: block;
      margin: 0 auto 20px;
      width: 160px;
      height: 160px;
    }
    .button{
      margin: 0 auto;
      width: 70%;
      height: 45px;
      line-height: 45px;
      color: #fff;
      background: #ff6852;
      border-radius: 23px;
      text-align: center;
    }

    .logo{
      display: block;
      margin: 46px auto 0;
      width: 105px;
      height: auto;
    }
    .status{
      text-align: center;
      font-size: 16px;
      color: #ff6852;
    }
    ul{
      padding: 30px 17px 0;
      li{
        line-height: 30px;
        font-size: 14px;
        span{
          color: #ff6852;
        }
      }
    }
  }
</style>
