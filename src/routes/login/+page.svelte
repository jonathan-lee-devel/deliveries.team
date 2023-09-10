<script lang="ts">
    import { user } from '$lib/client/firebase';
    import {signInWithGoogle, signOutWithGoogle} from '$lib/auth/sign-in-with-google';
</script>

<h2>Login</h2>

{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn btn-warning" on:click={signOutWithGoogle}>Sign Out</button>
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
