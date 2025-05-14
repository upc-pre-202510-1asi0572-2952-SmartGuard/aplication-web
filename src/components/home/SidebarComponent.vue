<template>
  <aside class="w-[15%] flex flex-col justify-between bg-white text-black h-screen pt-8">

    <!-- Parte superior -->
    <div>
      <!-- Logo -->
      <div class="flex flex-row items-center justify-center gap-3 mb-6">
        <img src="../../assets/smart-home/logo-smart-home.png" class="w-8 h-8" alt="">
        <span class="text-2xl"><strong>Face</strong>Lock</span>
      </div>

      <!-- Usuario -->
      <div class=" px-8 py-4 flex flex-row gap-2 items-center">
        <img src="../../assets/common/joven.jpg" alt="Foto de perfil"
          class="w-10 h-10 object-cover rounded-full shadow-md" />
        <div class="flex flex-col gap-0">
          <span class="text-gray-600 text-sm">Bienvenida a casa,</span>
          <span class="text-black font-bold">Julia</span>
        </div>
      </div>

      <!-- Navegación -->
      <div class="flex flex-col gap-4 px-6 font-medium">
        <LinkButton text="Hogar" iconClass="pi pi-home" route="/home"/>
        <LinkButton text="Accesos" iconClass="pi pi-clone" route="/home"/>
        <LinkButton text="Miembros" iconClass="pi pi-users" route="/members"/>
        <LinkButton text="Estadísticas" iconClass="pi pi-chart-line" route="/stadisticas"/>
        <div class="border-t my-2"></div>
        <LinkButton text="Perfil" iconClass="pi pi-user-edit" route="/profile" />
        <LinkButton text="Configuraciones" iconClass="pi pi-user-edit" route="/configuration" />
        <LinkButton text="Conseguir Premiun" iconClass="pi pi-user-edit" route="/membership" />
      </div>
    </div>

    <!-- Parte inferior -->
    <div class="px-6 pb-6">
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
