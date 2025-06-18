<template>
  <WrapperScreen>
    <!-- Header -->
    <HeaderView
        :title="`Gestión de miembros`"
        subtitle="Gestiona y controla el acceso de todos los miembros que tienen permiso para acceder a tu hogar"
    >
      <template #actions>
        <Button
            _texto="Agregar Nuevo miembro"
            class="bg-blue-500 text-white font-semibold"
            @click="goToAdd"
        />
      </template>
    </HeaderView>

    <!-- Estado vacío -->
    <EmptyView
        v-if="miembros.length === 0"
        :title="`No hay miembros registrados para “${nickname}”`"
        description="Para comenzar, registra un miembro desde el panel principal."
    />

    <!-- Lista de miembros -->
    <div
        class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl"
        v-else
    >
      <h1 class="text-3xl font-semibold">Miembros</h1>
      <div class="flex flex-col gap-4 mt-4">
        <div
            v-for="miembro in miembros"
            :key="miembro.id"
            class="border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer text-xl font-light text-black grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 bg-[#D1E6FF] rounded-4xl p-8 lg:h-[240px]"
        >
          <div class="flex justify-center items-center lg:justify-start">
            <img alt="photo profile" class="max-h-[180px]" :src="miembro.fotoPerfil" />
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

          <div class="flex flex-col gap-4 justify-center">

            <router-link :to="`/members/edit/${miembro.id}`" class="block w-full sm:w-auto">
              <Button
                  _texto="Editar Hogar"
                  class="font-semibold w-full"
              />
            </router-link>
            <router-link :to="`/members/delete/${miembro.id}`"  class="block w-full sm:w-auto">
              <Button
                  _texto="Eliminar Hogar"
                  class="font-semibold w-full  "
              />
            </router-link>


          </div>

        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import HeaderView from '../components/ui/HeaderView.vue';
import EmptyView from '../components/ui/EmptyView.vue';
import Button from '../components/shared/Button.vue';
import type { Member } from '../interfaces/Member.ts';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const nickname = localStorage.getItem('nickname') || '';

const miembros = ref<Member[]>([]);
const router = useRouter();

const loadMembers = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/miembros/propietario/${nickname}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    miembros.value = raw.map((item: any) => ({
      id: item.Id,
      nombre: item.Nombre,
      edad: item.Edad,
      parentesco: item.Parentesco,
      descripcion: item.Descripcion,
      fotoPerfil: item.FotoPerfil,
      userNickname: item.UserId,
    }));
  } catch (err) {
    console.error('Error al cargar miembros:', err);
    miembros.value = [];
  }
};

onMounted(loadMembers);

const goToAdd = () => router.push({ name: 'AddMember' });

</script>

<style scoped></style>
