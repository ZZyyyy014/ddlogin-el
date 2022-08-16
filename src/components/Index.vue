<template>

    <el-container class="home-container">
        <!--   头部区     -->
      <el-header>Header</el-header>

      <el-container>
<!--    左边外侧区    -->
        <el-aside :width="iscollapse ? '64px': '200px' ">
          <div  class="buttonssss" @click="buttonssss" >----</div>
          <el-menu      :collapse-transition="false"  unique-opened  :collapse="iscollapse" router >
<!--         1级菜单    -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户模块</span>
              </template>

              <el-menu-item index="/home">
                <template slot="title">
                  <!--               图标  -->
                  <i class="el-icon-menu"></i>
                  <!--               文本 -->
                  <span>用户修改删除</span>
                </template>
              </el-menu-item>

              <el-menu-item index="/homeinset">
                <template slot="title">
                  <!--               图标  -->
                  <i class="el-icon-menu"></i>
                  <!--               文本 -->
                  <span>用户添加</span>
                </template>
              </el-menu-item>
            </el-submenu>

<!--          这是标识侧边栏的id    -->
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>店铺模块</span>
                  </template>
<!--             index 开起来了路由跳转   代表路由路径     -->
                  <el-menu-item index="2-1">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>店铺操作</span>
                    </template>
                  </el-menu-item>


                </el-submenu>

                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>订单模块</span>
                    </template>
                    <el-menu-item index="/order">
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>订单操作</span>
                      </template>
                    </el-menu-item>
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

export default {
  name: "index",
  data(){
    return{
      iscollapse:false,
    }
  },
methods:{
    //侧边栏收缩
  buttonssss(){
     this.iscollapse=!this.iscollapse  ;
  }

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
