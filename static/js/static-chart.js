const req_site_dom = document.getElementById('site-request-chart');
const site_req_chart = echarts.init(req_site_dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
function get_7days(_today){
    if (_today < 1){
        throw RangeError();
    }
    let week_content = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let today = (_today || new Date().getDay())
    let week_data = [];
    for (let i = 7; i > 0; i--) {
        let day = today - i;
        if (day < 0){
            day = 7 + day;
        }
        week_data.push(week_content[day]);
    }
    return week_data;
}

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
            data: get_7days(),
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