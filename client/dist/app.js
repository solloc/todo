

var get_tasks_endpoint = "https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks"

async function refreshTaskList() {
    const response = await fetch(get_tasks_endpoint);
    const tasks = await response.json();

    var i;
    for(i = 0; i < tasks.length; i++) {
        var task = tasks[i];
    }
}