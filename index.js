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
});