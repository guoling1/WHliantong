<template>
  <div class="main">
    <div class="agreement">
      <div class="name">协议内容</div>
      <div class="content" style="text-align: center">{{detail}}</div>
  </div>
    <div class="aTitle">请在下框内进行签名</div>
    <div class="sign"></div>
    <div class="button" @click="submit()">生成协议</div>
  </div>
</template>

<script>
  export default {
    name: 'Agreement',
    data() {
      return {
        showSubmit: false,
        orderMsg: {},
        productData: JSON.parse(localStorage.getItem("productMessage")),
        detail:'存款止付合约购机协议'
      }
    },
    created() {
      if(this.$route.query.type==2){
        this.detail = "信用卡分期合约购机协议"
      }
    },
    methods: {
      getData() {
        this.$axios.post("/open/api/order/detail/get", {id: this.$route.query.id})
          .then(res => {
            this.orderMsg = res.data;
          })
      },
      submit() {
        this.$router.push('/tradeFinish')
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
    /*min-height: 100%;*/
    background: #f4f4f4;
    text-align: left;
    .agreement{
      padding: 45px 0;
      margin: 25px 0 45px;
      background: #fff;
      box-shadow: 0 3px 20px #c2e0e5;
      border-radius: 5px;
      .name{

        text-align: center;
        font-size: 22px;
      }
      p,h6,h5,li{
        line-height: 22px !important;
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
      margin: 0 auto 100px;
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
