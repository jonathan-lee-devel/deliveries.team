<script lang="ts">
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<AnimatedRoute>
    <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
        <div class="card-body items-center text-center">
        <slot />
        </div>
    </main>
</AnimatedRoute>
