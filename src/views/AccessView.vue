<template>
  <WrapperScreen>
    <HeaderView
        title="Gestión de Accesos"
        subtitle="Gestiona tus accesos IoT"
    />

    <EmptyView
        v-if="accesos.length === 0"
        title="No hay registros de acceso"
        description="Aún no se han generado eventos de acceso."
    />

    <div class="max-w-6xl mx-auto py-8 px-4" v-if="accesos.length > 0">
      <div class="bg-white p-6 rounded-2xl shadow space-y-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-3xl font-semibold">Historial de Accesos</h1>
        </div>

        <div class="bg-white p-4 rounded-xl shadow space-y-6">
          <!-- Mobile Cards -->
          <div class="block sm:hidden space-y-4">
            <div
                v-for="acc in accesos"
                :key="acc.id"
                class="p-4 border border-gray-200 rounded-lg"
            >
              <p><span class="font-medium">Miembro:</span> {{ acc.nombreMienbro }}</p>
              <p><span class="font-medium">Dispositivo:</span> {{ acc.dispositivo }}</p>
              <p><span class="font-medium">Resultado:</span> {{ acc.resultado }}</p>
              <p><span class="font-medium">Hogar:</span> {{ acc.nombreHogar }}</p>
              <p><span class="font-medium">Dirección:</span> {{ acc.direccion }}</p>
              <p><span class="font-medium">Fecha:</span> {{ formatFecha(acc.fechaHora) }}</p>
            </div>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="min-w-full bg-white text-left rounded-lg shadow-sm">
              <thead>
              <tr class="border-b">
                <th class="px-4 py-2">Miembro</th>
                <th class="px-4 py-2">Dispositivo</th>
                <th class="px-4 py-2">Resultado</th>
                <th class="px-4 py-2">Hogar</th>
                <th class="px-4 py-2">Dirección</th>
                <th class="px-4 py-2">Fecha</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="acc in accesos"
                  :key="acc.id"
                  class="border-t hover:bg-gray-50"
              >
                <td class="px-4 py-2">{{ acc.nombreMienbro }}</td>
                <td class="px-4 py-2">{{ acc.dispositivo }}</td>
                <td class="px-4 py-2">{{ acc.resultado }}</td>
                <td class="px-4 py-2">{{ acc.nombreHogar }}</td>
                <td class="px-4 py-2">{{ acc.direccion }}</td>
                <td class="px-4 py-2">{{ formatFecha(acc.fechaHora) }}</td>
              </tr>
              <tr v-if="accesos.length === 0">
                <td colspan="6" class="px-4 py-2 text-center text-gray-500">
                  No hay accesos registrados.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import normalizeKeys from '../utils/normalizeKeys';
import type { Access } from '../interfaces/Access.ts';

const accesos = ref<Access[]>([]);
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const nickname = localStorage.getItem('nickname') ?? '';

const loadAccesos = async () => {
  if (!nickname) return;
  try {
    const res = await fetch(`${backendUrl}/api/v1/accesos/${nickname}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    accesos.value = data.map(normalizeKeys);
  } catch (err) {
    console.error('Error al cargar accesos:', err);
  }
};

// Formatea la fecha ISO a formato legible: "dd/mm/yyyy hh:mm"
function formatFecha(fechaIso: string): string {
  const date = new Date(fechaIso);
  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

onMounted(loadAccesos);
</script>

<style scoped>
/* Estilos personalizados si se requieren */
</style>
