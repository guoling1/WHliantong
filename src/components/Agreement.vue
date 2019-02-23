<template>
  <div class="main">
    <div class="agreement">
      <div class="name">协议内容</div>
    </div>
    <div class="aTitle">请在下框内进行签名</div>
    <div class="sign"></div>
    <div class="button">生成协议</div>
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
    padding: 0 25px;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    text-align: left;
    .agreement{
      margin: 25px 0 45px;
      background: #fff;
      box-shadow: 0 3px 20px #c2e0e5;
      border-radius: 5px;
      .name{
        padding-top: 45px;
        text-align: center;
        font-size: 22px;
      }
    }
    .aTitle{
      text-align: center;
      font-size: 16px;
    }
    .sign{
      margin: 25px 0 18px;
      height: 200px;
      background: #acc4d5;
      box-shadow: 0 3px 20px #c2e0e5;
      border-radius: 5px;
    }
    .button{
      margin: 0 auto;
      width: 112px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      background: #5a94bd;
      border-radius: 5px;
      text-align: center;
    }
  }
</style>
