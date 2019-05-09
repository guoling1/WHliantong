<template>
  <div class="main">

    <!--<div class="banner">-->
      <!--<img src="../assets/banner.png" alt="" style="width: 100%;height: 100%">-->

    <!--</div>-->
      <div>
        <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!descMask" :loop="!descMask" :show-dots="showDots" :show-desc-mask="descMask" dots-position="center" dots-class="dotsClass"></swiper>
        <p class="homeTitle">热门推荐</p>
        <ul>
          <li v-for="(item,index) in list">
            <img :src="item.swiperList[0].url" alt="" style="width: 140px;height: 140px">
            <div class="">{{item.name}}</div>
            <!--<div class="subject" style="font-size: 14px;margin-top: 5px">{{item.packageName}}</div>-->
            <div class="subject">套餐：{{item.consumePrice}}<span>X{{item.circle}}期</span></div>
            <div class="price">存款金额：<span>￥{{item.deposit}}</span></div>
            <div class="button" @click="toDetail(item.id)">立即办理</div>
          </li>
        </ul>
        <p class="homeTitle">所有产品</p>
        <ul>
          <li v-for="(item,index) in list">
            <img :src="item.swiperList[0].url" alt="" style="width: 140px;height: 140px">
            <div class="">{{item.name}}</div>
            <!--<div class="subject" style="font-size: 14px;margin-top: 5px">{{item.packageName}}</div>-->
            <div class="subject">套餐：{{item.consumePrice}}<span>X{{item.circle}}期</span></div>
            <div class="price">担保金额：<span>￥{{item.deposit}}</span></div>
            <div class="button" @click="toDetail(item.id)">立即办理</div>
          </li>
        </ul>
        <div style="margin: 17px;" @click="loadMore()" v-if="more">点击加载更多</div>
      </div>
    <!--<login-mask v-if="isLogin" v-on:child-close="listenClose"></login-mask>-->
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import LoginMask from './loginMask'
  export default {
    name: 'Home',
    data() {
      return {
        aspectRatio:0.63,
        list: [],
        // swiperList: [{img: require('../assets/banner.png')}],
        swiperList: [{img: require('../assets/homeBanner.png')},{img: require('../assets/homeBanner.png')}],
        showDots: true,
        descMask: false,
        swipercolor:'#ff4400',
        pageNo:1,
        pageSize:10,
        more:true,
        isLogin:false
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
            title: '中国联通',
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
      var url = location.href
      function formatUrl(url){
        var reg=/(?:[?&]+)([^&]+)=([^&#]+)/g; //三个分组，并且不匹配第一个分组
        var data={};
        function fn(str,pro,value){
          data[decodeURIComponent(pro)]=decodeURIComponent(value);
        }
        url.replace(reg,fn);
        return data;
      }
      var data=formatUrl(url);
      this.getData()
      if(data.key){
        localStorage.setItem('key',data.key)
      }else{
        localStorage.removeItem('key')
      }
      if(data.bk==1){
        sessionStorage.setItem('bk',1)
        this.$store.commit('BK')
      }
      if(data.ext){
        localStorage.setItem('ext',data.ext)
        // this.$store.commit('BK')
      }else {
        localStorage.setItem('ext',0)
        localStorage.setItem('key','384af3af0dd948cfbeda2290146fa835')
      }
      if(data.cid){
        localStorage.setItem('bankMsg',JSON.stringify(data))
      }else {
        let dataPrams={
          source:'sa0001187',
          outerSource:'os0003740',
          outerid:'ou0000692',
          cid:'ci0000001',
          rec_no:'ZHANGLEIBJ'
        }
        // localStorage.removeItem('bankMsg')
        localStorage.setItem('bankMsg',JSON.stringify(dataPrams))
      }
      // this.getSwiper()
    },
    methods: {
      getSwiper(){
        this.$axios.post("/open/api/index/swiper/list")
          .then(res=>{
            for(let i=0;i<res.data.length;i++){
              res.data[i].img = res.data[i].url
            }
            this.swiperList = res.data
          })
      },
      listenClose(val){
        this.isLogin = val
      },
      toDetail(id) {
        this.$store.commit("PHONE",'请选择')
        localStorage.removeItem('selectPhone');
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://test.hdjincheng.cn/#/homeDetail?id='+id+'&reload='+new Date().getTime()+'&areaId=1655&proproductColor=&checkCode=0000&number='});
        }else {
          this.$router.push({path:"/homeDetail",query:{id:id,reload:new Date().getTime(),areaId:1655,productColor:'',checkCode:'0000',number:''}})
        }
      },
      getData(){
        this.$axios.post("/open/api/product/list",{sellFlag:1,areaId: 1655,pageNo:this.pageNo,pageSize:this.pageSize})
          .then(res=>{
            for(let i=0;i<res.data.list.length;i++){
              if(!res.data.list[i].swiperList||res.data.list[i].swiperList.length==0){
                res.data.list[i].swiperList=[{url:''}]
              }
              if(!res.data.list[i].packageList){
                res.data.list[i].packageList=[{price:'',circle:''}]
              }
            }
            this.list = res.data.list;
            if(this.pageNo==res.data.totalPage){
              this.more = false
            }else {
              this.pageNo+=1;
            }
          })
      },
      loadMore(){
        this.$axios.post("/open/api/product/list",{sellFlag:1,areaId: 1655,pageNo:this.pageNo,pageSize:this.pageSize})
          .then(res=>{
            for(let i=0;i<res.data.list.length;i++){
              if(!res.data.list[i].swiperList||res.data.list[i].swiperList.length==0){
                res.data.list[i].swiperList=[{url:''}]
              }
              if(!res.data.list[i].packageList){
                res.data.list[i].packageList=[{price:'',circle:''}]
              }
            }
            this.list = this.list.concat(res.data.list)
            if(this.pageNo==res.data.totalPage){
              this.more = false
            }else {
              this.pageNo+=1;
            }
          })
      }
    },
    components: {
      Swiper,
      LoginMask
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">

  .main {
    /*margin: 50px 0 0;*/
    padding-bottom: 50px;
    width: 100%;
    background: #f5f5f5;

  .banner {
    width: 100%;
    height: 430px;
  }
    .homeTitle{
      text-align: left;
      margin: 16px 15px 0;
      font-size: 18px;
    }

  ul {
    margin: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  li {
    margin-top: 15px;
    font-size: 14px;
    padding-bottom: 15px;
    width: 48.5%;
    /*height: 272px;*/
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 #f5f5f5;

  img {
    display: inline-block;
    width: 100%;
    margin: 10px auto 0;
  }

  .subject {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    /*height: 42px;*/
    /*line-height: 42px;*/
    span{
      font-size: 12px;
      padding: 0 5px;
      background: #7ba9ca;
      border-radius: 12px;
      color: #fff;
      margin-left: 5px;
    }
  }

  .price {

  span {
    font-weight: bold;
    color: #e9353e;
  }

  }
  .button {
    margin: 8px auto 0;
    width: 106px;
    height: 23px;
    line-height: 23px;
    border: 1px solid #444c59;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    background-color: #ff8360;
  }

  }
  }
  }
</style>
<style>
  .dotsClass a .active{
    background-color: #ff7653 !important;
  }
</style>
