<template>
  <aside class="w-[15%] flex flex-col justify-between bg-white text-black h-screen py-8">

    <!-- Parte superior -->
    <div>
      <!-- Logo -->
      <div class="flex flex-row items-center justify-center gap-3 mb-6">
        <img src="../../assets/smart-home/logo-smart-home.png" class="w-6 h-6" alt="">
        <span class="hidden lg:block text-2xl"><strong>Face</strong>Lock</span>
      </div>

      <!-- Usuario -->
      <div class=" p-4 flex flex-row justify-center gap-2 items-center">
        <img src="../../assets/common/joven.jpg" alt="Foto de perfil"
          class="w-6 h-6 object-cover rounded-full shadow-md" />
        <div class="hidden lg:flex flex-col gap-0">
          <span class="text-gray-600 text-sm">Bienvenida a casa,</span>
          <span class="text-black font-bold">Julia</span>
        </div>
      </div>

      <!-- Navegación -->
      <div class="flex flex-col gap-4 sm:px-6 font-medium ">
        <LinkButton text="Hogar" iconClass="pi pi-home" route="/home" />
        <LinkButton text="Accesos" iconClass="pi pi-clone" route="/home" />
        <LinkButton text="Miembros" iconClass="pi pi-users" route="/members" />
        <LinkButton text="Estadísticas" iconClass="pi pi-chart-line" route="/stadisticas" />
        <div class="border-t my-2"></div>
        <LinkButton text="Perfil" iconClass="pi pi-user" route="/profile" />
        <LinkButton text="Configuraciones" iconClass="pi pi-cog" route="/configuration" />
        <LinkButton text="Conseguir Premium" iconClass="pi pi-star" route="/membership" />
      </div>
    </div>

    <!-- Parte inferior -->
    <div class="sm:px-6">
      <LinkButton text="Cerrar sesión" iconClass="pi pi-sign-out" route="/login" />
    </div>
  </aside>
</template>


<script>
import LinkButton from './LinkButton.vue';


export default {
  components: {
    LinkButton
  },
  methods: {
  }
}
</script>
