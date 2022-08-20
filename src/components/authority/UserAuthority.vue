<template>
  <div>


  <div  >
    <el-row >
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-input style="width: 300px"  placeholder="用户账号"></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-input  style="width: 300px" placeholder="用户真实姓名"></el-input>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-input  style="width: 300px" placeholder="公司名称"></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-input  style="width: 300px" placeholder="部门名称"></el-input>
        </div>
      </el-col>
          <el-button style="margin-left: 5.5%" type="primary" >确定查询</el-button>
    </el-row>

  </div>


    <el-table
      :data="this.findAllShiro"
      style="width: 100%"
      border
       >
      <el-table-column
        prop="userName"
        label="用户账号"
        >
      </el-table-column>
      <el-table-column
        prop="sparessV1"
        label="用户真实姓名"
        >
      </el-table-column>

      <el-table-column
        prop="Ip"
        label="用户Ip地址"
        >
      </el-table-column>
      <el-table-column
        prop="firmName"
        label="所在公司">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="所在部门">
      </el-table-column>

      <el-table-column
        prop="roleRemark"
        label="权限名称">
      </el-table-column>

      <el-table-column label="操作">
        <template  slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

  <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50,100]"
      :page-size=this.FindAllShiroBean.pageSize
      layout="sizes, prev, pager, next"
      :total=this.total>
    </el-pagination>
  </div>


    <el-dialog    :visible.sync="dialogFormVisible">

      <el-form  label="活动名称" :model="FindAllShiroBean" >

            <el-form-item label="用户账号" :label-width="formLabelWidth">
              <el-input v-model="FindAllShiroBean.userName"  readonly></el-input>
            </el-form-item>



          <el-form-item label="用户真实姓名" :label-width="formLabelWidth">
            <el-input v-model="FindAllShiroBean.sparessV1"  ></el-input>
          </el-form-item>



        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-select    v-model="FindAllShiroBean.firmName"  @focus="findALLFirm()"    placeholder="请选择公司">
            <el-option  v-for="item in firmList" :label="item.firmName" :value="item.firmName" :key="item.frimId" >
            </el-option>
          </el-select>


        </el-form-item>

        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-select    v-model="FindAllShiroBean.deptName"  @focus="findALLDept()"    placeholder="请选择公司">
            <el-option  v-for="item in deptList" :label="item.deptName" :value="item.deptName" :key="item.deptId" >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select      :label="FindAllShiroBean.roleId" v-model="FindAllShiroBean.roleRemark"  @focus="findALLRole()"    placeholder="请选择公司">
            <el-option  v-for="item in roleList" :label="item.roleRemark" :value="item.roleRemark" :key="item.roleId" >
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateShiroOne()">确 定</el-button>

      </div>
    </el-dialog>







  </div>
</template>

  <script>
    import axi from "../../util/request";

    export default {
      name: "Authority",
      data(){
        return{
          dialogFormVisible:false,
          formLabelWidth:'120px',
          findAllShiro:[],
          total:0,
          deptList:[],
          firmList:[],
          roleList:[],
          FindAllShiroBean:{
            pageNum:1,
            pageSize:5,
            userName:'',
            sparessV1:'',
            firmName:'',
            deptName:'',
          },
        }
      },//数据结束
      methods:{
        handleSizeChange(val) {
          this.FindAllShiroBean.pageSize = val
          this.findAllshiroList();
        },
        handleCurrentChange(val) {
          this.FindAllShiroBean.pageNum=val
          this.findAllshiroList();
        },

        findAllshiroList(){
          axi.post("/shiro/findAllShrio",this.FindAllShiroBean).then(res=>{
            if (res.data.code==200){
              this.findAllShiro=res.data.data.list;
              this.total=res.data.data.total;
            }
          })
        },
        handleEdit(index,row){
          this.dialogFormVisible=true;
          this.FindAllShiroBean=row;
        },
        handleDelete(index,row){
        },

        //修改时候  点击公司查询 所有公司 展示
        findALLFirm(){
          axi.get("/firm/findAllFirm").then(res=>{
            if(res.data.code==200){
              this.firmList=res.data.data;
            }
          })
        },

        //修改时候 查询所有部门
        findALLDept(){
         axi.get("/dept/findAllDept").then(res=>{
           if(res.data.code==200){
             this.deptList=res.data.data;
           }
         })
        },
        //修改 查询所有管理员
        findALLRole(){
            axi.get("/shiro/findALLRoleList").then(res=>{

              if(res.data.code==200){
                this.roleList=res.data.data;
              }
            })
        },
        updateShiroOne(){
          axi.post("/shiro/updateShiroOne",this.FindAllShiroBean).then(res=>{

            if(res.data.code==200){
              this.dialogFormVisible=false;
              location.reload();
            }

          })
        },

      },//方法结束

      //创建组件时候 触发冲后台取出数据查询
      created() {
        this.findAllshiroList();
      },
    }
  </script>


<style scoped>

</style>
