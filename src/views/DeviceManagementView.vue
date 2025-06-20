<template>
  <WrapperScreen>
      <!-- Header -->
      <HeaderView
          title="Gestión de Dispositivos"
          subtitle="Administra tus dispositivos IoT y controla el acceso de tu hogar."
      />
    <EmptyView
        v-if="devices.length === 0"
        title="No hay dispositivos registrados "
        description="Para comenzar, registra un hogar desde el panel principal."
    />


      <!-- Device Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeviceCard v-for="device in devices" :key="device.id" :ref="el => registerDeviceRef(device.hogarId, el)"
          :device="device" @enroll="openEnrollModal(device.hogarId)" />
      </div>

      <!-- Enroll Modal -->
      <div v-if="showEnrollModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
          <h3 class="text-xl font-semibold mb-4">Selecciona un miembro</h3>
          <select v-model="selectedMemberId" class="w-full p-2 border rounded mb-4">
            <option disabled value="">-- Elige miembro --</option>
            <option v-for="m in members" :key="m.id" :value="m.id">{{ m.nombre }}</option>
          </select>
          <div class="flex justify-end space-x-4">
            <button @click="confirmEnroll" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Confirmar
            </button>
            <button @click="closeEnrollModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </div>
      </div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import WrapperScreen from '../components/WrapperScreen.vue'
import DeviceCard from '../components/device/DeviceCard.vue'
import type { Device } from '../interfaces/Device'
import type { Member } from '../interfaces/Member'
import normalizeKeys from '../utils/normalizeKeys'
import HeaderView from "../components/ui/HeaderView.vue";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL
const nickName = localStorage.getItem('nickname');
// Estado
const devices = ref<Device[]>([])
const members = ref<Member[]>([])
const showEnrollModal = ref(false)
const selectedMemberId = ref<string | null>(null)
const selectedHomeId = ref<string | null>(null)

// Tipo del componente hijo expuesto
type DeviceCardInstance = InstanceType<typeof DeviceCard> & {
  loadMembers: () => Promise<void>
}

// Mapa hogarId → instancia del componente
const deviceCardMap = new Map<string, DeviceCardInstance>()

// Cargar datos al iniciar
onMounted(async () => {
  try {
    const [devRes, memRes] = await Promise.all([
      fetch(`${backendUrl}/api/v1/dispositivos/${nickName}`),
      fetch(`${backendUrl}/api/v1/miembros/propietario/${nickName}`)
    ])
    if (!devRes.ok || !memRes.ok) throw new Error('Error al cargar datos')
    devices.value = (await devRes.json()).map(normalizeKeys)
    members.value = (await memRes.json()).map(normalizeKeys)
  } catch (err) {
    console.error('Error al cargar datos:', err)
  }
})

function registerDeviceRef(hogarId: string, el: unknown) {
  if (el && typeof el === 'object' && '$el' in el) {
    deviceCardMap.set(hogarId, el as DeviceCardInstance)
  }
}

// Abrir modal
function openEnrollModal(homeId: string) {
  selectedHomeId.value = homeId
  showEnrollModal.value = true
}

// Cerrar modal
function closeEnrollModal() {
  selectedMemberId.value = null
  selectedHomeId.value = null
  showEnrollModal.value = false
}

// Confirmar inscripción y refrescar miembros
async function confirmEnroll() {
  if (!selectedMemberId.value || !selectedHomeId.value) {
    alert('Por favor, selecciona un miembro para inscribir.')
    return
  }

  try {
    const request = {
      mienbroId: selectedMemberId.value,
      hogarId: selectedHomeId.value,
      estatus: true,
    }

    const res = await fetch(`${backendUrl}/api/v1/asociar_mienbro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })

    if (!res.ok) throw new Error('Error en la inscripción')

    // Refrescar miembros del dispositivo
    const cardInstance = deviceCardMap.get(selectedHomeId.value)
    await cardInstance?.loadMembers()

    alert('Miembro inscrito correctamente.')
    closeEnrollModal()
  } catch (err) {
    console.error('Error al inscribir miembro:', err)
    alert('!Miembro ya asociado! no se puede inscribir al  miembro.')
  }
}
</script>

<style scoped>
.grid::-webkit-scrollbar {
  width: 8px;
}

.grid::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 4px;
}
</style>
