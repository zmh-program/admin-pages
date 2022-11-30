class WebNetwork {
    constructor(dom) {
        this.dom = dom;
        this.total = 0;

        this.conv_total_dom = dom.querySelector(".full-width");
        this.total_dom = dom.querySelector(".box-progress-percentage");
        this.offset_dom = dom.querySelector(".footer-msg");
    }
    update(bytes) {
        bytes = Math.round(bytes);
        this.total += bytes;
        this.total_dom.innerText = `${this.total} bytes`;
        this.conv_total_dom.innerText = `${toFileSize(this.total)}`;
        this.offset_dom.innerText = `+ ${toFileSize(bytes)}`;
    }
}

const recv = new WebNetwork(document.getElementById("recv"));
const send = new WebNetwork(document.getElementById("send"));