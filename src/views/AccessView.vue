<template>
  <WrapperScreen>
    <HeaderView
        title="Gestión de Dispositivos"
        subtitle="Gestiona tus accesos IoT"
    />

    <EmptyView
        v-if="dispositivos.length === 0"
        title="No hay dispositivos registrados"
        description="Para comenzar, registra un hogar desde el panel principal."
    />

    <div class="max-w-6xl mx-auto py-8 px-4">
      <div class="bg-white p-6 rounded-2xl shadow space-y-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-3xl font-semibold">Dispositivos</h1>
        </div>

        <div class="bg-white p-4 rounded-xl shadow space-y-6">
          <!-- Mobile Cards -->
          <div class="block sm:hidden space-y-4">
            <div
                v-for="dis in dispositivos"
                :key="dis.id"
                class="p-4 border border-gray-200 rounded-lg"
            >
              <p><span class="font-medium">Modelo:</span> {{ dis.modelo }}</p>
              <p><span class="font-medium">Firmware:</span> {{ dis.firmware }}</p>
              <p><span class="font-medium">Batería:</span> {{ dis.porcentajeBateria }}%</p>
              <p><span class="font-medium">Puerta Abierta:</span>
                <span :class="dis.puerta ? 'text-green-600' : 'text-red-600'">
                  {{ dis.puerta ? 'Sí' : 'No' }}
                </span>
              </p>
              <p><span class="font-medium">Hogar:</span> {{ dis.hogarNombre }}</p>
            </div>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="min-w-full bg-white text-left rounded-lg shadow-sm">
              <thead>
              <tr class="border-b">
                <th class="px-4 py-2">Modelo</th>
                <th class="px-4 py-2">Firmware</th>
                <th class="px-4 py-2">Batería</th>
                <th class="px-4 py-2">Puerta</th>
                <th class="px-4 py-2">Hogar</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="dis in dispositivos"
                  :key="dis.id"
                  class="border-t hover:bg-gray-50"
              >
                <td class="px-4 py-2">{{ dis.modelo }}</td>
                <td class="px-4 py-2">{{ dis.firmware }}</td>
                <td class="px-4 py-2">{{ dis.porcentajeBateria }}%</td>
                <td class="px-4 py-2">
                    <span :class="dis.puerta ? 'text-green-600' : 'text-red-600'">
                      {{ dis.puerta ? 'Sí' : 'No' }}
                    </span>
                </td>
                <td class="px-4 py-2">{{ dis.hogarNombre }}</td>
              </tr>
              <tr v-if="dispositivos.length === 0">
                <td colspan="5" class="px-4 py-2 text-center text-gray-500">
                  No hay dispositivos registrados.
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
import { ref, onMounted } from 'vue'
import normalizeKeys from '../utils/normalizeKeys'
import type {Access} from "../interfaces/Access.ts";


const dispositivos = ref<Access[]>([])
const backendUrl = import.meta.env.VITE_BACKEND_API_URL
const nickname = localStorage.getItem('nickname') ?? ''

const loadDispositivos = async () => {
  if (!nickname) return
  try {
    const res = await fetch(`${backendUrl}/api/v1/dispositivos/${nickname}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    dispositivos.value = data.map(normalizeKeys);
  } catch (err) {
    console.error('Error al cargar dispositivos:', err)
  }
}

onMounted(loadDispositivos)
</script>

<style scoped>
/* Custom styles if needed */
</style>
