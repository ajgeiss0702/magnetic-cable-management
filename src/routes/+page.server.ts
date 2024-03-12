import {dev, version} from "$app/environment";
import type {ShopifyProduct} from "$lib";
import type {PageServerLoad} from "./$types";

let cache: {
    lastResponse?: Response
    lastFetch: number
} = {lastFetch: 0}

const CACHE_TIME = 23e3;


export const load = (async ({fetch, platform}) => {

    const distance = Date.now() - cache.lastFetch;
    if(distance < CACHE_TIME) {
        return cache.lastResponse as Response;
    }

    const start = Date.now();

    const url = "https://lttstore.com/products.json";
    const productsResponse = await fetch(url, {
        headers: {
            "user-agent": "havetheylaunchedmagneticcablemanagementyet.com/" + version
        }
    })

    platform?.env?.LTTSTORE_REQUESTS?.writeDataPoint({
        blobs: [
            url
        ],
        doubles: [
            productsResponse.status,
            Date.now() - start
        ],
        indexes: []
    })

    const products = await productsResponse.json()
        .then(r => r.products as ShopifyProduct[])

    const matches = products.filter(p => p.title.toLowerCase().includes("magnet"))
    // const matches= products.filter(p => p.title.toLowerCase().includes(dev ? "shirt" : "magnet"));

    const response: Response = {
        matches,
        lastCheck: Date.now()
    };

    cache = {
        lastResponse: response,
        lastFetch: Date.now()
    }

    return response;
}) satisfies PageServerLoad;

type Response = {
    matches: ShopifyProduct[],
    lastCheck: number
}