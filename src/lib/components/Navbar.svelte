<script lang="ts">
  import { signInWithGoogle, signOutWithGoogle } from "$lib/auth/sign-in-with-google";
  import { userData } from "$lib/client/firebase";
</script>

<div class="navbar bg-sky-700">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/">Deliveries.Team</a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            {#if $userData}
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="{$userData.photoURL}" alt="User Profile Image" />
            {:else}
                <img src="/favicon.png" alt="Application Icon" />
            {/if}
          </div>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {#if $userData}
            <li>
                <a class="justify-between" href={`/users/${$userData?.username}`}>Profile<span class="badge">New</span></a>
            </li>
            <li>
                <a href="/">Settings</a>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        {:else}
            <li>
                <a href="/login">Login</a>
            </li>
        {/if}
        </ul>
      </div>
    </div>
  </div>