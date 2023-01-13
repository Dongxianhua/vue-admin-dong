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
                type: 'category'
            },
            yAxis: {
                show: false,
            },
            // 系列
            series: [
                {
                    type: 'line',
                    data: [30, 24, 13, 35, 20, 9],
                    // 拐点的样式的设置
                    itemStyle: {
                        opacity: 0
                    },
                    // 线条的样式
                    lineStyle: {
                        color: 'purple'
                    },
                    smooth: true,
                    // 填充颜色设置
                    areaStyle: {
                        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                        color: 
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },

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
