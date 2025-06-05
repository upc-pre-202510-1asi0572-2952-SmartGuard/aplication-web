<template>
  <WrapperScreen>
    <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <!-- Header -->
      <div class="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800">Gestión de Dispositivos</h1>
          <p class="mt-1 text-gray-600">Administra tus dispositivos IoT y controla el acceso de tu hogar.</p>
        </div>
        <div class="mt-4 md:mt-0 flex space-x-4">
        </div>
      </div>

      <!-- Device Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="device in devices"
            :key="device.id"
            class="bg-white rounded-2xl shadow hover:shadow-lg transform hover:scale-[1.02] transition p-6 flex flex-col"
        >
          <img
              :src="device.cameraFeed"
              alt="Cámara del dispositivo"
              class="h-48 w-full object-cover rounded-lg mb-4"
          />
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ device.name }}</h2>
          <div class="space-y-2 text-gray-700 mb-4">
            <div class="flex items-center">
              <span class="w-32 font-medium">Movimiento:</span>
              <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  :class="device.motionDetected ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
              >
                {{ device.motionDetected ? 'Detectado' : 'Sin movimiento' }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="w-32 font-medium">Puerta:</span>
              <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  :class="device.ledOn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
              >
                {{ device.ledOn ? 'Abierta' : 'Cerrada' }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="w-32 font-medium">Firmware:</span>
              <span>{{ device.firmware }}</span>
            </div>
            <div class="flex items-center">
              <span class="w-32 font-medium">Batería:</span>
              <span>{{ device.battery }}%</span>
            </div>
            <div v-if="device.enrolledUsers?.length" class="mt-4">
              <span class="font-medium">Usuarios inscritos:</span>
              <ul class="list-disc list-inside text-gray-600 mt-1">
                <li v-for="user in device.enrolledUsers" :key="user">{{ user }}</li>
              </ul>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-auto flex space-x-3">
            <button
                @click="enrollExistingUser(device.id)"
                class="flex-1 py-2 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition"
            >
              Inscribir Miembro
            </button>
            <button
                @click="toggleDoor(device.id)"
                class="flex-1 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
            >
              {{ device.ledOn ? 'Bloquear' : 'Abrir' }}
            </button>
            <button
                v-if="device.enrolledUsers?.length"
                @click="removeEnrolledUser(device.id)"
                class="flex-1 py-2 bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition"
            >
              Eliminar Inscrito
            </button>
          </div>
        </div>
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
            <button @click="cancelEnroll" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <!-- Remove Modal -->
      <div v-if="showRemoveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
          <h3 class="text-xl font-semibold mb-4">Eliminar miembro inscrito</h3>
          <select v-model="selectedEnrolledUser" class="w-full p-2 border rounded mb-4">
            <option disabled value="">-- Elige usuario --</option>
            <option v-for="user in currentDevice.enrolledUsers" :key="user" :value="user">{{ user }}</option>
          </select>
          <div class="flex justify-end space-x-4">
            <button @click="confirmRemove" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Eliminar
            </button>
            <button @click="cancelRemove" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import type {Member} from "../interfaces/Member.ts";
import WrapperScreen from "../components/WrapperScreen.vue";
import type {Device} from "../interfaces/Device.ts";


export default defineComponent({
  name: 'DeviceManagementView',
  components: { WrapperScreen },
  setup() {
    const devices = ref<Array<Device & { enrolledUsers?: string[] }>>([])
    const members = ref<Member[]>([])
    const showEnrollModal = ref(false)
    const showRemoveModal = ref(false)
    const currentDeviceId = ref<number | null>(null)
    const selectedMemberId = ref<number | null>(null)
    const selectedEnrolledUser = ref<string | null>(null)

    onMounted(async () => {
      try {
        const [devRes, memRes] = await Promise.all([
          fetch('https://fake-api-smartguard.vercel.app/devices'),
          fetch('https://fake-api-smartguard.vercel.app/members')
        ])
        if (!devRes.ok || !memRes.ok) throw new Error('Error al cargar datos')

        const devData: Array<Device & { enrolledUsers?: string[] }> = await devRes.json()
        devices.value = devData.map(d => ({
          ...d,
          enrolledUsers: Array.isArray(d.enrolledUsers) ? d.enrolledUsers! : []
        }))
        members.value = await memRes.json()
      } catch (e) {
        console.error(e)
      }
    })

    const currentDevice = computed(() =>
        devices.value.find(d => d.id === currentDeviceId.value) || { enrolledUsers: [] }
    )

    const toggleDoor = (id: number) => {
      const device = devices.value.find(d => d.id === id)
      if (device) device.ledOn = !device.ledOn
    }

    const enrollExistingUser = (id: number) => {
      currentDeviceId.value = id
      selectedMemberId.value = null
      showEnrollModal.value = true
    }

    const confirmEnroll = async () => {
      const device = devices.value.find(d => d.id === currentDeviceId.value)!
      const member = members.value.find(m => m.id === selectedMemberId.value)!

      // Asegúrate de que existe el array
      if (!Array.isArray(device.enrolledUsers)) {
        device.enrolledUsers = []
      }
      // Duplicados
      if (device.enrolledUsers.includes(member.nombre)) {
        alert('Este usuario ya se encuentra registrado')
      } else {
        // 1) Añade localmente
        device.enrolledUsers.push(member.nombre)

        // 2) Graba TO DO el dispositivo con PUT
        await fetch(`https://fake-api-smartguard.vercel.app/devices/${device.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(device)     // <–– enviamos el objeto completo, incluido enrolledUsers
        })

        alert(`Miembro ${member.nombre} inscrito en ${device.name}`)
      }

      showEnrollModal.value = false
    }


    const cancelEnroll = () => { showEnrollModal.value = false }

    const removeEnrolledUser = (id: number) => {
      currentDeviceId.value = id
      selectedEnrolledUser.value = null
      showRemoveModal.value = true
    }

    const confirmRemove = async () => {
      const device = devices.value.find(d => d.id === currentDeviceId.value)!
      const name = selectedEnrolledUser.value!
      // Filtramos
      device.enrolledUsers = device.enrolledUsers!.filter(u => u !== name)

      // Persistimos con PUT
      await fetch(`https://fake-api-smartguard.vercel.app/devices/${device.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device)
      })

      alert(`Miembro ${name} eliminado de ${device.name}`)
      showRemoveModal.value = false
    }

    const cancelRemove = () => { showRemoveModal.value = false }
    return {
      devices,
      members,
      showEnrollModal,
      showRemoveModal,
      selectedMemberId,
      selectedEnrolledUser,
      enrollExistingUser,
      confirmEnroll,
      cancelEnroll,
      removeEnrolledUser,
      confirmRemove,
      cancelRemove,
      toggleDoor,
      currentDevice
    }
  }
})
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
