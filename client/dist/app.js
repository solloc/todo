$(document).ready(function(){
    console.log("document is ready");
    refreshTaskList();
});

var get_tasks_endpoint = "https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks"
var delay = 0;

// for test purposes
// get_tasks_endpoint = "../resources/tasks.json";
// delay = 3000;

async function refreshTaskList() {
    console.log("tasks are refreshed");

    $.ajax({
        url: get_tasks_endpoint,
        beforeSend: addSpinner,
        dataType: "json",
    }).done(function(data) {
        setTimeout(function(){
            console.log("data received");
            $(".fa-circle-notch").hide();
    
            // const response = await fetch(get_tasks_endpoint);
            // const tasks = await data.json();
            const tasks = data;
    
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
        }, delay);
    });
}

var addSpinner = function() {
    console.log("adding spinner");
    
    var spinner = $("<i>").addClass("fas fa-circle-notch fa-spin");
    var spinnercontainer = $("<div>").addClass("flex justify-center").append(spinner);
        // .ajaxStart(function() {
        //     $( this ).show();
        // })
        // .ajaxStop(function() {
        //     $( this ).hide();
        // });    
    $("#content").append(spinnercontainer);
}