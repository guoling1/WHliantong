<template>
  <div class="main">
    <div class="box">
      <ul>
        <li>
          <span class="attr">订单编号：</span>
          <span class="value">34345435</span>
        </li>
        <li>
          <span class="attr">下单时间：</span>
          <span class="value">2018</span>
        </li>
        <li>
          <span class="attr">交易状态：</span>
          <span class="value">待支付</span>
        </li>
      </ul>
    </div>
    <div class="box">
      <div class="boxTitle">商品信息</div>
      <div class="content clearfix">
        <div class="left">
          <img src="../assets/phone.png" alt="">
        </div>
        <ul class="right" style="padding-top: 15px">
          <li>
            <span class="attr">型号：</span>
            <span class="value">34345435</span>
          </li>
          <li>
            <span class="attr">颜色：</span>
            <span class="value">2018</span>
          </li>
          <li>
            <span class="attr">内存：</span>
            <span class="value">待支付</span>
          </li>
          <li>
            <span class="attr">套餐：</span>
            <span class="value">12个月存费送机</span>
          </li>
          <li>
            <span class="attr">手机号码：</span>
            <span class="value">12345633333</span>
          </li>
        </ul>
      </div>
      <div class="bottom">￥6499.00<span>x1</span></div>
    </div>
    <div class="box">
      <div class="boxTitle">收货信息</div>
      <ul>
        <li>
          <span class="attr">收&nbsp;&nbsp;货&nbsp;&nbsp;人：</span>
          <span class="value">34345435</span>
        </li>
        <li>
          <span class="attr">联系方式：</span>
          <span class="value">2018</span>
        </li>
        <li>
          <span class="attr">收货地址：</span>
          <span class="value">待支付</span>
        </li>
      </ul>
    </div>
    <div class="box">
      <div class="boxTitle">收货信息</div>
      <ul>
        <li>
          <span class="attr">商品总额：</span>
          <span class="value fr">34345435</span>
        </li>
        <li>
          <span class="attr">运费：</span>
          <span class="value fr">2018</span>
        </li>
        <li>
          <span class="attr">交易状态：</span>
          <span class="value fr">待支付</span>
        </li>
      </ul>
      <div class="bottom">实付金额：￥9499</div>
    </div>
    <div class="button" @click="submit()" v-if="type!=3">确认支付</div>
    <div class="showSubmit">
      <x-dialog v-model="showSubmit" class="dialog-demo">
        <img src="../assets/closeOrg.png" alt="" class="close">
        <div class="top">
          <span>支付方式</span>
        </div>
        <ul>
          <li class="active">
            <div class="radio"><span></span></div>
            <img src="../assets/xianjin.png" alt="">
            <span>货到付款（现金）</span>
          </li>
          <li>
            <div class="radio"><span></span></div>
            <img src="../assets/yinxingqia.png" alt="">
            <span>XX银行</span>
          </li>
          <li>
            <div class="radio"><span></span></div>
            <img src="../assets/weixin.png" alt="">
            <span>微信支付</span>
          </li>
        </ul>
        <div class="bottom" @click="pay()">去付款</div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {XDialog} from "vux"
export default {
  name: 'OrderSubmit',
  data () {
    return {
      type:'',
      showSubmit:false,
      orderMsg:{},
      productData:JSON.parse(localStorage.getItem("productMessage"))
    }
  },
  created(){
    this.type = this.$route.query.type
    if(this.GLOBAL.isKDApp){
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
        }]}, function (err, param) {
        //设置导航栏回调
      });
    }
    this.getData()
  },
  methods:{
    getData(){
      this.$axios.post("/open/api/order/detail/get",{id:this.$route.query.id})
        .then(res=>{
          this.orderMsg = res.data;
        })
    },
    submit(){
      this.showSubmit = true;
    },
    pay(){
      this.$router.push('/payFinish?name='+this.$route.query.name+'&type='+this.$route.query.type)
      // if(this.GLOBAL.isKDApp){
      //   window.aladdin.navigator.forward({url:'http://test.hdjincheng.cn/#/payMethod?orderNo='+this.orderMsg.orderNo+'&id='+this.$route.query.id});
      // }else{
      //   this.$router.push({path:"/payMethod",query:{orderNo:this.orderMsg.orderNo,id:this.$route.query.id}})
      // }
    }
  },
  components:{
    XDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  /*margin: 50px 0;*/
  padding-bottom: 50px;
  width: 100%;
  background: #f4f4f4;
  text-align: left;
  .box{
    margin: 20px auto 0;
    padding: 0 8px;
    width: 92%;
    background: #fff;
    border-radius: 3px;
    ul{
      padding: 10px 0;
      font-size: 12px;
      li{
        line-height: 24px;

      }
    }
    .boxTitle{
      line-height: 30px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
    }
    .content{
      .left{
        float: left;
        padding: 15px;
        margin: 15px 0;
        width: 120px;
        height: 120px;
      }
    }
    .bottom{
      text-align: right;
      color: #e9353e;
      font-size: 14px;
      line-height: 40px;
      border-top: 1px solid #f0f0f0;
      padding-bottom: 14px;
      font-weight: bold;
      span{
        color: #868686;
      }
    }
  }
  .button{
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
  .showSubmit{
    .close{
      position: absolute;
      right: 10px;
      top: 10px;
      width: 15px;
      height: 15px;
    }
    .top{
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #d9d9d9;
    }
    ul{
      padding: 0 15px;
      text-align: left;
      li{
        height: 41px;
        line-height: 41px;
        border-bottom: 1px solid #d9d9d9;
        &.active{
          .radio{
            border: 1px solid #e03d98;
            span{
              display: inline-block;
              width: 9px;
              height: 9px;
              background: #fe9472;
              border-radius: 5px;
              border: 1px solid #e03d98;
            }
          }

        }
        .radio{
          display: inline-block;
          width: 15px;
          height: 15px;
          border: 1px solid #d9d9d9;
          border-radius: 7.5px;
          font-size: 0;
          text-align: center;
          vertical-align: middle;
          line-height: 23px;
        }
        img{
          margin: 0 10px 0 12px;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
    }
    .bottom{
      margin: 25px auto 15px;
      width: 80%;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border-radius: 4px;
      background: #5a94bd;
    }
  }
}
</style>
