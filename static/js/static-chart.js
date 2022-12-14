const req_site_dom = document.getElementById('site-request-chart');
const site_req_chart = echarts.init(req_site_dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

const site_req_option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            }
        }
    },
    legend: {
        data: ["Requests"]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: get_week(),
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Request',
            type: 'line',
            smooth: true,
            stack: 'Total',
            lineStyle: {
                width: 2.5,
                color: "#5470c6"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#5470c6'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 0, 0, 0)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [],
            itemStyle : { normal: {label : {show: true}}},
        },
    ]
};

if (site_req_option && typeof site_req_option === 'object') {
    site_req_chart.setOption(site_req_option);
}

function updateSiteRequestChart(data) {
    site_req_option.series.data = data;
    site_req_chart.setOption({
        series: [{
            data: data,
        }],
    });
}
window.addEventListener('resize', site_req_chart.resize);