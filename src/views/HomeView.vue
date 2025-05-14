<template>
  <div class="flex h-screen">
    <SideBar/>
    <main class="w-[85%] bg-gray-100">
      <HomeSpace/>
    </main>

  </div>
</template>

<script>
import SideBar from '../components/home/sidebar.vue';
import Button from '../components/shared/Button.vue';
import HomeSpace from '../components/HomeSpace.vue';

export default {
  components:{
    SideBar,
    Button,
    HomeSpace
  }
}
</script>

<style scoped>
</style>
