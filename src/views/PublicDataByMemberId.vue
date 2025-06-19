<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <h1 class="text-center text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-4">FaceLoock Acceso Público</h1>

      <h2 class="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">Estado de Acceso del Miembro</h2>

      <div v-if="loading" class="text-center text-gray-600">Cargando datos...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

      <div v-else-if="member">
        <div class="mb-4 space-y-1 text-gray-700">
          <p><strong class="text-gray-800">Nombre:</strong> {{ member.MienbroNombre }}</p>
          <p><strong class="text-gray-800">Edad:</strong> {{ member.Edad }} años</p>
          <p><strong class="text-gray-800">Parentesco:</strong> {{ member.Parentesco }}</p>
          <p><strong class="text-gray-800">Hogar:</strong> {{ member.HogarNombre }}</p>
          <p><strong class="text-gray-800">Tipo de Hogar:</strong> {{ member.TipoHogar }}</p>

        </div>
        <div class="flex justify-center mb-4">
          <img
              :src="member.FotoPerfil"
              alt="Foto Perfil"
              class="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <div class="text-center">
          <p><strong class="text-gray-800">Estado para acceso:</strong></p>


          <span
              class="inline-block px-4 py-2 rounded-full font-semibold"
              :class="isEnabled ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'"
          >
            {{ isEnabled ? 'HABILITADO' : 'DESHABILITADO' }}
          </span>
        </div>
      </div>

      <div v-else class="text-center text-gray-600">Sin datos para mostrar.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

interface MiembroTemporal {
  MienbroNombre: string
  Parentesco: string
  Edad: number
  FotoPerfil: string
  Estatus: number | boolean
  HogarNombre: string
  TipoHogar: string
}

const route = useRoute()
const id = route.params.id as string
const backendUrl = import.meta.env.VITE_BACKEND_API_URL as string

const member = ref<MiembroTemporal | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const isEnabled = computed(() => member.value ? Boolean(member.value.Estatus) : false)

onMounted(async () => {
  try {
    const res = await fetch(
        `${backendUrl}/api/v1/mienbroTemporal/${encodeURIComponent(id)}`
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    member.value = await res.json() as MiembroTemporal
  } catch (e: any) {
    console.error('Error cargando miembro temporal:', e)
    error.value = 'No se pudo cargar la información.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
