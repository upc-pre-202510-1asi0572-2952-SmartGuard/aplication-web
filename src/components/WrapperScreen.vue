<template>
    <div class="flex flex-col md:flex-row h-full min-h-screen bg-gray-100">
        <SidebarComponent/>
        <main class="w-full lg:w-[85%] flex flex-col justify-center items-center gap-10 text-black px-4 py-6">

            <slot></slot>
        </main>
    </div>
</template>

<script>
import SidebarComponent from '../components/home/SidebarComponent.vue';

export default {
    components: {
        SidebarComponent,
    }
}
</script>