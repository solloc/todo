<script>

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

    function handleClick() {
        // promise = getTodos();
        promise = getTodos();
    }
</script>

<h1>todo</h1>

<button on:click={handleClick}>
    fetch todos
</button>

{#await promise}
<p>waiting ...</p>
{:then tasks}
<div>
    {#each tasks as task}
        <div class="task-container">
            <div>
                {task.taskID}
            </div>        
            <div>
                {task.text}
            </div>
        </div>
    {/each}
    done
</div>
{/await}

<style>
    .task-container {
        padding: 2px;
        margin: 5px;
        background: #FFF;
    }
</style>