<template>
  <WrapperScreen>
    <div
        class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl"
    >
      <h1 class="text-3xl font-semibold">Miembros</h1>
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <p class="lg:w-md text-xl font-light">
          Gestiona y controlar el acceso de todos los miembros que tienen permiso
          para acceder a tu hogar
        </p>
        <div class="flex flex-col lg:w-md gap-4">
          <Button class="font-semibold" _texto="+ Agregar miembro" @click="goToAdd" />
          <Button class="font-semibold" _texto="* Editar miembro" @click="goToEdit" />
          <Button class="font-semibold" _texto="- Eliminar miembro" @click="goToDelete" />
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-8">
        <div
            v-for="miembro in miembros"
            :key="miembro.id"
            class="border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer text-2xl font-light text-black grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 bg-[#D1E6FF] rounded-4xl p-8 lg:h-[240px]"
        >
          <div class="flex justify-center items-center lg:justify-start">
            <img
                alt="photo profile"
                class="max-h-[180px]"
                :src="miembro.fotoPerfil"
            />
          </div>

          <div class="flex flex-col items-center lg:items-start gap-2">
            <h4 class="font-black border-b-black border-b-2 mb-2">
              {{ miembro.nombre }}
            </h4>
            <span>Edad: {{ miembro.edad }}</span>
            <span v-if="miembro.parentesco">Parentesco: {{ miembro.parentesco }}</span>
          </div>

          <div class="flex items-center">
            <p class="text-center h-32 overflow-y-hidden">
              {{ miembro.descripcion }}
            </p>
          </div>

          <div class="flex justify-center items-center">
            <img class="h-24 w-24" :src="miembro.fotoPerfil" alt="icon" />
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../components/shared/Button.vue'
import WrapperScreen from '../components/WrapperScreen.vue'
import type {Member} from "../interfaces/Member.ts";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export default defineComponent({
  name: 'MembersView',
  components: { Button, WrapperScreen },
  data() {
    return {
      miembros: [] as Member[]
    }
  },
  async mounted() {
    try {
      const nickname = localStorage.getItem('nickname');
      const res = await fetch(
          `${backendUrl}/api/v1/miembros/propietario/${nickname}`
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const raw = (await res.json()) as Array<Record<string, any>>
      this.miembros = raw.map(item => ({
        id: item.Id as string,
        nombre: item.Nombre as string,
        edad: item.Edad as number,
        parentesco: item.Parentesco as string,
        descripcion: item.Descripcion as string,
        fotoPerfil: item.FotoPerfil as string,
        userNickname: item.UserId as string
      }))
    } catch (err) {
      console.error('Error al cargar miembros:', err)
    }
  },
  methods: {
    goToAdd() {
      this.$router.push({ name: 'AddMember' })
    },
    goToEdit() {
      this.$router.push({ name: 'EditMember' })
    },
    goToDelete() {
      this.$router.push({ name: 'DeleteMember' })
    }
  }
})
</script>

<style scoped>
</style>
