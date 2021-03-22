$(document).ready(function(){
    console.log("document is ready");
    refreshTaskList();
});

var get_tasks_endpoint = "https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks"

async function refreshTaskList() {
    console.log("tasks are refreshed");
    const response = await fetch(get_tasks_endpoint);
    const tasks = await response.json();

    // var taskListElement = $("#content").html("<ul></ul>");
    var taskListElement = $("<ul></ul>");
    taskListElement.appendTo("#content");

    var i;
    for(i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        taskListElement.append("<li><b>" + task["taskID"] + "</b>: " + task["text"] + "</li>");
    }
}