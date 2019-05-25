<template>
  <div class="main">

    <div class="agreement">
      <div class="name">协议内容</div>
      <div class="content" style="text-align: center;padding-bottom: 100px">{{detail}}</div>
  </div>
    <div class="aTitle">请在下框内进行签名</div>
    <div class="sign">
      <img style="width: 100%;height: 100%" src="../assets/zs.png" alt="" v-if="$route.query.name=='张三'">
      <img style="width: 100%;height: 100%" src="../assets/ls.png" alt="" v-if="$route.query.name=='李四'">
    </div>
    <div class="hello">
      <div id="canvas">
      </div>
      <p @click="handelClearEl()">清除</p>
      <p @click="handelSaveEl()">保存</p>
      <p @click="handelThickness()">粗细</p>
      <p @click="handelColour()">颜色</p>
      <img :src="imgsrc" alt="">
    </div>
    <div class="button" @click="submit()">生成协议</div>
  </div>
</template>

<script>
  let canvas = document.createElement("canvas");
  let cxt = canvas.getContext("2d");
  export default {
    name: 'Agreement',
    data() {
      return {
        linewidth: 1, //线条粗细，选填
        color: "black", //线条颜色，选填
        background: "pink", //线条背景，选填
        imgsrc: "",
        showSubmit: false,
        orderMsg: {},
        productData: JSON.parse(localStorage.getItem("productMessage")),
        detail:'存款止付合约购机协议'
      }
    },
    mounted() {
      console.log("mounted");
      console.log(this.color);
      this.getCanvas();
    },
    methods: {
      getCanvas() {
        let el = document.getElementById("canvas");
        el.appendChild(canvas);
        canvas.width = el.clientWidth;
        canvas.height = el.clientHeight;
        cxt.fillStyle = this.background; //填充绘图的背景颜色
        cxt.fillRect(0, 0, canvas.width, canvas.height); //绘制“已填色”的矩形
        cxt.strokeStyle = this.color; //笔触的颜色
        cxt.lineCap = "round"; //线条末端线帽的样式
        let linewidth = this.linewidth;
        //开始绘制
        canvas.addEventListener(
          "touchstart",
          function(e) {
            cxt.beginPath();
            cxt.lineWidth = linewidth; //当前线条的宽度，以像素计
            cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY-50);
          }.bind(this),
          false
        );
        //绘制中
        canvas.addEventListener(
          "touchmove",
          function(e) {
            cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY-50);
            cxt.stroke();
          }.bind(this),
          false
        );
        //结束绘制
        canvas.addEventListener(
          "touchend",
          function() {
            cxt.closePath();
          }.bind(this),
          false
        );
      },
      handelColour() {
        this.color = "red";
        this.getCanvas();
      },
      handelThickness() {
        this.linewidth = 5;
        this.getCanvas();
      },
      handelClearEl() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
      },
      handelSaveEl() {
        let imgBase64 = canvas.toDataURL();
        console.log(imgBase64);
        this.imgsrc = imgBase64;
      }
    }
    /*created() {
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
    }*/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    /*padding: 0 25px;*/
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
