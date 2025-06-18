<template>
  <WrapperScreen>



    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Agregar Miembro </h1>
      <div class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Agregar Miembro</h2>
        <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
          <InputTexto
              label="Nombre"
              v-model="member.nombre"
              required
          />
          <InputTexto
              label="Edad"
              type="number"
              v-model="member.edad"
              min="0"
              required
          />
          <InputTexto
              label="Parentesco"
              v-model="member.parentesco"
              required
          />
          <InputTexto
              label="Descripcion"
              v-model="member.descripcion"
              required
          />
          <InputTexto
              label="URL FotoPerfil"
              v-model="member.fotoPerfil"
              required
          />
<!--          <InputTexto
              label="DNI"
              v-model="member.dni"
              required
          />-->
          <div class="flex justify-center mt-4 space-x-4">
            <Button
                type="submit"
                _texto="Guardar Cambios"
                class="bg-green-600 "
            />
            <Button
                _texto="Cancelar"
                type="button"
                @click="cancel"
                class="bg-gray-500 "
            />

          </div>



        </form>
      </div>
    </div>


  </WrapperScreen>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { useRouter } from 'vue-router'
import type {Member} from "../interfaces/Member.ts";
import InputTexto from "../components/shared/InputTexto.vue";

const initalMember={
  id: '',
  nombre: '',
  edad: 0,
  parentesco: '',
  descripcion: '',
  fotoPerfil: '',
  dni:''
}
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const nickname = localStorage.getItem('nickname')??"";
export default defineComponent({
  name: 'AddMemberView',
  components: {InputTexto},
  setup() {
    const router = useRouter()

    const member = ref<Member>(initalMember);

    const cancel = () => {
      router.push({ name: 'Members' });
    };

    const submitForm = async () => {
      try {
        const body=member.value;
        const request={...body,userNickname:nickname}
        console.log(request)
        const res = await fetch(
            `${backendUrl}/api/v1/mienbros`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(request),
            }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        alert('Miembro agregado correctamente')
        await router.push({ name: 'Members' })
      } catch (err) {
        console.error(err)
        alert('Error al agregar el miembro')
      }
    }

    return { member, submitForm,cancel }
  },
})
</script>

<style scoped>
</style>
