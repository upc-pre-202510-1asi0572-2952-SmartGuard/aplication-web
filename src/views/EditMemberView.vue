<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Miembro por ID</h1>
      <div class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Editando Miembro</h2>
        <form @submit.prevent="onUpdateMember" class="grid grid-cols-1 gap-4">
          <!-- Nombre -->
          <InputTexto
              label="Nombre"
              v-model="member.nombre"
              required
          />

          <!-- Edad -->
          <InputTexto
              label="Edad"
              type="number"
              v-model.number="member.edad"
              min="0"
              required
          />

          <!-- Parentesco -->
          <InputTexto
              label="Parentesco"
              v-model="member.parentesco"
          />

          <!-- Descripción -->
          <div class="form-group">
            <label class="mb-1 font-medium">Descripción</label>
            <textarea
                v-model="member.descripcion"
                rows="3"
                required
                class="input-box textarea-box"
            ></textarea>
          </div>
<!--          <InputTexto
              label="DNI"
              v-model="member.dni"
              required
          />-->
          <!-- FotoPerfil -->
          <InputTexto
              label="URL FotoPerfil"
              v-model="member.fotoPerfil"
              required
          />
          <img v-if="member.fotoPerfil" :src="member.fotoPerfil" alt="Foto perfil" class="w-52 h-36 object-cover rounded mt-2" />
          <!-- Botones -->
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
import { defineComponent, ref } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import WrapperScreen from "../components/WrapperScreen.vue";
import InputTexto from "../components/shared/InputTexto.vue";

import normalizeKeys from "../utils/normalizeKeys.ts";
import type {Member} from "../interfaces/Member.ts";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const initalMember={
  id: '',
  nombre: '',
  edad: 0,
  parentesco: '',
  descripcion: '',
  fotoPerfil: '',
  dni:''
}
export default defineComponent({
  name: 'EditMemberView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedMemberId = route.params.id;
    const errorMsg = ref<string>('');
    const member = ref<Member>(initalMember);

    const loadSelectedMember = async () => {
      errorMsg.value = '';
      if (!selectedMemberId) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }
      try {
        const resMem = await fetch(
            `${backendUrl}/api/v1/miembroMysql/${selectedMemberId}`
        );
        if (resMem.status === 404) {
          errorMsg.value = `No existe un miembro con ID ${selectedMemberId}.`;
          return;
        }
        if (!resMem.ok) throw new Error(`HTTP ${resMem.status}`);
        const memberData:Member = await resMem.json();
        member.value = normalizeKeys(memberData);

      } catch (e) {
        errorMsg.value = 'Error al cargar el miembro.';
        console.error(e);
      }
    };

    const onUpdateMember = async () => {

      try {
        const request = member.value;
        const res = await fetch(
            `${backendUrl}/api/v1/miembroMysql`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(request),
            }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('Miembro actualizado correctamente.');
        router.push({ name: 'Members' });
      } catch (e) {
        errorMsg.value = 'Error al guardar cambios.';
        console.error(e);
      }
    };

    const cancel = () => {
      router.push({ name: 'Members' });
    };

    loadSelectedMember();

    return {
      errorMsg,
      member,
      loadSelectedMember,
      onUpdateMember,
      cancel
    };
  }
});
</script>

<style scoped>
.input-box {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
}

.textarea-box {
  /* Mismo estilo que inputs, altura ajustable */
  resize: vertical;
  min-height: 4rem;
}

.input-box:focus {
  outline: none;
  border-color: #3182ce;
}
</style>
