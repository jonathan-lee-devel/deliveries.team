<script>
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar>
</Navbar>
<div class="min-h-screen flex flex-col">
    <slot />
</div>
