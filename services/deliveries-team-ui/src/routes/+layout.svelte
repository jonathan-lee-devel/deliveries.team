<script>
    import '../app.css';
    import {Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
</script>

<Navbar let:hidden let:toggle color="primary">
    <NavBrand href="/">
    <img src="/favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold text-white ">Deliveries.Team</span>
</NavBrand>
<NavHamburger on:click={toggle} />
<NavUl {hidden}>
    <NavLi href="/" active={true} class="text-white">Home</NavLi>
    <NavLi href="/" class="text-white">About</NavLi>
    <NavLi href="/" class="text-white">Services</NavLi>
    <NavLi href="/" class="text-white">Pricing</NavLi>
    <NavLi href="/" class="text-white">Contact</NavLi>
</NavUl>
</Navbar>
<div class="min-h-screen flex flex-col">
    <slot />
</div>
