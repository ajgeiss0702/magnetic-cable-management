<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
    import { autoModeWatcher } from '@skeletonlabs/skeleton';


	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>
<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<slot />
