<template>
  <div class="main">
    <div class="box">
      <ul>
        <li :class="selectNum==item.number?'active':''" @click="selectNum=item.number" v-for="item in phoneList">{{item.number}}</li>
      </ul>
      <p @click="getData()">换一批</p>
    </div>

    <div class="button" @click="submit()">确认</div>
  </div>
</template>

<script>
export default {
  name: 'SelectPhone',
  data () {
    return {
      phoneList:[],
      selectNum:'',
      pageNo:1
    }
  },
  created(){
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
          title: '手机号选择',
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
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta
  //   to.meta.keepAlive = true;
  //   next();
  // },
  methods:{

    getData(){
      this.$axios.post("/open/api/numberpool/list",{pageNo:this.pageNo})
        .then(res=>{
          this.phoneList = res.data.list;

          if((res.data.count-res.data.firstResult)<20){
            this.pageNo=1
          }else {
            this.pageNo++;
          }
          for(let i=0;i<this.phoneList.length;i++){
            this.phoneList[i].number = parseFloat(this.phoneList[i].number).toString()
          }
          this.selectNum = this.phoneList[0].number
        })
    },
    submit(){
      this.$router.push('/orderInfor?name='+this.$route.query.name+'&type='+this.$route.query.type+'&price='+this.$route.query.price)
      // localStorage.setItem("selectPhone",this.selectNum)
      // this.$store.commit("PHONE",this.selectNum)
      // if(this.GLOBAL.isKDApp){
      //   window.aladdin.navigator.forward({url:'http://test.hdjincheng.cn/#/homeDetail?id='+this.$route.query.id});
      // }else{
      //   this.$router.push("/homeDetail?id="+this.$route.query.id)
      // }

    }
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0 0;
  background: #f4f4f4;
  font-size: 14px;
  height: 100%;
  width: 100%;
  .box{
    padding-bottom: 20px;
    margin: 9px auto 0;
    width: 92%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 25px #b6dde1;
    ul{
      padding: 15px 15px 0;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      li{

        width: 45%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .active{
        background: #444c59;
        color: #fff;
      }
    }
    p{
      margin: 10px auto 15px;
      color: #fff;
      width: 85px;
      line-height: 26px;
      background: #5a94bd;
      border-radius: 4px;
    }
  }

  .button{
    margin: 20px auto;
    width: 155px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    font-weight: bold;
    background: #ff7350;
    border-radius: 17px;
  }
}
</style>
