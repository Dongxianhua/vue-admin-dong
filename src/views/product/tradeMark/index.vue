<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0;" @click="showDialog">添加</el-button>

    <!-- 表格组件
        data:表格组件将来需要展示的数据----数组类型
        border:是给表格添加边框
        column属性
        1abel:显示标题
        width:对应列的宽度
        align:
        标题的对齐方式
    -->
    <el-table style="width:100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>

      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>

      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="图裂了" style="height: 100px;width: 100px;">
        </template>
      </el-table-column>

      <el-table-column prop="todo" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器
        当前第几页、数据总条数、每一页展示条数、连续页码数
        @size-change="handlesizechange"
        @current-change="handlecurrentchange"

        current-page:代表的是当前第几页
        total:代表分页器一共需要展示数据条数
        page-size:代表的是每一页需要展示多少条数据
        page-sizes:可以设置每一页展示多少条数据
        layout:可以实现分页器布局
        pager-count:按钮的数量
    -->
    <el-pagination style="margin-top: 20px;text-align: center;" :total="total" :current-page="page" :page-size="limit"
      :pager-count="7" :page-sizes="[3, 5, 10]" @current-change="handlecurrentchange" @size-change="handlesizechange"
      layout="prev,pager,next,jumper,->,sizes,total"></el-pagination>

    <!-- 对话框 -->
    <el-dialog :title="tradeMarkForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- model属性表示收集表单数据到一个对象 -->
      <el-form style="width: 80%;" :model="tradeMarkForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tradeMarkForm.tmName"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px" style="margin-left: 11px;" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">

            <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data() {
    return {
      // 分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示数据
      list: [],
      // 对话框是否显示
      dialogFormVisible: false,
      // 对话框收集表单信息
      tradeMarkForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证的规则
      rules: {
        // 品牌名称的验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        // 品牌名称的验证规则
        logoUrl: [
          { required: true, message: '请上传logo图片' }
        ],
      }
    }
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 弹出对话框（添加时）
    showDialog() {
      this.dialogFormVisible = true;
      this.tradeMarkForm = { tmName: '', logoUrl: '' }
    },
    // 分页器当前页改变时
    handlecurrentchange(newPage) {
      // 修改当前页，然后再发请求
      this.page = newPage;
      this.getPageList();
    },
    // 分页器每页展示多少条数据改变时
    handlesizechange(myLimit) {
      this.limit = myLimit;
      this.getPageList();
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      this.tradeMarkForm.logoUrl = res.data;
    },
    // 上传图片前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加或修改品牌
    addOrUpdateTradeMark() {
      // 表单验证全部通过再执行相关业务
      this.$refs.ruleForm.validate(async (success) => {
        // success属性是一个布尔值，ture表示表单全部通过验证
        if (success) {
          this.dialogFormVisible = false;
          // 发请求添加或修改品牌
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tradeMarkForm);
          if (result.code == 200) {
            this.$message({
              message: this.tradeMarkForm.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            });
            // 添加或修改成功后需要再发请求刷新列表
            this.getPageList();
          }
        } else {
          this.$message({
            message: '表单验证未通过，提交失败',
            type: 'error'
          });
          return false;
        }
      });
    },
    // 修改品牌信息
    updateTradeMark(row) {
      // row参数是当前用户选中的品牌信息
      this.dialogFormVisible = true;
      this.tradeMarkForm = { ...row }
    },
    // 删除品牌信息
    deleteTradeMark(row) {
      // 弹窗
      this.$confirm(`确定删除该品牌吗? (品牌名为${row.tmName})`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 用户点击确定时触发
        // 发请求删除品牌
        let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          if (this.list) {
            // 当前页全部删除完了时去前一页
            this.page = this.page - 1;
            this.getPageList();
          }
          // 删除成功后需要再发请求刷新列表
          this.getPageList();
        }
      }).catch(() => {
        // 用户点击取消时触发
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
}
</script>

<style scope>
/* 上传图片的样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
