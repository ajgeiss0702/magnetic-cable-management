import {version} from "$app/environment";
import type {ShopifyProduct} from "$lib";
import type {PageServerLoad} from "./$types";

let cache: {
    lastResponse?: Response
    lastFetch: number
} = {lastFetch: 0}

const CACHE_TIME = 23e3;


export const load = (async ({fetch}) => {

    const distance = Date.now() - cache.lastFetch;
    if(distance < CACHE_TIME) {
        return cache.lastResponse as Response;
    }

    const products = await fetch("https://lttstore.com/products.json", {
        headers: {
            "user-agent": "havetheylaunchedmagneticcablemanagementyet.com/" + version
        }
    })
        .then(r => r.json())
        .then(r => r.products as ShopifyProduct[])

    const matches = products.filter(p => p.title.toLowerCase().includes("magnet"))
    // const matches = products.filter(p => p.title.toLowerCase().includes("hat"))

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