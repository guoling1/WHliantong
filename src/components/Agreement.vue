<template>
  <div class="agreementBox">

    <div class="agreement">
      <div class="name">协议内容</div>
      <div class="content" style="text-align: center;padding-bottom: 100px">{{detail}}</div>
    </div>
    <div class="aTitle">请在下框内进行签名</div>
    <!--<div class="sign">
      <img style="width: 100%;height: 100%" src="../assets/zs.png" alt="" v-if="$route.query.name=='张三'">
      <img style="width: 100%;height: 100%" src="../assets/ls.png" alt="" v-if="$route.query.name=='李四'">
    </div>-->
    <div class="sign">
      <canvas id="canvas" :width="width" height="200"></canvas>
      <div>
        <button type="button" @click="clear">清空</button>
        <button type="button" @click="save">保存</button>
      </div>
      <img class="preview-img" v-if="url!==''" :src="url" :width="imgWidth" :height="imgHeight" alt="">
    </div>
    <!--<div class="hello">
      <div id="canvas">
      </div>
      <p @click="handelClearEl()">清除</p>
      <p @click="handelSaveEl()">保存</p>
      <p @click="handelThickness()">粗细</p>
      <p @click="handelColour()">颜色</p>
      <img :src="imgsrc" alt="">
    </div>-->
    <div class="button" @click="submit()">生成协议</div>
  </div>
</template>

<script>
  var preHandler = function ( e ) {e.preventDefault();};
  export default {
    name: 'agreementBox',
    props : {
      width : {
        type : String,
        default : '300'
      },
      height : {
        type : String,
        default : '200'
      },
      strokeStyle:{
        type : String,
        default : '#000'
      },
      showUrl:{
        type : Boolean,
        default : true
      },
      imgWidth:{
        type : String,
        default : '200'
      },
      imgHeight:{
        type : String,
        default : '200'
      }
    },
    data() {
      return {
        canvas : null,       //canvas
        ctx : null,          //ctx canvas对象
        stroke_info:null,    //当前绘图的坐标
        url:'',              //base64 图像
        // height: '200',
        imgsrc: "",
        showSubmit: false,
        orderMsg: {},
        productData: JSON.parse(localStorage.getItem("productMessage")),
        detail:'存款止付合约购机协议'
      }
    },
    mounted() {
      document.getElementById("canvas").width=document.getElementsByClassName("sign")[0].offsetWidth
      this.$nextTick(_ => {
        this.init()
      })
    },
    methods: {
      init () {
        let that = this;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stroke_info = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('touchstart',function ( event ) {
          document.getElementsByClassName('agreementBox')[0].style.overflow='hidden'
          document.addEventListener('touchStart',preHandler,false);
          that.darwStart(event);
        });
        this.canvas.addEventListener('touchend', function(event) {
          document.getElementsByClassName('agreementBox')[0].style.overflow=''
          document.addEventListener('touchend', preHandler, false);
          that.drawEnd()
        });

        this.clear();
      },
      darwStart(e){
        let that = this;
        let t = e.changedTouches[0];
        // console.log(t.clientX, t.clientY);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.beginPath();  //清空所有绘画路径
        this.ctx.moveTo(t.clientX - this.stroke_info.left, t.clientY - this.stroke_info.top+document.getElementsByClassName('agreementBox')[0].scrollTop);
        this.canvas.addEventListener('touchmove',function (event) {
          that.darwMove(event);
        })
      },
      darwMove(e){
        let t = e.changedTouches[0];
        this.ctx.lineTo(t.clientX - this.stroke_info.left, t.clientY - this.stroke_info.top+document.getElementsByClassName('agreementBox')[0].scrollTop);
        this.ctx.stroke();
      },
      drawEnd(){
        document.removeEventListener('touchstart', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        document.removeEventListener('touchend', preHandler, false);
      },
      clear () {
        this.ctx.clearRect(0,0,document.getElementsByClassName("sign")[0].offsetWidth, this.height);
        this.url = '';
        this.$emit('draw_clear');
      },
      save () {
        let data = this.canvas.toDataURL();
        //是否显示预览截图
        if(this.showUrl){
          this.url = data;
        }
        let query = {url : data};
        this.$emit('draw_save', query);
        console.log(data)
        // console.log(this.canvas);
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
  .agreementBox {
    margin-top: 0 !important;
    position: fixed;
    padding: 50px 25px 0;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    text-align: left;
    overflow-y: auto;
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
    .sign {
      width: 100%;
      height: 200px;
      /*background: #acc4d5;*/
      box-shadow: 0 3px 20px #c2e0e5;
      border-radius: 5px;

      canvas {
        /*width: 100%;*/
        /*height: 100%;*/
        margin: 0 auto;
        background: #acc4d5;
      }
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
