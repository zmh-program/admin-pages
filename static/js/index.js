let date = new Date();
document.getElementsByClassName("right")[0].innerText = `${date.getMonth()} - ${date.getDay()}`
document.addEventListener('DOMContentLoaded', function () {
    const modeSwitch = document.querySelector('.mode-switch');

    modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        modeSwitch.classList.toggle('active');
    });

    const listView = document.querySelector('.list-view');
    const gridView = document.querySelector('.grid-view');
    const projectsList = document.querySelector('.project-boxes');
    const roundProgressQuery = (add, remove) => {
        let elements = document.querySelectorAll(".percent");
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(add);
            elements[i].classList.add(remove);
        }
    }
    const boxProgressQuery = (add, remove) => {
        let elements = document.querySelectorAll(".box-progress-bar");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (!element.parentElement.getElementsByClassName("percent").length){
                return;
            }
            element.classList.remove(add);
            element.classList.add(remove);
        }
    }

    listView.addEventListener('click', function () {
        gridView.classList.remove('active');
        listView.classList.add('active');
        projectsList.classList.remove('jsGridView');
        projectsList.classList.add('jsListView');
        roundProgressQuery("show", "hidden");
        boxProgressQuery("hidden", "show");
    });

    gridView.addEventListener('click', function () {
        gridView.classList.add('active');
        listView.classList.remove('active');
        projectsList.classList.remove('jsListView');
        projectsList.classList.add('jsGridView');
        roundProgressQuery("hidden", "show");
        boxProgressQuery("show", "hidden");
    });

    document.querySelector('.messages-btn').addEventListener('click', function () {
        document.querySelector('.messages-section').classList.add('show');
    });

    document.querySelector('.messages-close').addEventListener('click', function() {
        document.querySelector('.messages-section').classList.remove('show');
    });

    function addBoxListener(func, type = 'click') {
        listView.addEventListener(type, func)
        gridView.addEventListener(type, func)
    }
});

function get_week(_today){
    if (_today < 1){
        throw RangeError();
    }
    let week_content = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let today = (_today || new Date().getDay());
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