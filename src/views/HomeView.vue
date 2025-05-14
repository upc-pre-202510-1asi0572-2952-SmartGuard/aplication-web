<template>
  <div class="flex h-screen">
    <SidebarComponent />
    <main class="w-[85%] bg-gray-100">
      <InitHomeSpace v-if="currentView === 'init'" @next="showHome" />
      <HomeSpace v-else @back="showInit" />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Button from '../components/shared/Button.vue';
import HomeSpace from '../components/HomeSpace.vue';
import InitHomeSpace from '../components/InitHomeSpace.vue';

export default {
  components: {
    SidebarComponent,
    Button,
    HomeSpace,
    InitHomeSpace
  },
  setup() {
    const currentView = ref('init');

    function showHome() {
      currentView.value = 'home';
    }

    function showInit() {
      currentView.value = 'init';
    }

    return {
      currentView,
      showHome,
      showInit
    };
  }
};
</script>

<style scoped>
</style>
