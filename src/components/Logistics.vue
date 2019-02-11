<template>
  <div class="main">
    <div class="logistics">
      <div class="msgnum">
        <p class="yundan">运单号：{{wlData.mailNo}}</p>
        <!--<p class="dingdan">订单号：{{api.pageParam.id}}</p>-->
      </div>
      <ul>
        <li>
          <label>发货状态：</label>
          <span class="status">已发货</span>
        </li>
        <li>
          <label>物流公司：</label>
          <span class="transname">{{wlData.expTextName}}</span>
          <!--<span class="transnum">521265468741</span>-->
          <!--<a href="">去申通快递官网查看>></a>-->
        </li>
        <li>
          <label>物流信息：</label>
          <div class="list" v-for="item in wlData.data"><p class="price">{{item.time}}</p>{{item.context}}</div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'logistics',
    data() {
      return {
        wlData:{}
      }
    },
    created() {
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
            title: '订单详情',
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
      this.$axios.post("/open/busi/queryDelivery", {number: this.$route.query.expressCode})
        .then(res => {
          console.log(res)
           this.wlData = JSON.parse(res.request.response).showapi_res_body
          console.log(this.wlData)
        })
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;
    text-align: left;
    .msgnum{
      color: #ff4400;
      padding: 0 15px;
      border-bottom: 1px solid #cacaca;
      font-size: 14px;
      margin-bottom: 3px;
    }
    .msgnum p{
      line-height: 25px;
    }
    .msgnum .dingdan{
      color: #383838;
      /*float: right;*/
    }
    ul{
      padding-bottom: 15px;
    }
    ul li{
      margin-top: 10px;
      padding: 0 15px;
    }
    ul li label{
      font-size: 14px;
      color: #393939;
      /*width: 60px;*/
      text-align: right;
      display: inline-block;
      font-weight: bold;
    }
    ul li .transnum{
      margin: 0 34px 0 12px;
    }
    ul li > a{
      color: #00921e;
      font-size: 12px;
    }
    ul li p{
      display: inline-block;
    }
    ul li p{
      font-size: 12px;
      color: #4a4a4a;
    }
    ul li p.price{
      display: block;
      color: #b5b4b4;
    }
    ul li > span{
      font-size: 12px;
      color: #4a4a4a;
    }
    ul li .list{
      font-size: 12px;
      margin-bottom: 5px;
    }


  }
</style>
