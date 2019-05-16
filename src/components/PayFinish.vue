<template>
  <div class="main">
    <img src="../assets/payFinish.png" alt="" class="logo">
    <p class="status">订单支付成功！</p>
    <ul>
      <li>订单编号：24343434</li>
      <li>实付金额：<span>6499元</span></li>
      <li>支付方式：微信支付</li>
    </ul>
    <div class="bottom" @click="pay()">下一步</div>
  </div>
</template>

<script>
  export default {
    name: 'PayFinish',
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
        this.$router.push('/agreement?name='+this.$route.query.name+'&type='+this.$route.query.type)
        /*if (this.GLOBAL.isKDApp) {
          window.aladdin.navigator.forward({url: 'http://test.hdjincheng.cn/#/payMethod?orderNo=' + this.orderMsg.orderNo + '&id=' + this.$route.query.id});
        } else {
          this.$router.push({path: "/payMethod", query: {orderNo: this.orderMsg.orderNo, id: this.$route.query.id}})
        }*/
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
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    text-align: left;
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
    .bottom{
      margin: 20px auto 0;
      width: 155px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: bold;
      background: #ff7350;
      text-align: center;
      border-radius: 17px;
    }
  }
</style>
