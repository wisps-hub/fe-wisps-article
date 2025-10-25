//柱状图组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const BarChart = ({title}) => {

    const chartRef = useRef(null)
    useEffect(()=>{
        //获取渲染图表的dom节点
        var chartDom = chartRef.current;
        //实例化图标对象
        var myChart = echarts.init(chartDom);
        //准备入表参数
        var option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
                }
            ]
        };
        //使用图表参数进行图表渲染
        option && myChart.setOption(option);
    })

   return <div id='main' ref = {chartRef} style={{width: '500px', height: '400px'}}></div> 

}

export default BarChart