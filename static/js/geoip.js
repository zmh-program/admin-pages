// Requests Map Chart
const mapDOM = document.getElementById('country-chart');
const mapChart = echarts.init(mapDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let mapOption;
mapChart.showLoading();

// Requests Round Chart
const roundDOM = document.getElementById('round-chart');
const roundChart = echarts.init(roundDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let roundOption;

// User Nightingale Chart
const nightDOM = document.getElementById('nightingale-chart');
const nightChart = echarts.init(nightDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let nightOption;


// User Bar Chart
const barDOM = document.getElementById('bar-chart');
const barChart = echarts.init(barDOM, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
let barOption;


function dynamicNumber(dom, target, begin=0, freshTime=50, strideTime=1200, fixed=0) {
    let ticks = strideTime / freshTime;
    let stride = (target-begin) / ticks;
    for (let i = 0; i < ticks; i++) {
        setTimeout(()=>(dom.innerText = ((i + 1) * stride + begin).toFixed(fixed)), freshTime * i)
    }
}

function execRequestData(data) {
    let country_values = [];
    data.forEach(n => (country_values.push(n.value)));
    return [Math.min(...country_values), Math.max(...country_values)];
}
function execUserData(data, mul) {
    // 1. return percent of value
    // 2. return name format (e.g.): 
    //      China, requests 32:
    //          China - 32
    
    let userRegData = [];
    let totalValue = 0;
    let ret = [];
    data.forEach(val => {
        totalValue += val.value;
        userRegData.push(`${val.name} - ${val.value}`);
    })
    for (let i = 0, len = userRegData.length; i < len; i++) {
        let percent = data[i].value / totalValue * (mul || 100);
        ret.push({name: userRegData[i], value: Number(percent.toFixed(4))});
        // console.log(data[i].name, percent);
    }
    return ret;
}

function initializeRequestCharts(map_url, data_url) {
    $.get(map_url, function (map_json) {
        echarts.registerMap('World', map_json);
        
        $.ajax({
            url: data_url,
            contentType: "json",
            success: function(data_json) {
                mapChart.hideLoading();
                document.querySelector("#registered").innerText = data_json.registered;
                document.querySelector("#actives").innerText = data_json.actives;
                document.querySelector("#admin").innerText = data_json.admin;
                
                dynamicNumber(document.getElementById("requests"), data_json.total)
                let country_values = [];
                data_json.data.forEach(n => (country_values.push(n.value)));
                let [min, max] = execRequestData(data_json.data);
                
                let userData = execUserData(data_json.userData, 1);
                
                mapChart.setOption(
                    (mapOption = {
                        title: {
                            text: ``,
                            },
                        tooltip: {
                            trigger: 'item',
                            formatter: function (obj) {
                                return `${obj.name}<br/>${obj.value?obj.value:0} requests`
                            },
                        },
                        visualMap: {
                            min: 0,
                            max: max,
                            text: ['High', 'Low'],
                            realtime: false,
                            calculable: true,
                            inRange: {
                                color: ['lightskyblue', 'yellow', 'orangered']
                            }
                        },
                        series: [
                            {
                                name: 'SiteRequest',
                                type: 'map',
                                map: 'World',
                                label: {
                                    show: false,
                                },
                                data: data_json.data,
                            }
                        ]
                    })
                );
                roundChart.setOption(
                    (roundOption = {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '5%',
                            left: 'center'
                        },
                        series: [
                            {
                                name: 'Regional Distribution of Users',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: 30,
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: data_json.data,
                            },
                        ]
                    })
                );
                nightChart.setOption(
                    nightOption = {
                        legend: {
                            top: 'bottom'
                        },
                        toolbox: {
                            show: false,
                            feature: {}
                        },
                        series: [
                            {
                                name: 'Nightingale Chart',
                                type: 'pie',
                                radius: [10, 100],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                itemStyle: {
                                    borderRadius: 4
                                },
                                label: {
                                    show: true,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                },
                                data: userData,
                            }
                        ]
                    }
                );
                barChart.setOption((barOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
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
                            data: get_week(),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                        }
                    ],
                    series: [
                        {
                            name: 'Registered',
                            type: 'bar',
                            barWidth: '60%',
                            data: data_json.registeredData,
                        }
                    ]
                }));
            }
        });
    });
}

window.addEventListener('resize', roundChart.resize);
window.addEventListener('resize', mapChart.resize);
window.addEventListener('resize', nightChart.resize);
window.addEventListener('resize', barChart.resize);

    // const listView = document.querySelector('.list-view');
    // const gridView = document.querySelector('.grid-view');

// document.getElementsByClassName('list-view')[0].onclick =
// document.getElementsByClassName('grid-view')[0].onclick =
// () => {
// setInterval(() => {
//     roundChart.resize();
//     mapChart.resize();
//     nightChart.resize();
//     barChart.resize();
// }, 100)