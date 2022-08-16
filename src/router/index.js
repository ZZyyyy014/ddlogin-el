import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "../components/home/Home";
import Indexx from "../components/Index"
import Homeinset from "../components/home/homeinset";
import Order from "../components/order/order";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path:'/index',
      name:'index',
      redirect:'/home',
      component:Indexx,
      children:
        [
          {path: '/home', name: 'home', component: Home,},
          {path:"/homeinset", name: 'homeinset',component:Homeinset},
          {path:'/order',name:'order',component:Order},
        ]
    },




  ]



})
