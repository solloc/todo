<script>
    export let params;
    import { onMount } from 'svelte';
    // import Icon from 'svelte-awesome';
    // import { externalLink } from 'svelte-awesome/icons';

    // // import external-link-alt
    let taskDetails;

    async function getTodoItem() {
        const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks/${params.id}`);
        taskDetails = await res.json();

        if (res.ok) {
            return taskDetails;
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
    async function saveData() {
        console.log(`saving ${JSON.stringify(taskDetails)}`);

        const settings = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(taskDetails),
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            // }
        }

        const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks/${params.id}`, settings);
        const resString = await res.json();
        // taskDetails = await res.json();

        if (res.ok) {
            // return taskDetails;
            return resString;
        } else {
            throw new Error(resString);
        }
    }

    async function deleteItem() {
        console.log(`deleting item`);

        const settings = {
            method: 'DELETE',
            mode: 'cors',
            // body: JSON.stringify(taskDetails),
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            // }
        }

        const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks/${params.id}`, settings);
        const resString = await res.json();
        // taskDetails = await res.json();

        if (res.ok) {
            // return taskDetails;
            return resString;
        } else {
            throw new Error(resString);
        }
    }
</script>


<div class="card card-body">
    <b>ID:</b> {params.id}
    {#await promise}
        <p class="text-blue-500 text-center">loading task details</p>
    {:then} 
        <form on:submit|preventDefault={saveData}>
            <textarea class="form-control" bind:value={taskDetails.text}></textarea>
            <!-- <p><i>{taskDetails.text}</i></p> -->
            <p>STATUS: {taskDetails.status}</p>
            <p>Created at: {taskDetails.createdAt}</p>
            <p>Modified at: {taskDetails.modifiedAt}</p>
            <button type="submit" class="btn btn-primary">save</button>
            <button on:click|preventDefault={deleteItem} class="btn btn-danger">delete</button>
        </form>
    {/await}
</div>
