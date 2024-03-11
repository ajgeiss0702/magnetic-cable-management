<script>
	import Product from "$lib/Product.svelte";
	import CountUp from "$lib/CountUp.svelte";

	export let data;
</script>
<svelte:head>
	<title>Have they launched magnetic cable management yet? (.com)</title>
	<meta name="description" content="Checks lttstore.com to see if they have released magnetic cable management yet. Will link to the product(s) when it finds them."/>
	<meta property="og:image" content="/arch_stick.webp"/>
	<meta name="twitter:card" content="summary_large_image">
</svelte:head>

<div class="container h-screen mx-auto flex justify-center items-center">
	<div class="space-y-5 justify-self-center text-center">
		<img src="/arch_stick.webp" width="550" height="451" class="big-arch">
		<br>
		Have they launched magnetic cable management yet? (.com)
		<h1 class="h1">{data.matches.length > 0 ? "Yes!" : "No"}</h1>
		{#each data.matches as product}
			<Product {product}/>
		{:else}
			<CountUp/>
		{/each}

		<br>
		<a href="https://lttstore.com" class="anchor">lttstore.com</a><br>
		This site made by
		<a href="https://about.ajg0702.us" class="anchor" target="_blank" rel="noopener">
			aj
		</a>
	</div>
</div>


<style>
	.big-arch {
		@apply mx-auto;
		max-height: 15em;
		width: auto;
	}
</style>