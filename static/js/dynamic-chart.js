// Dynamic Request

let req_dom = document.getElementById('req-chart-container');
let max_dynamic_req = 50;
let last_dynamic_req_num = 0;
const reqChart = echarts.init(req_dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let data = [], stamps = [];
for (let i = 0; i < 20; i++) {
    data.push(Math.round(Math.random() * 100))
    stamps.push(toLocalTime())
}
let reqOption;

reqOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            }
        }
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
            data: stamps
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Requests',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 1,
                color: "#54b5c6"
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(1, 191, 236, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(128, 255, 165, .1)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            itemStyle : { normal: {label : {show: true}}},
            data: data
        }
    ]
};

function toLocalTime() {
    let date = new Date()
    return `${date.getMinutes()}:${date.getSeconds()}`
}

function updateDynamicRequestChart(request) {
    data.push(request);
    stamps.push(toLocalTime());
    if (data.length > max_dynamic_req){
        data.shift();
        stamps.shift();
    }
    let total = data.reduce((fib, add) => {
        return fib + add;
    }, 0);

    reqChart.setOption({
        series: [{
            data: data,
        }],
        xAxis: [
            {
                data: stamps,
            }
        ]
    });
    req_dom.parentElement.querySelector(".message-line.right").innerText = `${total} + ${request}`;
    let color, adt, offset = last_dynamic_req_num - request;
    last_dynamic_req_num = request;
    switch (true) {
        case offset > 0:
            color = progressColors.green;adt="+"; break;
        case offset < 0:
            color = progressColors.red;adt=""; break;
        default:
            color = progressColors.gray;adt="+"; break;
    }
    let offset_dom = document.querySelector("#dynamic-offset");
    offset_dom.innerText = adt + offset.toFixed(0);
    offset_dom.style.color = color;
}

if (reqOption && typeof reqOption === 'object') {
    reqChart.setOption(reqOption);
}

window.addEventListener('resize', reqChart.resize);
