<template>
  <div class="main" style="height: 100%">
    <div class="userMessage">
      <ul>
        <li>
          <span>客户姓名</span>
          <input type="text" placeholder="请输入客户姓名" v-model="formData.customerName" @blur="changePY()">
        </li>
        <li>
          <span>证件类型</span>
          <input type="text" placeholder="身份证" v-model="formData.idcardType" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="这里输入证件号码" v-model="formData.idcard">
        </li>
        <li>
          <span>身份证地址</span>
          <input type="text" placeholder="这里输入身份证地址" v-model="formData.idcardAddress">
        </li>
        <li>
          <span>邮箱</span>
          <input type="text" placeholder="这里输入邮箱" v-model="formData.email">
        </li>
        <li>
          <span>收货地址</span>
          <input type="text" placeholder="这里输入收货地址" v-model="formData.address">
        </li>
        <!--<li>
          <span>性别</span>
          <input type="radio" value="男" name="sex" v-model="formData.sex">男
          <input type="radio" value="女" name="sex" v-model="formData.sex" style="margin-left: 25px">女
        </li>-->
        <li>
          <span>手机号</span>
          <input type="text" placeholder="这里输入手机号" v-model="formData.mobile" style="background: #fff" disabled>
        </li>
        <li class="code">
          <span>验证码</span>
          <input type="text" placeholder="这里输入验证码" v-model="formData.code" style="background: #fff">
          <div class="sendCode" @click="sendCode()">获取验证码</div>
        </li>
        <!--<li class="cardPhoto">
          <span>身份证正面</span>
          <img id="cardFaceImg" src="../assets/idcardface.png" alt="" @click="uploadClick('cardFace')">
          <input accept="image/*" type="file" @change="getFile($event,'cardFace','cardFaceImg','picFile')" id="cardFace" style="display: none">
        </li>
        <li class="cardPhoto">
          <span>身份证背面</span>
          <img id="cardBackImg" src="../assets/idcardback.png" alt="" @click="uploadClick('cardBack')">
          <input accept="image/*" type="file" @change="getFile($event,'cardBack','cardBackImg','picFile2')" id="cardBack" style="display: none">
        </li>
        <li class="cardPhoto">
          <span>手持身份证</span>
          <img id="cardHandImg" src="../assets/idcardhand.png" alt="" @click="uploadClick('cardHand')">
          <input accept="image/*" type="file" @change="getFile($event,'cardHand','cardHandImg','picFile3')" id="cardHand" style="display: none">
        </li>-->
        <!--<li>
          <span>收货地址</span>
          <input type="text" placeholder="选择省市区">
        </li>-->
        <!--<li>
          <span>详细地址</span>
          <input type="text" placeholder="这里输入详细地址" v-model="formData.address">
        </li>
        <li>
          <span>邮箱</span>
          <input type="email" placeholder="这里输入邮箱" v-model="formData.email">
        </li>
        <li>
          <span>备注</span>
          <input type="text" placeholder="这里输入备注" v-model="remarks">
        </li>-->
      </ul>
      <p v-if="type!=2" class="mainTitle">请拍摄您的身份证照片</p>
      <ul v-if="type!=2" class="phoneUl">
        <li class="cardPhoto">
          <img id="cardFaceImg" src="../assets/idcardface.png" alt="" @click="uploadClick('cardFace')">
          <input accept="image/*" type="file" @change="getFile($event,'cardFace','cardFaceImg','picFile')" id="cardFace" style="display: none">
          <p>身份证正面</p>
        </li>
        <li class="cardPhoto">
          <img id="cardBackImg" src="../assets/idcardback.png" alt="" @click="uploadClick('cardBack')">
          <input accept="image/*" type="file" @change="getFile($event,'cardBack','cardBackImg','picFile2')" id="cardBack" style="display: none">
          <p>身份证背面</p>
        </li>
        <li class="cardPhoto">
          <img id="cardHandImg" src="../assets/idcardhand.png" alt="" @click="uploadClick('cardHand')">
          <input accept="image/*" type="file" @change="getFile($event,'cardHand','cardHandImg','picFile3')" id="cardHand" style="display: none">
          <p>手持身份证</p>
        </li>
      </ul>
    </div>
    <!--<p class="tips">温馨提示：请当月激活号卡，套餐次月生效，建议尽量使用wifi避免产生额外费用。</p>-->
    <div class="button" @click="submit()">校验信息</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
    <div class="successBox" v-if="isSuccess">
      <img src="../assets/bgsuccess.png" alt="">
      <img src="../assets/closeWrite.png" alt="" class="close">
      <p>校验成功</p>
      <p class="btn" @click="successFn()">确认</p>
    </div>
    <div class="failBox" v-if="isFail">
      <div class="top">
        <p class="boxTitle">友情提示</p>
        <p class="tip">1.联通黑名单用户不能办理</p>
        <p class="tip">2.在联通已经拥有超过5个号码（含5个）不能办理</p>
        <p class="tip">3.如不清楚账户状态可拨打10010咨询</p>
      </div>
      <!--<img src="../assets/bgfail.png" alt="">-->
      <img src="../assets/closeWrite.png" alt="" class="close">

      <p class="msg">校验失败</p>
      <p class="btn">确认</p>
    </div>
  </div>
</template>

<script>
  import PINYIN from './pinyin'
  import {PopupRadio} from 'vux'

  export default {
    name: 'ShopInfo',
    data() {
      return {
        type:'',
        isSuccess:false,
        isFail:false,
        productMsg: {},
        formData: {
          productName: '',//产品名称
          productPrice: '',//产品价格
          productMobile: '',//产品手机号
          circle: '',//套餐周期
          deposit: '',//托管金额
          areaId: '',//区域id
          bank: '',//银行
          endDay: '',//截止日期
          region: '',//所属区域
          customerName: '张三',//客户名称
          xingPinyin: '',//姓拼音
          mingPinyin: '',//名拼音
          country: '',//国家
          agreetmentNo: '',//合同号
          mobile: '13075425555',//客户手机号
          price: '',//价格
          busiType: '',//业务类型
          idcardType: '',//证件类型
          idcard: '130406199909150621',//身份证号
          address: '湖北省武汉市青山区建设五路3号', //详细地址
          idcardAddress:'武汉市青山区',
          email:'15245655@mail.com',
          productMemory: '',//内存
          productColor: '',//颜色
          setMeal: "",//所选号码
          sex: '男',
          code:'1234'
        },
        sex: '男',
        remarks: '',//备注
        showPrompt: false,
        promptMsg: '',
        picFile: '',
        picFile2: '',
        picFile3: ''
      }
    },
    created() {
      this.type = this.$route.query.type;
      if(this.type==2){
        this.formData.customerName = '李四'
      }
    },
    methods: {
      successFn(){
        if(this.type==1){
          this.$router.push('/selectPhone?name='+this.formData.customerName+'&type='+this.type)
        }else {
          this.$router.push('/orderInfor?name='+this.formData.customerName+'&type='+this.type)
        }
      },
      changePY() {
        var pyList = this.CC2PY(this.formData.customerName)
        this.formData.xingPinyin = pyList[0].substring(0, 1).toUpperCase() + pyList[0].substring(1);
        this.formData.mingPinyin = pyList.slice(1).join('').substring(0, 1).toUpperCase() + pyList.slice(1).join('').substring(1);
      },
      uploadClick(id) {
        document.getElementById(id).click()
      },
      getFile(event, type, type64, name) {
        let files = event.target.files || event.dataTransfer.files;
        document.getElementById(type64).src = URL.createObjectURL(files[0])
        for (var i in this.formData) {
          if (i == name) {
            this.formData[i] = files[0]
          }
        }
      },
      showPosition () {
        this.showPositionValue = true
      },
      sendCode(){
        this.promptMsg = "发送成功"
        this.showPrompt = true;
      },
      submit() {
        this.isSuccess = true
        /*this.formData.idcard = this.formData.idcard.toUpperCase()
        let params = new FormData;
        let flag = true;
        for (var i in this.formData) {
          params.append(i, this.formData[i])
        }
        for (var i in this.formData) {
          if (this.formData[i] === "") {
            flag = false
            break;
          }
        }
        params.append("remarks", this.remarks)
        params.append("productId", this.$route.query.id)
        if (localStorage.getItem('key')) {
          params.append("qrcodeKey", localStorage.getItem('key'))
          params.append("key", localStorage.getItem('key'))
        }
        if (localStorage.getItem('ext')) {
          params.append("ext", localStorage.getItem('ext'))
        }
        if (localStorage.getItem('bankMsg')) {
          params.append('cid', JSON.parse(localStorage.getItem('bankMsg')).cid);
          params.append('outerSource', JSON.parse(localStorage.getItem('bankMsg')).outerSource);
          params.append('outerid', JSON.parse(localStorage.getItem('bankMsg')).outerid);
          params.append('rec_no', JSON.parse(localStorage.getItem('bankMsg')).rec_no);
          params.append('source', JSON.parse(localStorage.getItem('bankMsg')).source)
        }
        if (flag) {
          this.$axios.post("/open/api/order/save", params, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
            .then(res => {
              if (res.retCode == "0000") {
                localStorage.setItem("productMessage", JSON.stringify(this.formData))
                if (this.GLOBAL.isKDApp) {
                  window.aladdin.navigator.forward({url: 'http://test.hdjincheng.cn/#/orderSubmit?id=' + res.data.id});
                } else {
                  this.$router.push("/orderSubmit?id=" + res.data.id)
                }
              } else {
                this.showPrompt = true;
                this.promptMsg = res.retMsg
              }
            })
            .catch(err => {
              this.errMsg = err
              this.warnText = true
            })
        } else {
          this.showPrompt = true;
          this.promptMsg = '请补全信息'
        }*/

      },
      CC2PY(l1) {

        var l2 = l1.length;

        var I1 = [];

        var reg = new RegExp('[a-zA-Z0-9\- ]');

        for (var i = 0; i < l2; i++) {

          var val = l1.substr(i, 1);

          var name = this.arraySearch(val, PINYIN.pinyin);

          if (reg.test(val)) {

            I1.push(val);

          } else if (name !== false) {

            I1.push(name);

          }

        }

        // I1 = I1.replace(/ /g, '-');
        //
        // while (I1.indexOf('--') > 0) {
        //
        //     I1 = I1.replace('--', '-');
        //
        // }

        return I1;

      },
      arraySearch(l1, l2) {

        for (var name in PINYIN.pinyin) {

          if (PINYIN.pinyin[name].indexOf(l1) != -1) {

            return this.ucfirst(name);

            break;

          }

        }

        return false;

      },
      ucfirst(l1) {

        if (l1.length > 0) {

          var first = l1.substr(0, 1);

          var spare = l1.substr(1, l1.length);

          return first + spare;

        }

      }
    },
    components: {
      PopupRadio
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .weui-cell {
    padding: 0;
  }

  .vux-cell-bd.vux-cell-primary, .vux-cell-bd.vux-cell-primary p {
    display: contents !important;
    background: red;
    flex: none !important;
    width: 53px;
  }

  .main {
    margin: 50px 0 0;
    padding: 0 20px;
    width: 100%;
    background: #f4f4f4;
    .userMessage {
      margin-top: 20px;

      ul {
        padding: 20px 15px;
        background: #fff;
        text-align: left;
        border-radius: 8px;
        box-shadow: 0 3px 25px #b4eaf0;
        li {
          font-size: 14px;
          height: 37px;
          line-height: 37px;
          border-bottom: 1px solid #e5e5e5;
          span {
            display: inline-block;
            /*width: 106px;*/
            width: 25%;
          }
        }
        li.cardPhoto {
          height: inherit;
          img {
            width: 55%;
            vertical-align: text-top;
            margin-bottom: 10px;
          }
        }
        li.code{
          input{
            width: 40%;
          }
          .sendCode{
            margin-top: 3.5px;
            float: right;
            background: #64a1cd;
            line-height: 30px;
            padding: 0 5px;
            border-radius: 15px;
            color: #fff;
          }
        }
      }
      .mainTitle{
        padding: 30px 0 25px;
      }
      .phoneUl{
        padding-bottom: 1px;
        background: #acc4d5;
        text-align: center;
        li.cardPhoto {
          height: inherit;
          border: none;
          img {
            width: 90%;
            vertical-align: text-top;
            margin-bottom: 10px;
          }
          p{
            margin: 5px 0 30px;
          }
        }
      }
    }
    .tips {
      padding: 0 15px;
      font-size: 12px;
      text-align: left;
      margin-top: 10px;
      line-height: 16px;
      color: #ff0000;
    }
    .button {
      margin: 15px auto;
      height: 35px;
      line-height: 35px;
      color: #fff;
      font-weight: bold;
      background: #5a94bd;
      width: 110px;
      border-radius: 6px;
    }
    .successBox{
      position: fixed;
      bottom: 20px;
      left: 5%;
      width: 90%;
      border: 1px solid #ff8d6d;
      border-radius: 8px;
      background: #fff;
      p{
        margin: 10px 0 15px;
        font-size: 16px;
        color: #ff8d6d;
      }
      p.btn{
        margin: 10px auto 15px;
        background: #ff8d6d;
        color: #fff;
        line-height: 34px;
        border-radius: 17px;
        width: 150px;
      }

      .close{
        position: absolute;
        top: 15px;
        right: 15px;
        width: 15px;
      }
    }
    .failBox{
      position: fixed;
      bottom: 20px;
      left: 5%;
      width: 90%;
      border: 1px solid #ff8d6d;
      border-radius: 8px;
      background: #fff;
      .top{
        .boxTitle{
          font-size: 18px;
          color: #fff;
          padding: 25px 0 30px;
        }
        .tip{
          margin: 0 10px 0;
          padding-bottom: 14px;
          text-align: left;
          color: #333;
          line-height: 25px;
        }

        background: url("../assets/bgfail.png") no-repeat;
        background-size: 100%;
      }
      .msg{
        margin: 10px 0 15px;
        font-size: 16px;
        color: #ff8d6d;
      }
      p.btn{
        margin: 10px auto 15px;
        background: #ff8d6d;
        color: #fff;
        line-height: 34px;
        border-radius: 17px;
        width: 150px;
      }

      .close{
        position: absolute;
        top: 15px;
        right: 15px;
        width: 15px;
      }
    }
  }
</style>
