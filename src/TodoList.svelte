<script>
    import { onMount } from 'svelte';
    import Icon from 'svelte-awesome';
    import { externalLink } from 'svelte-awesome/icons';
	import TodoItemCreate from "./TodoItemCreate.svelte";

    // TODO: temporary. Params not in use for this component
    export let params;
    console.log(`params: ${params}`);

    // import external-link-alt

    async function getTodos() {
        const res = await fetch('https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks');
        const text = await res.json();

        if (res.ok) {
            return text;
        } else {
            throw new Error(text);
        }
    }

    // let promise = getTodos();
    let promise = Promise.resolve([]);
    // let promise = getTodos();

    onMount(async () => {
        promise = getTodos();
    });

    function onTaskCreated() {
        console.log(`task was created`);
        promise = getTodos();
    }

    // function handleClick() {
    //     // promise = getTodos();
    //     promise = getTodos();
    // }
</script>



<!-- <button on:click={handleClick}>
    fetch todos
</button> -->
<!-- <TodoItemCreate/> -->
<!-- <div class="row row-cols-1"> -->
    <div class="d-grid gap-3">
<TodoItemCreate on:taskCreated={onTaskCreated} />

{#await promise}
<p>waiting ...</p>
{:then tasks}
    {#each tasks as task}
        <div class="card">
            <!-- <div class="p-1">
                <a href="#action=detail&taskid={task.taskID}" class="font-bold">{task.taskID}</a>
            </div>         -->
            
            <div class="card-body">
                <a class="float-end" href="/task/{task.taskID}">
                    <Icon data={externalLink} />
                </a>
                {task.text}
            </div>

            <!-- <div class="object-right-top"> -->
            
        </div>
    {/each}
    <!-- done -->
{/await}
</div>

<style>
    /* .task-container {
        padding: 2px;
        margin: 5px;
        background: #FFF;
    } */
</style>