<template>
    <div class="charts" ref="charts">
    </div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts';

export default {
    name: '',
    mounted() {
        // 初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts);
        // 配置数据
        lineCharts.setOption({
            xAxis: {
                show: false,
                // 均分
                type: 'category'
            },
            yAxis: {
                show: false,
            },
            // 系列
            series: [
                {
                    type: 'bar',
                    data: [10, 24, 13, 35, 20, 9, 14, 3, 26],
                    color: 'cyan'
                }
            ],
            // 布局调试
            grid: {
                width: '100%',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            // 提示信息
            tooltip:{}
        });
    },
}
</script>

<style scope>
.charts {
    width: 100%;
    height: 100%;
}
</style>
