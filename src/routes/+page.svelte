<script lang="ts">
	import Product from "$lib/Product.svelte";
	import CountUp from "$lib/CountUp.svelte";
	import {onMount} from "svelte";
	import {invalidateAll} from "$app/navigation";
	import {isNearWan} from "$lib";
	import Confetti from "svelte-confetti";
	import {browser, dev} from "$app/environment";

	export let data;


	let i = 0;
	let clicked = 0;
	let mounted = false;
	let isHidden = browser ? document.hidden : true;

	let inner: HTMLDivElement;
	let outer: HTMLDivElement;

	$: lastCheckDate = new Date(data.lastCheck);

	async function check() {
		const lastCheckDistance = Date.now() - data.lastCheck;
		if((i++ % 5 !== 0 && !isNearWan() && lastCheckDistance < 30 * 60e3) || (document.hidden && lastCheckDistance < 2 * 60 * 60e3)) return;
		if(data.matches.length > 0) return; // don't update at all once theyre released
		console.debug("Invalidating (checking)", lastCheckDistance, i, isNearWan())
		await invalidateAll();
		checkHeight();
	}

	function checkHeight() {
		if(!browser || !inner) return;
		if(inner.scrollHeight > window.innerHeight-50) {
			outer.classList.remove("flex")
			inner.classList.add("py-12")
			if(dev) console.debug("too short")
		} else {
			outer.classList.add("flex")
			inner.classList.remove("py-12")
			if(dev) console.debug("not too short")
		}
	}

	function onFocus() {
		if(Date.now() - data.lastCheck > 2 * 60e3) {
			check()
		}
	}

	onMount(() => {

		checkHeight()

		const i = setInterval(check, 24e3);
		mounted = true;
		return () => clearInterval(i);
	})
</script>
<svelte:window
		on:focus={onFocus}
		on:visibilitychange={() => isHidden = document.hidden}
		on:resize={checkHeight}
/>
<svelte:head>
	<title>Have they launched magnetic cable management yet? (.com)</title>
	<meta name="description" content="Checks lttstore.com to see if they have released magnetic cable management yet. Will link to the product(s) when it finds them."/>
	<meta property="og:image" content="/arch_stick.webp"/>
	<meta name="twitter:card" content="summary_large_image">
</svelte:head>

<div class="container h-screen mx-auto flex justify-center items-center" bind:this={outer}>
	<div class="space-y-5 justify-self-center text-center" bind:this={inner}>
		<img src="/arch_stick.webp" width="550" height="451" class="big-arch">
		<br>
		Have they launched magnetic cable management yet? (.com)
		{#if data.matches.length > 0 && mounted && !isHidden}
			<div class="h-0 w-0 mx-auto">
				{#key clicked}
					<Confetti cone x={[-1.5, 1.5]} y={[0.25, 1.5]} amount={50} fallDistance="100px"/>
					<Confetti x={[-2.5, 2.5]} y={[0.75, 2.25]} amount={100}/>
				{/key}
			</div>
		{/if}
		<h1 class="h1 leading-4 pt-3">
			{#if data.matches.length}
				<button on:click={() => clicked++}>
					Yes!
				</button>
			{:else}
				No
			{/if}

		</h1>
		{#each data.matches as product}
			<Product {product}/>
		{:else}
			<span class="opacity-70 text-sm">
				Last checked {lastCheckDate.toLocaleTimeString()}
			</span>
			<br>
			<CountUp/>
		{/each}

		<br>
		<div class="opacity-65 text-sm">
			Images and products from <a href="https://lttstore.com" class="anchor">lttstore.com</a><br>
			This site made by
			<a href="https://about.ajg0702.us" class="anchor" target="_blank" rel="noopener">
				aj
			</a>
		</div>
	</div>
</div>


<style>
	.big-arch {
		@apply mx-auto;
		max-height: 15em;
		width: auto;
	}
</style>