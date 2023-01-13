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
                // 最大最小值
                min:0,
                max:100
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            // 系列
            series: [
                {
                    type: 'bar',
                    data: [78],
                    color: 'yellowgreen',
                    // 柱状图的宽
                    barWidth: 10,
                    // 背景颜色
                    showBackground: true,
                    backgroundStyle: {
                        color: "#eee"
                    }
                }
            ],
            // 布局调试
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
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
