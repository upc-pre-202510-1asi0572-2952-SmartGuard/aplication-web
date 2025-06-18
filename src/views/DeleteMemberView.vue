<template>
  <WrapperScreen>
    <div class="mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6 text-red-600">
        Eliminar Miembro
      </h1>
      <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold truncate">{{ member.nombre }}</h2>

        <div class="text-sm w-full flex justify-between gap-4">
          <span class="font-bold">Edad:</span>
          <span>{{ member.edad }}</span>
        </div>

        <div class="text-sm w-full flex justify-between gap-4" v-if="member.parentesco">
          <span class="font-bold">Parentesco:</span>
          <span>{{ member.parentesco }}</span>
        </div>

        <div class="text-sm w-full flex justify-between gap-4">
          <span class="font-bold">Descripción:</span>
          <span class="text-right">{{ member.descripcion }}</span>
        </div>

        <img
            v-if="member.fotoPerfil"
            :src="member.fotoPerfil"
            :alt="`Foto de ${member.nombre}`"
            class="w-full h-48 object-cover rounded mt-2"
        />

        <div class="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <Button
              @click="onDeleteMember"
              class="bg-red-600 font-semibold"
              _texto="Confirmar Eliminación"
          />
          <Button @click="cancel" _texto="Cancelar" class="bg-gray-300 font-bold" />
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import Button from '../components/shared/Button.vue';
import type { Member } from '../interfaces/Member';
import normalizeKeys from '../utils/normalizeKeys.ts';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

const initialMember: Member = {
  id: '',
  nombre: '',
  edad: 0,
  parentesco: '',
  descripcion: '',
  fotoPerfil: '',
  userNickname: '',
};

export default defineComponent({
  name: 'DeleteMemberView',
  components: { WrapperScreen, Button },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const memberId = route.params.id;
    const errorMsg = ref('');
    const member = ref<Member>(initialMember);

    async function loadSelectedMember() {
      errorMsg.value = '';
      if (!memberId) {
        errorMsg.value = 'ID de miembro inválido.';
        return;
      }
      try {
        const res = await fetch(`${backendUrl}/api/v1/miembroMysql/${memberId}`);
        if (res.status === 404) {
          errorMsg.value = `No existe un miembro con ID ${memberId}.`;
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const memberData: Member = await res.json();
        member.value = normalizeKeys(memberData);
      } catch (e) {
        errorMsg.value = 'Error al cargar el miembro.';
        console.error(e);
      }
    }

    const onDeleteMember = async () => {
      if (!memberId) return;
      if (!confirm(`¿Eliminar el miembro “${member.value.nombre}”?`)) return;
      try {
        const res = await fetch(`${backendUrl}/api/v1/miembroMysql/${memberId}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('👤 Miembro eliminado correctamente.');
        router.push({ name: 'Members' });
      } catch (err) {
        errorMsg.value = 'Error al eliminar el miembro.';
        console.error(err);
      }
    };

    const cancel = () => {
      router.push({ name: 'Members' });
    };

    loadSelectedMember();

    return {
      member,
      errorMsg,
      onDeleteMember,
      cancel
    };
  }
});
</script>

<style scoped>
/* Usa clases utilitarias de Tailwind */
</style>