<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" :isShowTable="isShowTable"></CategorySelect>
    </el-card>

    <el-card v-show="isShowTable">

      <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>

      <el-table style="width:100%;margin-top: 10px;" border :data="attrList">

        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

        <el-table-column prop="attrName" label="属性值名称" width="250"></el-table-column>

        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{row,$index}">
            <el-tag type="success" style="margin:0 10px;" v-for="(attrValue, index) in row.attrValueList"
              :key="attrValue.id">{{ attrValue.valueName }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="todo" label="操作" width="250">
          <template slot-scope="{row,$index}">
            <el-button style="margin-right: 20px;" type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">修改</el-button>

            <el-popconfirm title="确定删除这个属性吗？" :key="$index" @onConfirm="deleteAttr(row)"> <!-- 气泡确认框, 需要唯一标识-->
              <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <el-card v-show="!isShowTable">

      <el-form :inline="true">
        <el-form-item label="属性名" :model="attrInfo">
          <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
        :disabled="!attrInfo.attrName.trim().length">添加属性值</el-button>

      <el-table style="width:100%;margin: 20px 0;" border :data="attrInfo.attrValueList">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

        <el-table-column prop="prop" label="属性值名称" width="width">
          <template slot-scope="{row,$index}">
            <el-input v-model="row.valueName" placeholder="请输入属性值名称" v-if="row.flag" size="mini"
              @blur="toLook(row, $index)" @keyup.native.enter="toLook(row, $index)" :ref="$index"></el-input>
            <span @click="" v-else>{{ row.valueName }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row,$index}">
            <el-button type="warning" style="margin-right: 20px;" icon="el-icon-edit" size="mini"
              @click="updateAttrValue(row, $index)">修改</el-button>
            <el-popconfirm title="确定删除这个属性值吗？" :key="$index" @onConfirm="deleteAttrValue($index)"> <!-- 气泡确认框, 需要唯一标识-->
              <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-popover style="margin-right: 20px;" placement="top-start" title="" width="200" trigger="hover"
        content="点击保存这次更改才生效哦">
        <el-button slot="reference" type="primary" @click="saveAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
      </el-popover>

      <el-popover style="margin-right: 20px;" placement="top-start" title="" width="200" trigger="hover"
        content="点击取消这次更改就撤回了">
        <el-button @click="isShowTable = true" slot="reference">取消</el-button>
      </el-popover>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash里的深拷贝
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'Attr',
  data() {
    return {
      // 收集相应的一级二级三级分类的id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 平台属性数据
      attrList: [],
      // 控制添加属性界面的显示与隐藏
      isShowTable: true,
      // 收集新增属性或修改已有属性时使用的
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [

        ],
        categoryId: 0, // 3级分类id
        categoryLevel: 3, // 服务器需要区分是几级id
      }
    }
  },
  methods: {
    // 自定义事件的回调
    getCategoryId(cForm) {
      const { category1Id, category2Id, category3Id } = cForm;
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
      // 3个id都有时发请求获取数据
      if (this.category3Id) {
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id);
      this.attrList = result.data;
    },
    // 添加属性值的回调
    addAttrValue() {
      // 向属性值的数组里添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,  // 添加属性值时还没有id,但是在新增属性值时是有id的
        valueName: '', // 属性值
        flag: true,  // 添加一个属性控制查看模式与编辑模式
      });
      // 添加一个属性值时让那个表单自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      // 切换table显示与隐藏
      this.isShowTable = false;
      // 每次需要清空数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [
        ],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 更新一个属性时
    updateAttr(row) {
      this.isShowTable = false;
      // 修改时也要给每个对象添加flag属性
      row.attrValueList.forEach(item => {
        item.flag = false
      });
      // 数据较复杂使用深拷贝才能解决问题
      this.attrInfo = cloneDeep(row);
    },
    // 切换为查看模式(失去焦点时)
    toLook(row, index) {
      // 内容非空,可以切换
      if (row.valueName.trim() != '') {
        row.flag = false;
      } else {
        // 内容为空,删除,提示信息
        this.$message({
          message: '输入不能为空哦',
          type: 'error'
        });
        this.deleteAttrValue(index);
      }
    },
    // 更新一个属性值时 
    updateAttrValue(row, index) {
      row.flag = true;
      // 表单自动聚焦
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除一个属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 删除一个属性
    async deleteAttr(row) {
      const result = await this.$API.attr.reqDeleteAttr(row.id);
      if(result.code == 200) {
        // 成功删除时，弹出提示信息并且重新拉取列表数据
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getAttrList();
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        });
      }
    },
    // 点击保存按钮时，向服务器发请求添加属性
    async saveAttr() {
      // 发请求前先整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item) => {
        delete item.flag;
        return true;
      });
      // 发请求
      try {
        await this.$API.attr.reqAddAttr(this.attrInfo);
        this.isShowTable = true; //成功后需要展示列表
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        // 再次拉取数据
        this.getAttrList();
      } catch (error) {
        this.$message({
          message: '保存失败',
          type: 'error'
        });
      }
    }
  },
}
</script>

<style scope>

</style>
