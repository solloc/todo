<script>
    export let params;
    import { onMount } from 'svelte';
    // import Icon from 'svelte-awesome';
    // import { externalLink } from 'svelte-awesome/icons';

    // // import external-link-alt

    async function getTodoItem() {
        const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks/${params.id}`);
        const text = await res.json();

        if (res.ok) {
            return text;
        } else {
            throw new Error(text);
        }
    }

    // // let promise = getTodos();
    let promise = Promise.resolve([]);
    // // let promise = getTodos();

    onMount(async () => {
        promise = getTodoItem();
    });

    // function handleClick() {
    //     // promise = getTodos();
    //     promise = getTodos();
    // }
</script>


<div class="shadow-md border p-1 m-1">
    <b>ID:</b> {params.id}
    {#await promise}
        <p class="text-blue-500 text-center">loading task details</p>
    {:then task} 
        <p>{task.text}</p>
        <p>STATUS: {task.status}</p>
        <p>Created at: {task.createdAt}</p>
        <p>Modified at: {task.modifiedAt}</p>
    {/await}
</div>
