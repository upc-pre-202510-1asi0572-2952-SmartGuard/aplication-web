<template>
  <WrapperScreen>
    <InitHomeSpace v-if="currentView === 'init'" @next="showHome" />
    <RegisterHomeView v-else @back="showInit" />
  </WrapperScreen>
</template>

<script>
import { ref } from 'vue';
import Button from '../components/shared/Button.vue';
import RegisterHomeView from '../components/RegisterHomeView.vue';
import InitHomeSpace from '../components/InitHomeSpace.vue';
import WrapperScreen from '../components/WrapperScreen.vue';
export default {
  components: {
    Button,
    RegisterHomeView,
    InitHomeSpace,
    WrapperScreen,
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

<style scoped></style>
