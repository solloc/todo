<script>
	import TodoList from "./TodoList.svelte";
	import TodoItem from "./TodoItem.svelte";
	import Tailwind from "./Tailwind.svelte";
	import router from "page";
	// import  from "bootstrap";
	// export let name;

	// const bootstrap = require('bootstrap');

	let page;
	let params;

	router('/', () => (page = TodoList));
	router(
		'/task/:id', 
		(ctx, next) => {
			params = ctx.params;
			next();
		},
		() => (page = TodoItem));
	router.start();
</script>

<div class="">
	<div class="bg-gray-500 w-full fixed top-0 shadow-md p-2">
		<h1 class="text-center text-white"><a href="/" class="bg-gray-700 rounded-lg font-bold p-1">todo</a></h1>
	</div>
	<div class="max-w-2xl mx-auto overflow-y-auto mt-10">
		<!-- <TodoList/> -->
		<svelte:component this="{page}" params="{params}"/>
	</div>	
</div>



<!-- <main class="bg-gray-200"> -->
	<!-- <h1>Hello {name}!</h1> -->
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->

	
<!-- </main> -->

<!-- <style>
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	} */

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style> -->