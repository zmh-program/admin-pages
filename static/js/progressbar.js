let cpu_progress_dom = document.getElementById("cpu");
let ram_progress_dom = document.getElementById("ram");
let rom_progress_dom = document.getElementById("rom");
let web_analysis_dom = document.getElementById("ws-delay");

const max_wss_request_ms = 2000;
const ram_size = 3694;
const rom_size = 59 * 1024;

const progressColors = {
    red: "rgb(240, 40, 40)",
    orange: "rgb(240,100,40)",
    yellow: "rgb(247,223,30)",
    green: "rgb(58,178,18)",
    gray: "rgb(100,100,100)",
};

function dynamicNumber(dom, current, total, interval){
    dom.innerText = current.toFixed(0);
    if (current > total) {
        current = total;
        dom.innerText = current.toFixed(0);
        return current;
    }
    setTimeout(function () {
        dynamicNumber(dom, current + (total / 10), total, interval);
    }, interval || 1);
}
function boxProgressUpdate(dom, level, percent, footer_msg) {
    let color, percent_string = `${percent.toFixed(1)}%`;
    switch (level) {
        case 3: color = progressColors.red;break;
        case 2: color = progressColors.orange;break;
        case 1: color = progressColors.yellow;break;
        case 0: color = progressColors.green;break;
    }
    let progress = dom.getElementsByClassName("box-progress")[0];
    progress.style.width = percent_string;
    progress.style.backgroundColor = color;
    dom.getElementsByClassName("box-progress-percentage")[0].innerText = footer_msg || percent_string;
    return color;
}
function wsProgressUpdate(ms) {
    let msg, level;
    switch (true) {
        case ms >= 1500:
            msg = "loss";
            level = 3;
            break;
        case ms >= 1000:
            msg = "bad";
            level = 2;
            break;
        case ms >= 500:
            msg = "normal";
            level = 1;
            break;
        default:
            msg = "good";
            level = 0;
            break;
    }
    if (ms > 2000){
        ms = 2000;
    }
    let percent = (ms / max_wss_request_ms) * 100;
    let color = boxProgressUpdate(web_analysis_dom, level, percent, ms.toString() + " ms");
    let footMsg = web_analysis_dom.getElementsByClassName("footer-msg")[0];
    footMsg.innerText = msg;
    footMsg.style.color = color;
    if (msg === "normal"){footMsg.style.color = progressColors.gray}
}
function roundProgressUpdate(dom, percent) {
    let color, level, _chart = dom.getElementsByClassName("percent-chart")[0];
    switch (true) {
        case percent >= 80:
            color = progressColors.red;level = 3;break;
        case percent >= 60:
            color = progressColors.orange;level = 2;break;
        case percent >= 40:
            color = progressColors.yellow;level = 1;break;
        default:
            color = progressColors.green;level = 0;break;
    }
    dom.getElementsByClassName("percent-value")[0].innerText = Number(percent).toFixed(0);
    _chart.style.stroke = color;
    _chart.style.strokeDashoffset = `calc(440px - (440px * ${percent} / 100))`;
    let content = dom.getElementsByClassName("box-content-header")[0].innerText.trim();
    let footer = dom.getElementsByClassName("footer-msg")[0];
    if (content === "RAM"){
        let current = percent * ram_size / 100;
        footer.innerText = `${current.toFixed(1)} / ${ram_size} MB`;
    }
    else{
        if (content === "ROM"){
            let current = percent * rom_size / 100 / 1024;
            footer.innerText = `${current.toFixed(1)} / ${(rom_size / 1024).toFixed(0)} GB`;
        }
    }
    boxProgressUpdate(dom, level, Number(percent));
}
