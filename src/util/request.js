import axios from 'axios';
import {promise} from "ora"; //映入axios

const axi = axios.create({

  baseURL: 'http://192.168.202.151:9090/',
  timeout: 6000,  //请求6秒自动断开连接
  headers:{
    jwtToken:""
  },
  withCredentials:true,//要放行cookie  不然后端取session会产生一个新的session(基于cookie产生新的session)
})

//暴露 实例对象

export default axi;

axi.interceptors.request.use(res => {

  //不是登录  都要请求token
  if(res.url!='/user/ddlogin'){
    //取回jwtToken
    let jwtToken = window.localStorage.getItem("jwtToken");
    //如果token 有值得话  把token存入 响应header中
    //登录前没有token值 登录后值存在   但为什么取出来为null
    if (jwtToken) {
      res.headers.jwtToken = jwtToken;
    }
  }
  //请求 拦截器
  return res;
})


axi.interceptors.response.use(res => {
  // 响应拦截器
  var codes = res.data.code
  //后端返回响应
  if (codes != 200) {
    //打印。。
   alert(res.data.msg);
  }
  return res;
})
