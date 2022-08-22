<template>
  <div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="用户账号" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="用户密码" prop="userPassWrod">
        <el-input v-model="ruleForm.userPassWrod" show-password></el-input>
      </el-form-item>

      <el-form-item label="真实姓名" prop="sparessV1">
        <el-input v-model="ruleForm.sparessV1"></el-input>
      </el-form-item>


      <el-select @visible-change="findAllFrim" v-model="ruleForm.firmId" placeholder="请选择公司">
        <el-option
          v-for="item in this.optionsFirms"
          :key="item.firmId"
          :label="item.firmName"
          :value="item.firmId">
        </el-option>
      </el-select>

      <el-select @visible-change="findAllDept" v-model="ruleForm.deptId" placeholder="请选择部门">
        <el-option
          v-for="item in this.optionsDepts"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId">
        </el-option>
      </el-select>

      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>

      <el-button @click="createDept">创建部门</el-button>
      <el-button @click="createFirm">创建公司</el-button>
    </el-form>

    <el-dialog
      title="创建部门"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-input v-model="createdeptName" placeholder="请输入部门名称"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createdeptNameOne">确 定</el-button>
   </span>
    </el-dialog>


    <el-dialog
      title="创建公司"
      :visible.sync="firmDialogVisible"
      width="30%"
      center>
      <el-input v-model="createdFirmName" placeholder="请输入公司名称"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="firmDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createfirmOne">确 定</el-button>
   </span>
    </el-dialog>



  </div>
</template>

<script>
import axi from "../../util/request";

export default {
  name: "homeinset",

  data() {
    return {
      optionsDepts: [],
      deptvales: "",
      optionsFirms: [],
      firmvales: "",
      createdeptName: "",
      centerDialogVisible: false,
      createdFirmName:"",
      firmDialogVisible: false,
      ruleForm: {},
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 12, message: '长度在 4到 12 位', trigger: 'blur'}
        ],
        userPassWrod: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 16, message: '长度在 4到 16 位', trigger: 'blur'}
        ]
      }
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axi.post("/user/AddUser", this.ruleForm).then(res => {
            //后台返回失败 res.data.code!=200
            if (res.data.code==200){
               alert("创建成功");
              this.ruleForm="";
            }
          })
        } else {
          alert("请检查参数,添加失败")
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    findAllDept() {
      axi.get("/dept/findAllDept").then(res => {
        this.optionsDepts = res.data.data;
      })
    },

    //发现所有公司
    findAllFrim() {
      axi.get("/firm/findAllFirm").then(res => {
        this.optionsFirms = res.data.data;
      })
    },

    //打开创建部门 对话框
    createDept() {
      this.centerDialogVisible = true;
    },
    createFirm(){
      this.firmDialogVisible=true;
    },


    //创建部门
    createdeptNameOne() {
      if (window.confirm("确定创建该部门?")) {
        axi.get("/dept/createDept?firmName=" + this.createdeptName).then(res => {
          if (res.data.code == 200) {
            this.createdeptName = "";
            this.centerDialogVisible = false;
          }
        })
      }
    },

    createfirmOne(){
      //createdFirm 创建公司
      if (window.confirm("确定创建该部门?")){
        axi.get("/firm/addFirm?firmName="+this.createdFirmName).then(res=>{
          if (res.data.code == 200) {
            this.createdFirmName = "";
            this.firmDialogVisible = false;
          }
        })
      }

    },

  },//方法结束


}
</script>

<style scoped>

</style>
