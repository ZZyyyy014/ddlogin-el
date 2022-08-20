<template>
  <div>
    <div>

      <el-radio-group style="height: 64px">
        <el-col :span="6">
          <el-date-picker
            v-model="orderLike.orderdateList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份" unlink-panels>
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-input v-model="orderLike.orderNumber" placeholder="订单号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="orderLike.customerTel" placeholder="手机号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="orderLike.expressageCode" placeholder="快递单号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="orderLike.customerName" placeholder="姓名"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="orderLike.shopUserName" placeholder="店铺账号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="findLikeALLOrder">点击查询</el-button>
        </el-col>
      </el-radio-group>
    </div>

    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="orderNumber" label="订单号"></el-table-column>
      <el-table-column prop="customertel" label="手机号码"></el-table-column>
      <el-table-column prop="expressagecode" label="快递单号"></el-table-column>
      <el-table-column prop="customername" label="联系人姓名"></el-table-column>
      <el-table-column prop="shopUserName" label="店铺账号"></el-table-column>
      <el-table-column prop="orderDate" label="订单时间"></el-table-column>
    </el-table>

    <div>
      <el-radio-group>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="5"
          layout="sizes, prev, pager, next"
          :total="this.total">
        </el-pagination>
      </el-radio-group>


      <el-button @click="AddListOrderorderDialog">批量添加订单(json格式)</el-button>

      <el-dialog
        title="提示"
        width="30%"
        :visible.sync="orderDialog"
      >
        <input style="width: 500px;height: 50px" v-model="AddOrderListss" placeholder="请输入多个订单json"></input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialog = false">取 消</el-button>
        <el-button @click="addListOrderNull">重置</el-button>
        <el-button type="primary" @click="addListOrder">确 定</el-button>
         </span>
      </el-dialog>

    </div>
  </div>

</template>

<script>
import axi from "../../util/request";

export default {
  name: "order",
  data() {
    return {
      orderList: [],
      total: 0,
      orderDialog: false,
      AddOrderListss: [],
      orderLike: {
        orderNumber: "",
        orderdateList: [],//值为 数组    开始 结束
        customerName: "",
        customerTel: "",
        expressageCode: "",
        shopUserName: "",
        liekpageNum: 1,
        likepageSize: 5,
      }
    }
  },//数据 结束
  methods: {
    handleSizeChange(val) {
      //当前每页多少条数据 10
      this.orderLike.likepageSize = val
      this.findLikeALLOrder()
    },
    handleCurrentChange(val) {
      //当前多少业数
      this.orderLike.liekpageNum = val
      this.findLikeALLOrder()
    },
    /* //分页查询  ~~ 也可以修改  模糊查询
     findAllOrder() {
       axi.get("/order/findALLOrder?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize).then(res => {
         this.orderList = res.data.data.list
         this.total = res.data.data.total
       })
     },*/
    //分页模糊查询
    findLikeALLOrder() {
      axi.post("/order/findLikeALLOrder", this.orderLike).then(res => {
          this.orderList = res.data.data.list
          this.total = res.data.data.total
        }
      )
    },

    AddListOrderorderDialog() {
      this.orderDialog = true;
    },
    //把对话框的 数据为空
    addListOrderNull(){
      this.AddOrderListss=[];
    },
    //调用后台方法 添加
    addListOrder() {
      axi({
        url: "/order/insertListOrder",
        method: "post",
        data: this.AddOrderListss,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.AddOrderListss = [],
          this.orderDialog = false,
            alert("添加成功")
            //刷新页面
            location.reload();
        }
      })
    },

  },//方法结束


  //创建完成 从后台取数据
  mounted() {
    this.findLikeALLOrder();
  }


}
</script>
