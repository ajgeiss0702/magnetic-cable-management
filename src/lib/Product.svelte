<script lang="ts">
    import type {ShopifyProduct} from "$lib/index";

    export let product: ShopifyProduct;
</script>
<a class="card mx-1 !my-1 p-2" href="https://lttstore.com/products/{product.handle}?ref=havetheylaunchedmagneticcablemanagementyet.com">
    <img src={product.images[0].src} width={product.images[0].width} height={product.images[0].height}>
    {product.title}<br>
</a>

<style>
    a {
        display: inline-block;

    }
    img {
        @apply mx-auto;
        max-height: 15em;
        width: auto;
    }
</style>