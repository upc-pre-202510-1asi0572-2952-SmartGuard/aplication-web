<template>
  <div class="flex h-screen">
    <SidebarComponent/>
    <main class="w-[85%] bg-gray-100">
      <HomeSpace/>
    </main>

  </div>
</template>

<script>
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Button from '../components/shared/Button.vue';
import HomeSpace from '../components/HomeSpace.vue';

export default {
  components:{
    SidebarComponent,
    Button,
    HomeSpace
  }
}
</script>

<style scoped>
</style>
