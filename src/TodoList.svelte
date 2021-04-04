<script>
    import { onMount } from 'svelte';

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

    // function handleClick() {
    //     // promise = getTodos();
    //     promise = getTodos();
    // }
</script>



<!-- <button on:click={handleClick}>
    fetch todos
</button> -->

{#await promise}
<p>waiting ...</p>
{:then tasks}
<div>
    {#each tasks as task}
        <div class="shadow-md border p-1 m-1">
            <div class="p-1">
                <a href="#action=detail&taskid={task.taskID}" class="font-bold">{task.taskID}</a>
            </div>        
            <div class="p-1">
                {task.text}
            </div>
        </div>
    {/each}
    <!-- done -->
</div>
{/await}

<style>
    /* .task-container {
        padding: 2px;
        margin: 5px;
        background: #FFF;
    } */
</style>