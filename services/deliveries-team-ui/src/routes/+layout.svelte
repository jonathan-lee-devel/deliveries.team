<script>
    import '../app.css';
    import {Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";
</script>

<Navbar let:hidden let:toggle color="primary">
    <NavBrand href="/">
    <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold text-white ">Deliveries.Team</span>
</NavBrand>
<NavHamburger on:click={toggle} />
<NavUl {hidden}>
    <NavLi href="/" active={true} class="text-white">Home</NavLi>
    <NavLi href="/about" class="text-white">About</NavLi>
    <NavLi href="/services" class="text-white">Services</NavLi>
    <NavLi href="/pricing" class="text-white">Pricing</NavLi>
    <NavLi href="/contact" class="text-white">Contact</NavLi>
</NavUl>
</Navbar>
<slot />
