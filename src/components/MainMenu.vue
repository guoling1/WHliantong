<template lang="html">
  <div class="menu flex-box-column flexBox">
    <router-view></router-view>
    <div class="bottom">
      <router-link :to="{path:'/home',query: common}" class="btn"
                   :class="pathName=='home'?'active':''">
        <div class="icon icon-home"></div>
        <p>主页</p>
      </router-link>
      <router-link :to="{path:'/order',query: common}" class="btn"
                   :class="pathName=='order'?'active':''">
        <div class="icon icon-order"></div>
        <p>订单</p>
      </router-link>
      <router-link :to="{path:'/my',query: common}" class="btn"
                   :class="pathName=='my'?'active':''">
        <div class="icon icon-my"></div>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    name: 'mainMenu',
    data () {
      return {
        common: {
          appid: '',
          uid: ''
        },
        pathName: this.$route.name
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        vm.$data.common.appid = to.query.appid;
        vm.$data.common.uid = to.query.uid;
      });
    },
    watch: {
      $route: function (n, o) {
        this.$data.pathName = n.name;
        this.$data.common.appid = o.query.appid;
        this.$data.common.uid = o.query.uid;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .flexItem(@val,@width:0) {
    box-flex: @val;
    -webkit-box-flex: @val;
    -webkit-flex: @val;
    -ms-flex: @val;
    flex: @val;
    width: @width;
  }
  .menu {
    .flexItem(1, 100%);
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
    background-color: #ff7350;
    .btn {
      float: left;
      width: 33.33%;
      height: 52px;
      text-align: center;
      display: block;
      .icon {
        margin: 8px auto 0;
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        &.icon-home {
          background-image: url("../assets/home.png");
        }
        &.icon-order {
          background-image: url("../assets/order.png");
        }
        &.icon-my {
          background-image: url("../assets/my.png");
        }
      }
      p {
        font-size: 12px;
        color: #fff;
        margin-top: 3px;
      }
      &.active {
        .icon-home {
          background-image: url("../assets/home1.png");
        }
        .icon-order {
          background-image: url("../assets/order1.png");
        }
        .icon-my {
          background-image: url("../assets/my1.png");
        }
        p {
          color: #ffcf6a;
        }
      }
    }
  }
</style>
