<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个头部card -->
          <Detail title="总销售额" count="￥ 126564">
            <template slot="charts">
              <span>周同比&nbsp;56.67% <svg t="1672820929404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4265" width="20" height="20"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="4266"></path></svg></span>
              <span>日同比&nbsp;19.96% <svg t="1672821191084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7810" width="20" height="20"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="7811"></path></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12473</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个头部card -->
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量 1243</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个头部card -->
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个头部card -->
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span>周同比&nbsp;12% <svg t="1672820929404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4265" width="20" height="20"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="4266"></path></svg></span>
              <span>日同比&nbsp;11% <svg t="1672821191084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7810" width="20" height="20"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="7811"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail';
import lineCharts from './LineChart';
import barCharts from './barChart';
import progressChart from './progressChart';

export default {
  name: '',
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressChart
  }
}
</script>

<style scope>

</style>
