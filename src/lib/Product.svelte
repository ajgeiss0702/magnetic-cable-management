<script lang="ts">
    import type {ShopifyProduct} from "$lib/index";

    export let product: ShopifyProduct;
</script>
<a class="card m-1 p-2" href="https://lttstore.com/products/{product.handle}">
    <img src={product.images[0].src} width={product.images[0].width} height={product.images[0].height}>
    {product.title}<br>
</a>

<style>
    a {
        display: inline-block;

    }
    img {
        max-width: 15em;
    }
</style>