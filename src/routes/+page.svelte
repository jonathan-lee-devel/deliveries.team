<script lang="ts">
    import { user } from '$lib/client/firebase';
</script>

<svelte:head>
<title>Deliveries.Team</title>
</svelte:head>

<div class="w-full flex justify-center items-center pt-5">
    <h1 class="text-3xl font-bold underline-offset-2 text-white">Welcome to Deliveries.Team</h1>
</div>
{#if $user}
    <div class="w-full flex justify-center items-center pt-5">
        <h2 class="card-title">Welcome, {$user.displayName}</h2>
    </div>
{:else}
    <div class="w-full flex justify-center items-center pt-5">
        <h2>See what features we have to offer</h2>
    </div>
{/if}
