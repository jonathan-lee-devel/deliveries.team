<script lang="ts">
    import {enhance} from '$app/forms';
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<h1>{data.boatName}</h1>

<form method="POST" use:enhance>
    <input name="boatName" type="text">
    <button type="submit">Submit</button>
</form>
