<template>
  <div >



          <el-form class="login-box"   :model="ruleForm" :rules="rules" ref="ruleForms" label-width="100px" >

            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="captcha">
              <el-input v-model="ruleForm.captcha"></el-input>
              <el-image  :src="ruleForm.imgsrc"  @click="restcaptcha"> </el-image>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="logindd">登录</el-button>
              <el-button @click="resetForm('ruleForms')">重置</el-button>
            </el-form-item>
          </el-form>

        </div>





  <!--
  <div>
          <form action="">
            用户账号<el-input placeholder="请输入用户名" v-model="user.username"/><br/>
            用户密码<el-input placeholder="请输入密码" v-model="user.password" show-password/><br/>
            <el-row>
              <div>
                验证码:<el-input placeholder="请输入验证码" v-model="user.captcha"/>
                <el-image  :src="user.imgsrc" @click="restcaptcha"/><br/>
              </div>
              <el-button   size="medium  "   @click="logindd" native-type="button" plain>登录</el-button>
            </el-row>
          </form>
          </div>
  -->


</template>


<script>
import axi from "../util/request";

export default {
  name: 'HelloWorld',

  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        captcha: "",
        imgsrc: "",
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度为5位数', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    restcaptcha() {  //刷新验证码
      this.ruleForm.imgsrc = axi.defaults.baseURL + "/user/captcha.jpg?t=" + new Date().getTime();
    },
    logindd() {
      //验证  $refs=ref 属性
      this.$refs['ruleForms'].validate((valid) => {
        if(valid){
          //登录dd
          axi.post("/user/ddlogin", {"userName": +this.ruleForm.username,
            "passWrod": this.ruleForm.password,
            "captcha":this.ruleForm.captcha}).then(res => {
            //获取后台传来的 token  存在就传入 不存在就不存入
            if (res.data.data.jwtToken) {
              //跳转路由
              window.localStorage.setItem("jwtToken", res.data.data.jwtToken)
              this.$router.push({name: "home"})
            }
          })
        }
      })
    },



  },


  mounted(){
    this.restcaptcha();
  }




  /*data() {
    return {
      user: {
        username: "",
        password: "",
        captcha: "",
        imgsrc: "",
      },
    }
  },

  methods: {
    restcaptcha() {  //刷新验证码
      this.user.imgsrc = axi.defaults.baseURL + "/user/captcha.jpg?t=" + new Date().getTime();
    },
    logindd() {
      //登录dd

      axi.post("/user/ddlogin", {"userName": this.user.username, "passWrod": this.user.password}).then(res => {
        //获取后台传来的 token  存在就传入 不存在就不存入
        if (res.data.data.jwtToken) {
          //跳转路由
          window.localStorage.setItem("jwtToken", res.data.data.jwtToken)
          this.$router.push({name: "home"})
        }
      })
    },
  },

  mounted(){
    this.restcaptcha();
  }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin:120px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
</style>
