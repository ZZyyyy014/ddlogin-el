<template>
  <div>


    <div style="margin-left: 350px;height: 100px;width: 100% ">

      <div style="height: 5px;width: 5% " >
        <el-date-picker
          style=" margin-left:143px; width: 200px "
          v-model="orderLike.orderdateList"
          type="daterange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份" unlink-panels>
        </el-date-picker>
    </div>
      <input v-model="orderLike.orderNumber" placeholder="订单号"></input>
      <input v-model="orderLike.customerTel" placeholder="手机号码"></input>
      <input v-model="orderLike.expressageCode" placeholder="快递单号"></input>
      <input v-model="orderLike.customerName" placeholder="联系人姓名"></input>
      <input v-model="orderLike.shopUserName" placeholder="店铺账号"></input>
      <button @click="findLikeALLOrder">点击查询</button>
    </div>


      <el-table size="medium"
                :data="orderList"
                border
                style="width: 100%">
        <el-table-column
          prop="orderNumber"
          label="订单号"
        >
        </el-table-column>
        <el-table-column
          prop="orderDate"
          label="订单时间"
        >
        </el-table-column>

        <el-table-column
          prop="customertel"
          label="手机号码"
        >
        </el-table-column>

        <el-table-column
          prop="expressagecode"
          label="快递单号"
        >
        </el-table-column>

        <el-table-column
          prop="customername"
          label="联系人姓名"
        >
        </el-table-column>
        <el-table-column
          prop="shopUserName"
          label="店铺账号"
        >
        </el-table-column>
      </el-table>


      <el-col :span="6">
        <el-pagination
          style="height:0px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50]"
          :page-size=orderLike.likepageSize
          layout="sizes, prev, pager, next"
          :total=this.total>
        </el-pagination>
      </el-col>


      <el-col :span="6">
          <el-button >测试</el-button>
      </el-col>
<!--    <el-pagination
      style="height:0px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :page-size=orderLike.likepageSize
      layout="sizes, prev, pager, next"
      :total=this.total>
    </el-pagination>-->

  </div><!--结束 div-->
</template>

<script>
import axi from "../../util/request";

export default {
  name: "order",
  data() {
    return {
      orderList: [],
      total: 0,
      orderLike: {
        orderNumber: "",
        orderdateList:[],//值为 数组    开始 结束
        customerName: "",
        customerTel: "",
        expressageCode: "",
        shopUserName:"",
        liekpageNum:1,
        likepageSize:5,
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
      console.log(this.orderLike)
      axi.post("/order/findLikeALLOrder",this.orderLike).then(res => {
        this.orderList = res.data.data.list
        this.total = res.data.data.total
        }
      )
    },

  },//方法结束


  //创建完成 从后台取数据
  mounted() {
     this.findLikeALLOrder();
  }


}
</script>

<style scoped>

</style>
