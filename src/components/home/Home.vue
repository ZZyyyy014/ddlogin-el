<template>
  <div>
          <el-table @selection-change="selectMore"
                    :data="findAlllist.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                    border style="width: 100%">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>

            <el-table-column
              prop="firmName"
              label="公司名称"
            >
            </el-table-column>


            <el-table-column
              prop="deptName"
              label="部门">
            </el-table-column>



            <el-table-column
              prop="userName"
              label="用户名">
            </el-table-column>

            <el-table-column
              prop="userRealName"
              label="员工真实名称">
            </el-table-column>


            <el-table-column
              prop="ip"
              label="所在ip">
            </el-table-column>


            <el-table-column
              prop="loginDate"
              label="登录时间">
            </el-table-column>


            <el-table-column >
              <template slot="header"   slot-scope="scope">
                <el-input
                  v-model="search"
                  placeholder="当前页面用户名称搜索"/>
              </template>

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="upDialog(scope.$index, scope.row)">编辑
                </el-button>

                <el-button
                  size="mini"
                  type="danger"
                  @click="deletuserOne(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>

          <el-dialog title="员工个人信息" :visible.sync="dialogUpOpen">
            <el-form :model="this.dialogUpData">

              <el-form-item label="用户账号"  >
                <el-input v-model="dialogUpData.userName"   :readonly="true" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="员工真实姓名" >
                <el-input v-model="dialogUpData.userRealName" autocomplete="off"></el-input>
              </el-form-item>

<!--              <el-form-item label="所在部门" >
                <el-input v-model="dialogUpData.deptName" autocomplete="off"></el-input>
              </el-form-item>-->

              <span  >所在公司</span>
              <el-select  @visible-change="findAllFrim" v-model="dialogUpData.firmName" placeholder="所在公司">
                <el-option
                  v-for="item in this.optionsFirms"
                  :key="item.firmId"
                  :label="item.firmName"
                  :value="item.firmName">
                </el-option>
              </el-select>

              <span>部门</span>
              <el-select  @visible-change="findAllDept" v-model="dialogUpData.deptName" placeholder="所在部门">
                  <el-option
                    v-for="item in this.optionsDepts"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptName">
                  </el-option>
                </el-select>

            <div  class="dialog-footer">
              <el-button @click="dialogUpOnefalse">取 消</el-button>
              <el-button type="primary" @click="dialogUpOne">确 定</el-button>
            </div>

           </el-form>
          </el-dialog>


          <div class="inline-block">
            <el-pagination  style="height:40px;"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size=this.pagesize
                            layout="sizes, prev, pager, next"
                            :total=this.total>
            </el-pagination>
            <el-button    @click="deleteUserList"  type="danger">删除上面所选(多选)</el-button>
          </div>

  </div>
</template>





<script>
import axi from "../../util/request";



export default {
  name: "home",
  data() {
    return {
      findAlllist: [],
      checks: [],
      search:"",
      pagesize:10,
      pageNum:1,
      total:0,
      dialogUpOpen: false,
      dialogUpData: {
        //部门名称
        deptName:"",
        //部门Id
        deptId:"",
        userId:"",
        userName:"",
        userRealName:"",
        // 所在公司id
        sparessV1:"",
        //所在公司名称
        firmName:"",
      },
      dialogFormVisible: false,
      optionsDepts:[],
      optionsFirms:[],

    }
  },//参数结束

components:{//组件
},


  methods: {

    deletuserOne(index,row){
      if (window.confirm("確定刪除该选用户(单选)")) {
        axi.get("/user/deleteOneUser?userId=" + this.findAlllist[index].userId).then(res => {
          if(res.data.code==200){
            alert("删除成功");
          }
          //刷新页面 按了F5
          location.reload();
        })
      }
    },

    //删除多条数据 多选
    deleteUserList() {
      console.log(this.checks)
      var selects = [];
      this.checks.forEach(
        (item) => {
          selects.push(item.userId)
        }
      )
      if (selects.length) {
        if (window.confirm("確定刪除所选用户(多选)？")) {
          axi.get("/user/deleteListUser?userId=" + selects).then(res => {
            if(res.data.code==200){
              alert("删除成功");
            }
            //刷新页面 按了F5
            location.reload();
          })
        }
      }else {
        this.$message.error("请选择至少1条数据");
      }
    },

    selectMore(val) {
      this.checks = val;
    },//返回的是选择对象的本身,



    handleSizeChange(val) {
          //当前每页多少条数据 10
          this.pagesize=val
          this.prevClick();
      },
    handleCurrentChange(val) {
      //当前多少业数
      this.pageNum=val
      this.prevClick();
    },

    //从后台获取数据
    prevClick(){
      axi.get("/user/findAllLogin?pageNum="+this.pageNum+"&pageSize="+this.pagesize).then(res => {
        if (!res.data.state) {
          this.findAlllist = res.data.data.list
          this.total=res.data.data.total
        }
      })
    },

    upDialog(index,row){
      this.dialogUpOpen=true;
      this.dialogUpData=row;
    },

    dialogUpOne(){
      axi.post("/user/updateUserFindAllVo",this.dialogUpData).then(res=>{
        if(res.status==200){
          this.dialogUpOpen=false;
        }
      });
      // 刷新页面
       location.reload();
    },

    // 取消改变 要重新加载 应为v-model 是双向绑定的
    dialogUpOnefalse(){
      this.dialogUpOpen=false;
      location.reload();
    },

    //发现所有的公司
    findAllDept(){
      axi.get("/dept/findAllDept").then(res=>{
        this.optionsDepts=res.data.data;
      })
    },

    //发现所有公司
    findAllFrim(){
    axi.get("/firm/findAllFirm").then(res=>{
        this.optionsFirms=res.data.data;
      })
    }





  },//方法结束


    created() {
    axi.get("/user/findAllLogin?pageNum="+this.pageNum+"&pageSize="+this.pagesize).then(res => {
      if (!res.data.state) {
        this.findAlllist = res.data.data.list
        this.total=res.data.data.total
      }
    })
  }

}
</script>


<style scoped>

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height:60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;

}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>
