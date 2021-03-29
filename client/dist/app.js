$(document).ready(function(){
    console.log("document is ready");
    refreshTaskList();
});

var get_tasks_endpoint = "https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks"
var delay = 0;

// for test purposes
// get_tasks_endpoint = "../resources/tasks.json";
// delay = 0000;

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
    
            var taskListContainer = $("<div>").addClass("space-y-1").attr("id", "TaskListContainer");
            taskListContainer.appendTo("#content");
    
            var taskList = "";
    
            var i;
            for(i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                taskList += `
                    <div class="bg-white rounded-xl shadow border p-2">
                        <div class="flex">
                            <a data-taskid="` + task["taskID"] + `" href="#detail?taskid=` + task["taskID"] + `" class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer">` + task["taskID"] + `</a>
                        </div>
                        <div class="px-2">` + task["text"] + `</div>
                    </div>`;
            }    
            // <a href="#detail&` + task["taskID"] + `" class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer">/` + task["taskID"] + `</a>
            taskListContainer.html(taskList);              
            // taskListContainer.on("click", "a", displayTaskDetails);
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

var displayTaskDetails = function(event) {
    // event.preventDefault();
    // console.log("displaying task details: " + JSON.stringify(event));
    var taskItem = $(this);
    // console.log("task item: " + JSON.stringify(taskItem));
    console.log("taskItem.attr: " + taskItem.attr("href"));
    console.log("taskItem.text: " + taskItem.text());

                    // $.ajax({
                    //     // url: get_tasks_endpoint + "/" + taskItem.attr("href"),
                    //     url: get_tasks_endpoint + "/" + taskItem.attr(),
                    //     dataType: "json",
                    // }).done(function(data){
                    //     console.log(JSON.stringify(data));
                    //     var taskItemDetails = `
                    //         <div class="bg-white rounded-xl shadow border p-2">
                    //             <div>TaskID: ` + data.taskID + `</div>
                    //             <div>Text: ` + data.text + ` </div>
                    //             <div>Status: ` + data.status + `</div>
                    //         </div>
                    //     `;
                    //     $("#detailcontent").append("<div>").html(taskItemDetails);
                    // });    
}


// $.mobile.document.on( "pagecontainerbeforechange", function( event, data ) {
    
//     console.log("navigating");
//     console.log("Event: " + JSON.stringify(event));
//     // console.log("Event: " + event);
//     console.log("Data: " + JSON.stringify(data));
//     // console.log("Data: " + data);
// });

// $( window ).on( "navigate", function( event, data ) {
//     console.log( data.state );
//   });

$( document ).on( "pagecontainerchange", function( event, ui ) {

    var thisUrl = ui.absUrl;

    if ( typeof thisUrl === "string" ) {
        var parsed = $.mobile.path.parseUrl(thisUrl),
            queryParameters = {},
            hashQuery = parsed.hash.split("?");
            $.each( (hashQuery.length > 1 ? hashQuery[ 1 ] : "" ).split( "&" ), function() {
                var pair = this.split( "=" );
                if ( pair.length > 0 && pair [ 0 ] ) {
                    queryParameters[ pair[ 0 ] ] = 
                        ( pair.length > 1 ? pair[ 1 ] : true );
                }
            });
            var processedHash = {
                parsed: parsed,
                cleanHash: ( hashQuery.length > 0 ? hashQuery[ 0 ] : "" ),
                queryParameters: queryParameters
            };

            if( processedHash.cleanHash === "#detail" ) {

                var actualEndpoint = get_tasks_endpoint + "/" + processedHash.queryParameters.taskid;

                    $.ajax({
                        // url: get_tasks_endpoint + "/" + taskItem.attr("href"),
                        url: actualEndpoint,
                        dataType: "json",
                    }).done(function(data){
                        console.log(JSON.stringify(data));
                        var taskItemDetails = `
                            <div class="bg-white rounded-xl shadow border p-2">
                                <div>TaskID: ` + data["taskID"] + `</div>
                                <div>Text: ` + data["text"] + ` </div>
                                <div>Status: ` + data["status"] + `</div>
                            </div>
                        `;
                        console.log("taskItemDetails: " + taskItemDetails);
                        $("#detailContent").append("<div>").html(taskItemDetails);
                        // $("#detailTaskID").html(data["taskID"]);
                    });                    


            }

            
    }

    // var processHash = function( url ) {
    //         var parsed = $.mobile.path.parseUrl( url ),
    //             queryParameters = {},
    //             hashQuery = parsed.hash.split( "?" );
    //         // Create name: value pairs from the query parameters
    //         $.each( ( hashQuery.length > 1 ? hashQuery[ 1 ] : "" ).split( "&" ), function() {
    //             var pair = this.split( "=" );
    //             if ( pair.length > 0 && pair[ 0 ] ) {
    //                 queryParameters[ pair[ 0 ] ] =
    //                     ( pair.length > 1 ? pair[ 1 ] : true );
    //             }
    //         });
    //         return {
    //             parsed: parsed,
    //             cleanHash: ( hashQuery.length > 0 ? hashQuery[ 0 ] : "" ),
    //             queryParameters: queryParameters
    //         };
    //     };


    //             // We only affect navigation behavior when going to #secondary-page
    //             if ( processedHash.cleanHash === "#secondary-page" ) {
    //                 // Set the url of the page - this will be used by navigation to set the
    //                 // URL in the location bar
    //                 $( "#secondary-page" ).jqmData( "url", processedHash.parsed.hash );
    //                 // Allow same-page transition when coming from #secondary page
    //                 data.options.allowSamePageTransition = ( data.options.fromPage &&
    //                     data.options.fromPage.attr( "id" ) === "secondary-page" );
    //                 // Update the page when the outgoing animation completes. This involves two things:
    //                 // 1. Removing the active class from the button used for navigation.
    //                 // 2. Updating the page to make it look like the destination page.
    //                 $.mobile.activePage.animationComplete( function() {
    //                     $.mobile.removeActiveLinkClass( true );
    //                     // Set the title from the query parameters
    //                     $( "#section" ).text( processedHash.queryParameters.section );
    //                 });
    //             }
    //         }



} );
