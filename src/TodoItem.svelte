<script>
    export let params;
    // import { onMount } from 'svelte';
    // import Icon from 'svelte-awesome';
    // import { externalLink } from 'svelte-awesome/icons';

    // // import external-link-alt

    // async function getTodos() {
    //     const res = await fetch('https://xhjn5xxmn5.execute-api.eu-central-1.amazonaws.com/dev/tasks');
    //     const text = await res.json();

    //     if (res.ok) {
    //         return text;
    //     } else {
    //         throw new Error(text);
    //     }
    // }

    // // let promise = getTodos();
    // let promise = Promise.resolve([]);
    // // let promise = getTodos();

    // onMount(async () => {
    //     promise = getTodos();
    // });

    // function handleClick() {
    //     // promise = getTodos();
    //     promise = getTodos();
    // }
</script>


<div class="shadow-md border p-1 m-1">
    Detail {params.id} ...
</div>
