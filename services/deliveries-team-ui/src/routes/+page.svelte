<script>
    import Counter from '../components/Counter.svelte';
    import { Button, Alert, Card, Toast } from 'flowbite-svelte';
</script>

<div class="w-full flex justify-center items-center pt-5">
    <h1 class="text-3xl font-bold underline-offset-2 text-white">Welcome to Deliveries.Team</h1>
</div>
<div class="w-full flex justify-center items-center pt-5">
    <Counter />
</div>
<div class="w-full flex justify-center items-center pt-5">
    <Alert class="text-white">
        <span class="font-medium text-white">Info alert!</span>
        This is an info alert
    </Alert>
</div>
<div class="w-full flex justify-center items-center pt-5">
    <Button color="primary">Primary</Button>
</div>
<div class="w-full flex justify-center items-center pt-5">
    <Card href="/cards" color="primary">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">Noteworthy technology acquisitions 2021</h5>
        <p class="font-normal text-gray-700 dark:text-gray-700 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </Card>
</div>
<div class="w-full flex justify-center items-center pt-5">
    <Toast color="blue" class="toast text-white">
        <svelte:fragment slot="icon">
        </svelte:fragment>
        Dismissible user notification.
    </Toast>
</div>
