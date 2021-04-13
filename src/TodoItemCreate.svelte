<script>
    // export let params;
    import { onMount } from 'svelte';
    // import Icon from 'svelte-awesome';
    // import { externalLink } from 'svelte-awesome/icons';

    // // import external-link-alt
    let taskDetails = {};

    // async function getTodoItem() {
    //     const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks/${params.id}`);
    //     taskDetails = await res.json();

    //     if (res.ok) {
    //         return taskDetails;
    //     } else {
    //         throw new Error(text);
    //     }
    // }

    // // let promise = getTodos();
    // let promise = Promise.resolve([]);
    // // let promise = getTodos();

    // onMount(async () => {
    //     promise = getTodoItem();
    // });

    // function handleClick() {
    //     // promise = getTodos();
    //     promise = getTodos();
    // }
    async function saveData() {
        console.log(`saving ${JSON.stringify(taskDetails)}`);

        const settings = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(taskDetails),
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            // }
        }

        const res = await fetch(`https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks`, settings);
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


<div class="shadow-md border p-1 m-1">
    <!-- <b>ID:</b> {params.id} -->
    <!-- {#await promise} -->
        <!-- <p class="text-blue-500 text-center">loading task details</p> -->
    <!-- {:then}  -->
        <form on:submit|preventDefault={saveData}>
            <textarea bind:value={taskDetails.text} class="w-full"></textarea>
            <!-- <p><i>{taskDetails.text}</i></p> -->
            <!-- <p>STATUS: {taskDetails.status}</p>
            <p>Created at: {taskDetails.createdAt}</p>
            <p>Modified at: {taskDetails.modifiedAt}</p> -->
            <button type="submit">save</button>
        </form>
    <!-- {/await} -->
</div>
