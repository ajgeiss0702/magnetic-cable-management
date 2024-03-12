<script lang="ts">
    import { page } from '$app/stores';
    import {browser} from "$app/environment";

    let attempt = Number($page.url.searchParams.get("attempt") ?? 0);

    if(browser && $page.status === 500 && $page.url.pathname === "/") {
        checkForReload();
    }

    function checkForReload() {
        // Auto-reload if root page throws a 500. This usually just happens because the data request failed. Thanks sveltekit..
        setTimeout(() => {
            const newUrl = new URL(location.href);
            newUrl.searchParams.set("attempt", (++attempt) + "")

            history.replaceState({}, document.title, newUrl.toString());

            // check if the page is ok before redirecting
            fetch(newUrl.toString())
                .then(r => {
                    if(r.ok) {
                        location.href = newUrl.toString();
                    } else {
                        checkForReload();
                    }
                })
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                .catch(checkForReload);

        }, Math.min(Math.max(3e3, 3e3 * (attempt / 3)), 30e3));// delay by 3-30 seconds so that we don't spam if the site is actually broken
    }
</script>

<div class="container h-screen mx-auto flex justify-center items-center">
    <div class="space-y-5 justify-self-center text-center">
        <h1 class="h1">{$page.status}</h1>
        {$page.error?.message}
    </div>
</div>