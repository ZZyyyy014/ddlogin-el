import axios from 'axios';
import {promise} from "ora"; //映入axios

const axi = axios.create({

  baseURL: 'http://192.168.202.151:9090/',
  timeout: 6000,  //请求6秒自动断开连接
  headers:{
    jwtToken:"",
    'Access-Control-Allow-Credentials':"true"//1
  },
  withCredentials:true,//要放行cookie  不然后端取session会产生一个新的session(基于cookie产生新的session)
})

//暴露 实例对象

export default axi;

axi.interceptors.request.use(res => {

  //不是登录  都要请求token
  if(res.url!='/user/ddlogin'){
    //取回jwtToken
    const jwtToken = window.localStorage.getItem("jwtToken");
    //如果token 有值得话  把token存入 响应header中
    //登录前没有token值 登录后值存在   但为什么取出来为null
    if (jwtToken) {
      res.headers.jwtToken = jwtToken;
    }
    //没有token返回登录页面
/*
if (!jwtToken) {
       window.location.href='/';
    }*/

}
  //请求 拦截器
  return res;
})


axi.interceptors.response.use(res => {

  // 响应拦截器
  var codes = res.data.code
  // 如果token出错   返回的状态10001
  var state=res.data.state;
  //后端返回响应
  if (codes != 200 && state!=10001) {
    //打印。。
   alert(res.data.msg);
}

if (state==10001) {
       window.location.href='/';
    }

  return res;

})


