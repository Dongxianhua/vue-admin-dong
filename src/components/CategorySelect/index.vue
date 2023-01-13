<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" :model="cForm">
            <el-form-item label="一级分类">
                <el-select :disabled="!isShowTable" placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                    <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="!isShowTable" placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
                    <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="!isShowTable" placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
                    <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    data() {
        return {
            // 一级分类列表数据
            list1:[],
            // 二级分类列表数据
            list2:[],
            // 三级分类列表数据
            list3:[],
            // 收集相应的一级二级三级分类的id
            cForm:{
                category1Id:'',
                category2Id:'',
                category3Id:''
            }
        }
    },
    props:['isShowTable'],  // 
    mounted() {
        // 组件挂载完毕就获取一级分类列表数据
        this.getCategory1List();
    },
    methods: {
        // 发请求获取一级分类列表数据
        async getCategory1List() {
            let result = await this.$API.attr.reqCategory1List();
            if(result.code == 200) {
                this.list1 = result.data; 
            }
        },
        // 发请求获取二级分类列表数据（一级列表数据改变时触发）
        async handler1() {
            // 清除二级三级列表数据
            this.cForm.category2Id = '';
            this.list3 = '';
            this.cForm.category3Id = '';

            this.$emit('getCategoryId',this.cForm);
            let result = await this.$API.attr.reqCategory2List(this.cForm.category1Id);
            if(result.code == 200) {
                this.list2 = result.data;
            }
        },
        // 发请求获取三级分类列表数据（二级列表数据改变时触发）
        async handler2() {
            // 清除三级列表数据
            this.cForm.category3Id = '';

            this.$emit('getCategoryId',this.cForm);
            let result = await this.$API.attr.reqCategory3List(this.cForm.category2Id);
            if(result.code == 200) {
                this.list3 = result.data;
            }
        },
        // 三级分类事件回调
        handler3() {
            this.$emit('getCategoryId',this.cForm);
        }
    },
}
</script>

<style scope>

</style>
