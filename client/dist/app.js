$(document).ready(function(){
    console.log("document is ready");
    refreshTaskList();
});

var get_tasks_endpoint = "https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks"
// get_tasks_endpoint = "../resources/tasks.json"

async function refreshTaskList() {
    console.log("tasks are refreshed");
    const response = await fetch(get_tasks_endpoint);
    const tasks = await response.json();

    var taskListContainer = $("div").addClass("space-y-4");
    taskListContainer.appendTo("#content");

    var taskList = "";

    var i;
    for(i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        taskList += `
            <div class="bg-white rounded-xl shadow border p-2">
                <div class="flex">
                    <div class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer">/` + task["taskID"] + `</div>
                </div>
                <div class="px-2">` + task["text"] + `</div>
            </div>`;
    }

    taskListContainer.html(taskList);
}