<template>
  <div>


    <div style="margin-left:30%">
      <el-row :gutter="0">

        <el-col :span="4" >
          <el-button  @click="jmLoginStatus=true"   placeholder="登录注册店铺">登录注册店铺</el-button>
          <div class="grid-content bg-purple"></div>
        </el-col>


        <el-col :span="4">
          <el-input v-model="FindAllShopVo.userName" placeholder="绑定用户账号"></el-input>
          <div class="grid-content bg-purple"></div>
        </el-col>

        <el-col :span="4">
          <el-input v-model="FindAllShopVo.shopUserName" placeholder="店铺账号"></el-input>
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">

          <el-date-picker
            v-model="FindAllShopVo.shopLoginDateList"
            type="datetimerange"
            range-separator=""
            start-placeholder="登录时间段选择"
            end-placeholder="">
          </el-date-picker>
          <div class="grid-content bg-purple"></div>
        </el-col>

        <el-col :span="4">
          <el-input v-model="FindAllShopVo.shopIp" placeholder="店铺IP"></el-input>
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="shopSerch">确定查询</el-button>
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="ALLShoplist"
      border
      style="width: 100%"   >
      <el-table-column
        prop="shopUserName"
        label="店铺账号">
      </el-table-column>
      <el-table-column
        prop="shopLoginDate"
        label="登录时间">
      </el-table-column>
      <el-table-column
        prop="shopIp"
        label="店铺ip">
      </el-table-column>

<!--      <el-table-column
        prop="shopAuthorization"
        label="店铺授权码" width="50px">
      </el-table-column>-->

      <el-table-column
        prop="sparessV1"
        label="绑定的用户账号">
      </el-table-column>

      <el-table-column
        prop="returnCookie"
        label="返回的cookie"  show-overflow-tooltip >
      </el-table-column>

      <el-table-column
        prop="userTypess"
        label="账号类型:1京东   2拼多多   3淘宝">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button   @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button  @click="oneLogin(scope.row)" type="primary" size="mini">登录</el-button>
          <el-button  @click="deleteOne(scope.row)" type="danger" size="mini">删除</el-button>
<!--          <el-button type="primary" size="medium">删除</el-button>    -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="shopDialog"
      width="30%">

      <el-form   :model="shopDialogModel" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="店铺账号" prop="shopUserName">
          <el-input v-model="shopDialogModel.shopUserName" readonly></el-input>
        </el-form-item>

        <el-form-item label="登录密码(不修改别填)" prop="shopUserPassWrod">
          <el-input v-model="shopDialogModel.shopUserPassWrod"></el-input>
        </el-form-item>

        <el-form-item label="登录时间" prop="shopLoginDate">
          <el-input v-model="shopDialogModel.shopLoginDate" readonly></el-input>
        </el-form-item>


        <el-form-item label="店铺Ip" prop="shopIp">
          <el-input v-model="shopDialogModel.shopIp" readonly></el-input>
        </el-form-item>

        <el-form-item label="店铺授权码" prop="shopAuthorization">
          <el-input v-model="shopDialogModel.shopAuthorization"></el-input>
        </el-form-item>

        <el-form-item label="绑定用户账号" prop="sparessV1">
          <el-input v-model="shopDialogModel.sparessV1"></el-input>
        </el-form-item>

        <el-form-item label="返回的cookie" prop="returnCookie" >
          <el-input v-model="shopDialogModel.returnCookie"   ></el-input>
        </el-form-item>

        <el-form-item label="账号类型" prop="userTypess">
          <el-input v-model="shopDialogModel.userTypess"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateShopOne">修改</el-button>
          <el-button @click="NoUpadate">不修改退出</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!-- 分页插件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :page-size=this.FindAllShopVo.pageSize
      layout="sizes, prev, pager, next"
      :total=this.total>
    </el-pagination>



    <el-dialog
      title="京麦登录"
      :visible.sync="jmLoginStatus"
      width="30%"
        >
        <el-input v-model="shopLoginDate.userName"   placeholder="请输入账号"/>
        <el-input v-model="shopLoginDate.password"   placeholder="请输入密码"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="jmLoginStatus = false">取 消</el-button>
    <el-button type="primary" @click="shopLogin()">确 定</el-button>
  </span>
    </el-dialog>





  </div>
</template>
<script>
import axi from "../../util/request";

export default {
  name: "shop",
  data() {
    return {
      total: 0,
      shopDialog: false,
      ALLShoplist: [],
      shopDialogModel: {},
      jmLoginStatus:false,
      deleteShopeOne:{},
      shopLoginDate:{userName:"",password:""},
      rules: {
        shopUserName: {required: true, message: '店铺账号不能为空', trigger: 'blur'},
        userTypess: {required: true, message: '账号类型', trigger: 'blur'},
      },
      FindAllShopVo: {
        pageNum: 1,
        pageSize: 5,
        userName: '',
        shopUserName: '',
        shopIp: "",
        shopLoginDateList: [],
      }
    }
  },//数据结束
  methods: {
    //根据条件查询所有的店铺账号1
    findAllShop() {
      axi.post("/shop/findAllShop", this.FindAllShopVo).then(res => {
        if (res.data.code == 200) {
          this.ALLShoplist = res.data.data.list;
          this.total = res.data.data.total
        }
      })
    },

    handleSizeChange(val) {
      this.FindAllShopVo.pageSize = val
      this.findAllShop();
    },
    handleCurrentChange(val) {
      this.FindAllShopVo.pageNum = val
      this.findAllShop();
    },

    handleClick(row) {
      //row 中的这行属性
      this.shopDialogModel = row;
      this.shopDialogModel.shopUserPassWrod = '';
      this.shopDialog = true;
    },

    updateShopOne() {
      axi.post("/shop/updateOneShop", this.shopDialogModel).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          //修改成对话框 消失   刷新页面
          this.shopDialog = false;
          location.reload()
        }
      })
    },
    shopSerch(){
     this.findAllShop();
    },
    NoUpadate(){
      this.shopDialog = false;
    },

    shopLogin(){
        axi.post("/user/ddUrl",this.shopLoginDate).then(res=>{
              if(res.data.code==200){
                window.open(res.data.msg,'_blank');
                this.jmLoginStatus=false;
              }
        })
    },
    //一键登录~
    oneLogin(row){
         this.shopLoginDate.userName=row.shopUserName;
         this.shopLoginDate.password=row.shopUserPasswrod;
      axi.post("/user/ddUrl",this.shopLoginDate).then(res=>{
        if(res.data.code==200){
          window.open(res.data.msg,'_blank');
        }
      })
    },
    deleteOne(row){
         this.deleteShopeOne.shopId=row.shopId
         this.deleteShopeOne.sparessV1=row.sparessV1
      axi.post("/shop/deteleOneShop",this.deleteShopeOne).then(res=>{
        if(res.data.code==200){
          alert("删除成功");
          this.findAllShop();
        }
      })
    },


  },//方法结束

  created() {
    this.findAllShop();
  }


}
</script>

<style scoped>

</style>
