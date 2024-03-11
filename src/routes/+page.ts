import type { PageLoad } from "./$types";
import {version} from "$app/environment";
import type {ShopifyProduct} from "$lib";


export const load = (async ({fetch}) => {
    const products = await fetch("https://lttstore.com/products.json", {
        headers: {
            "user-agent": "havetheylaunchedmagneticcablemanagementyet.com/" + version
        }
    })
        .then(r => r.json())
        .then(r => r.products as ShopifyProduct[])

    const matches = products.filter(p => p.title.toLowerCase().includes("magnet"))
    // const matches = products.filter(p => p.title.toLowerCase().includes("hat"))

    return {
        matches
    }
}) satisfies PageLoad;

