let fileUnits = Array("B", "KiB", "MiB", "GiB");
let fileUnitStride = 1024;

function toFileSize(size, idx=0){
    while (size > fileUnitStride && idx < fileUnits.length - 1){
        size /= fileUnitStride
        idx ++;
    }
    return `${size.toFixed(2)} ${fileUnits[idx]}`
}

let fork_list_query = document.querySelector("#fork-list");
function initGithubRepositoryData(_owner, _repo) {
    let owner = _owner || "zmh-program";
    let repo = _repo || "Zh-Website";

    $.ajax({
        url: `https://api.github.com/repos/${owner}/${repo}`,
        dataType: "json",
        success: function (data) {
            document.getElementById("star").innerText = data.stargazers_count || 0;
            document.getElementById("fork").innerText = data.forks || 0;
            document.getElementById("size").innerText = toFileSize(data.size || 0, 1);
        }
    });

    $.ajax({
        url: `https://api.github.com/repos/${owner}/${repo}/forks`,
        dataType: "json",
        success: function (data) {
            for (let i = 0, length = data.length; i < length; i++) {
                let element = data[i];
                let github_fork_html = "<div class=\"github-card d-flex flex-items-baseline border-bottom color-border-muted py-3\">\n" +
                    "                                <span class=\"mr-2\"><a class=\"d-inline-block\" href=\"" + element.owner.url + "\"><img class=\"avatar avatar-user\" src=\"" + element.owner.avatar_url + "\" alt=\"@daweedkob\" width=\"32\" height=\"32\"></a></span>\n" +
                    "                                <div class=\"d-flex flex-column width-full\">\n" +
                    "                                    <div class=\"Box p-3 mt-2 \">\n" +
                    "                                        <div>\n" +
                    "                                            <div class=\"f4 lh-condensed text-bold color-fg-default\"><a class=\"Link--primary text-bold no-underline wb-break-all d-inline-block\" href=\"" + element.html_url + "\">" + element.full_name + "</a></div>\n" +
                    "                                            <div class=\"dashboard-break-word color-fg-muted mt-1 mb-0 repo-description\"><p>" + element.description + "</p></div>\n" +
                    "                                            <p class=\"f6 color-fg-muted mt-2 mb-0\">\n" +
                    "                                                <span class=\"d-inline-block color-fg-muted mr-3\"><span class=\"ml-0\"><span class=\"repo-language-color\" style=\"background-color: #3572A5\"></span>&nbsp;<span itemprop=\"programmingLanguage\">" + (element.language || "python") + "</span></span></span>\n" +
                    "                                                <span class=\"d-inline-block mr-3\"><a class=\"Link--muted\" target=\"_blank\" href=\"https://github.com/zmh-program/Zh-Website/stargazers\"><svg class=\"octicon octicon-star mr-1\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z\"></path></svg>" + element.stargazers_count + "</a></span>\n" +
                    "                                                <span>Updated " + element.updated_at.split("T")[0] + "</span>\n" +
                    "                                            </p>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>"
                let parent = document.createElement("div");
                parent.innerHTML = github_fork_html;
                fork_list_query.appendChild(parent);
            }
        }
    });
}