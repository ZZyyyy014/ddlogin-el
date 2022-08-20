<template>

    <el-container class="home-container">
        <!--   头部区     -->
      <el-header>
        <el-row >
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6">
            <div style="margin-left:10%">
            <el-button type="danger"  @click="loginOut">退出</el-button>
            </div>
            <div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-header>

      <el-container>
<!--    左边外侧区    -->
        <el-aside :width="iscollapse ? '64px': '200px' ">
          <div  class="buttonssss" @click="buttonssss" >导航栏</div>
          <el-menu
            style="height: 100%"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            :collapse-transition="false"  unique-opened  :collapse="iscollapse" router >

              <el-submenu  v-for="item in routerss"  :index="item.oneId+''" :key="item.oneId"  >
                <template slot="title">
                <div slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.oneMenuName }}</span>
                </div>
                </template>

               <div v-for="items in item.twoMenuRouterList"  :key="item.twoMenuId" >
                 <el-menu-item     :index="items.twoMenuRouter+''">
                   <div slot="title">
                     <i class="el-icon-menu"></i>
                     <span>{{items.twoMenuRouterName }}</span>
                   </div>
                  </el-menu-item>
               </div>

            </el-submenu>



          </el-menu>
        </el-aside>
<!--      右边展示部分  -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

</template>



<script>
import axi from "../util/request";

export default {
  name: "index",
  data(){
    return{
      iscollapse:false,
      routerss:[],
    }
  },
methods:{
    //侧边栏收缩
  buttonssss(){
     this.iscollapse=!this.iscollapse;
  },
  //退出
  loginOut(){
    //让 token 为空
    if(window.confirm("是否退出？")){
      window.localStorage.setItem("jwtToken",'');
      this.$router.push({name:'HelloWorld'});
    }

  },
},//方法结束

  //生命周期 从后台取来  资源路径 看是有该路径
created() {
  axi.get("/user/findLogRoter").then(res=>{
    //查询成功
    if(res.data.code==200){
      //项目结构  返回的数据结构[oneMenu:'',oneMenuName:'',twoMenuRouterList:[twoMenuRouter:'',twoMenuRouterName:''] ]
        this.routerss=res.data.data
    }

  })

}

}
</script>



<style  scoped>

.buttonssss{
  background-color: #333333 ;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #D3DCE6;
  letter-spacing: 0.2em;
 cursor: pointer;
}


.home-container{
  height: 100%;
}

</style>
