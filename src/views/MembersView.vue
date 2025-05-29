<template>
    <WrapperScreen>
        <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
            <h1 class="text-3xl font-semibold">Miembros</h1>
            <div class="flex flex-col sm:flex-row justify-between gap-4 ">
                <p class="lg:w-md text-xl font-light ">Gestiona y controlar el acceso de todos los miembros que tienen
                    permiso
                    para acceder a tu hogar</p>
                <div class="flex flex-col lg:w-md gap-4">
                  <Button class="font-semibold" _texto="+ Agregar miembros"
                          @click="goToAdd" />
                  <Button class="font-semibold" _texto="- Eliminar miembros"
                          @click="goToDelete" />
                </div>
            </div>
            <div class="flex flex-col gap-4 mt-8">
              <div v-for="miembro in miembros" :key="miembro.id"
                    class="border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer text-2xl font-light text-black grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 bg-[#D1E6FF] rounded-4xl p-8 lg:h-[240px]">

                    <div class="flex justify-center items-center lg:justify-start">
                        <img alt="photo profile" class="max-h-[180px]" :src="miembro.foto" />
                    </div>

                    <div class="flex flex-col items-center lg:items-start gap-2">
                        <h4 class="font-black border-b-black border-b-2 mb-2">{{ miembro.nombre }}</h4>
                        <span>{{ miembro.edad }}</span>
                        <span>{{ miembro.rol }}</span>
                        <span>{{ miembro.parentesco }}</span>
                    </div>
                    <div class="flex items-center">
                        <p class="text-center h-32 overflow-y-hidden">{{ miembro.descripcion }}</p>
                    </div>

                    <div class="flex justify-center items-center">
                        <img class="h-24 w-24" :src="miembro.foto" alt="icon" />
                    </div>
                </div>
            </div>
        </div>
    </WrapperScreen>
</template>

<script lang="ts">
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Button from '../components/shared/Button.vue'
import WrapperScreen from '../components/WrapperScreen.vue';
import type {Member} from "../interfaces/Member.ts";

export default {
  name: 'MembersView',

  components: {
        Button,
        SidebarComponent,
        WrapperScreen
    },
    data() {
        return {
          miembros: [] as Member[],
        }
    },
    async mounted() {
      try {
        const res = await fetch('http://localhost:3000/members');
        if (!res.ok) throw new Error('Error al cargar miembros');
        this.miembros = await res.json();
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        },
      goToAdd() {
        this.$router.push({ name: 'AddMember' })
      },
      goToDelete(){
          this.$router.push({name:'DeleteMember'})
      }
    }
}
</script>

<style scopeed></style>