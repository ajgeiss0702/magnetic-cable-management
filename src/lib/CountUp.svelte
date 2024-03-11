<script lang="ts">

    import {onMount} from "svelte";
    import {timeString} from "$lib/index";

    // const lastDueDate = new Date("2024-09-08T16:30:00.000-07:00");
    const lastDueDate = new Date("2024-03-08T16:30:00.000-07:00");

    console.debug({lastDueDate})


    function update() {
        const distance = lastDueDate.getTime() - Date.now();
        if(distance < 0) late = true;
        string = timeString(Math.abs(distance)) ?? "";
    }

    let late = false;
    let string: string;
    update();


    onMount(() => {
        const i = setInterval(update, 1e3);
        return () => clearInterval(i);
    })

</script>
They {late ? "were" : "are"} supposed to release {late ? "" : "in"}
{string}
{late ? "ago" : ""}.