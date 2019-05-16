import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'
import OrderInfor from '@/components/OrderInfor'
import Logistics from '@/components/Logistics'
import My from '@/components/My'
import HomeDetail from '@/components/HomeDetail'
import HomeDetail1 from '@/components/HomeDetail1'
import HomeDetail2 from '@/components/HomeDetail2'
import ShopInfor from '@/components/ShopInfor'
import InforEntry from '@/components/InforEntry'
import WritePhone from '@/components/WritePhone'
import PayMethod from '@/components/PayMethod'
import OrderSubmit from '@/components/OrderSubmit'
import SelectPhone from '@/components/SelectPhone'
import Login from '@/components/Login'
import ChangePwd from '@/components/ChangePwd'
import Regist from '@/components/Regist'
import Commission from '@/components/Commission'
import CommissionSub from '@/components/CommissionSub'
import CustomOrder from '@/components/CustomOrder'
import PayFinish from '@/components/PayFinish'
import Agreement from '@/components/Agreement'
import TradeFinish from '@/components/TradeFinish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: MainMenu,
      children:[
      	{
      		path:'/home',
      		name:'home',
          meta:{
            title:"首页",
            keepAlive:false
          },
      		component:Home
      	},
        {
          path:'/order',
          name:'order',
          meta:{
            title:"中国联通"
          },
          component:Order
        },
        {
          path:'/my',
          name:'my',
          meta:{
            title:"中国联通"
          },
          component:My
        },
        {
          path:'/orderDetail',
          name:'orderDetail',
          meta:{
            title:"订单详情"
          },
          component:OrderDetail
        },{
          path:'/logistics',
          name:'logistics',
          meta:{
            title:"物流信息"
          },
          component:Logistics
        },
      ]
    },
    {
      path:'/homeDetail',
      name:'homeDetail',
      meta:{
        title:"产品选择",
        keepAlive:true
      },
      component: HomeDetail
    },
    {
      path:'/homeDetail1',
      name:'homeDetail1',
      meta:{
        title:"存款止付合约购机",
        keepAlive:true
      },
      component: HomeDetail1
    },
    {
      path:'/homeDetail2',
      name:'homeDetail2',
      meta:{
        title:"信用卡分期合约购机",
        keepAlive:true
      },
      component: HomeDetail2
    },
    {
      path:'/shopInfor',
      name:'shopInfor',
      meta:{
        title:"中国联通"
      },
      component: ShopInfor
    },
    {
      path:'/InforEntry',
      name:'InforEntry',
      meta:{
        title:"信息录入"
      },
      component: InforEntry
    },
    {
      path:'/writePhone',
      name:'writePhone',
      meta:{
        title:"支付订单"
      },
      component: WritePhone
    },
    {
      path:'/customOrder',
      name:'customOrder',
      meta:{
        title:"客户订单"
      },
      component: CustomOrder
    },
    {
      path:'/payMethod',
      name:'payMethod',
      meta:{
        title:"支付订单"
      },
      component: PayMethod
    },
    {
      path:'/orderSubmit',
      name:'orderSubmit',
      meta:{
        title:"订单提交成功"
      },
      component: OrderSubmit
    },
    {
      path:'/selectPhone',
      name:'selectPhone',
      meta:{
        title:"手机号选择",
        keepAlive:false
      },
      component: SelectPhone
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:"登录"
      },
      component: Login
    },
    {
      path:'/changePwd',
      name:'changePwd',
      meta:{
        title:"修改密码"
      },
      component: ChangePwd
    },
    {
      path:'/regist',
      name:'regist',
      meta:{
        title:"登录"
      },
      component: Regist
    },
    {
      path:'/commission',
      name:'commission',
      meta:{
        title:"我的佣金"
      },
      component: Commission
    },
    {
      path:'/commissionSub',
      name:'commissionSub',
      meta:{
        title:"提现"
      },
      component: CommissionSub
    },{
      path:'/orderInfor',
      name:'orderInfor',
      meta:{
        title:"订单信息"
      },
      component:OrderInfor
    },{
      path:'/payFinish',
      name:'payFinish',
      meta:{
        title:"支付完成"
      },
      component:PayFinish
    },{
      path:'/agreement',
      name:'agreement',
      meta:{
        title:"协议签署"
      },
      component:Agreement
    },{
      path:'/tradeFinish',
      name:'tradeFinish',
      meta:{
        title:"订单完成"
      },
      component:TradeFinish
    },

  ]
})
