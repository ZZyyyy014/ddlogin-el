import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "../components/Home";
import Indexx from "../components/Index"
import Homeinset from "../components/homeinset";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
 /*
  {
      path: '/home',
      name: 'home',
      component: Home,
    },*/
    {
      path:'/index',
      name:'index',
      redirect:'/home',
      component:Indexx,
      children:
        [
          {path: '/home', name: 'home', component: Home,},
          {path:"/homeinset", name: 'homeinset',component:Homeinset},
        ]
    },
  ]



})
