<template>
  <WrapperScreen>
    <div class="max-w-6xl mx-auto py-8 px-4">
      <!-- Main Card -->
      <div class="bg-white p-6 rounded-2xl shadow space-y-8">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-3xl font-semibold">Accesos</h1>
          <button
              @click="openModal"
              class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Solicitar Acceso
          </button>
        </div>

        <!-- Accesses Section Card -->
        <div class="bg-white p-4 rounded-xl shadow space-y-6">
          <!-- Mobile Cards -->
          <div class="block sm:hidden space-y-4">
            <div
                v-for="acc in accesses"
                :key="acc.id"
                class="p-4 border border-gray-200 rounded-lg"
            >
              <p><span class="font-medium">Usuario:</span> {{ acc.memberName }}</p>
              <p><span class="font-medium">Dispositivo:</span> {{ acc.deviceName }}</p>
              <p><span class="font-medium">Fecha / Hora:</span> {{ formatDate(acc.timestamp) }}</p>
              <p>
                <span class="font-medium">Resultado:</span>
                <span :class="acc.success ? 'text-green-600' : 'text-red-600'">
                  {{ acc.success ? 'Permitido' : 'Denegado' }}
                </span>
              </p>
            </div>
            <div v-if="accesses.length === 0" class="text-center text-gray-500">
              No hay accesos registrados.
            </div>
          </div>

          <div class="hidden sm:block overflow-x-auto">
            <table class="min-w-full bg-white text-left rounded-lg shadow-sm">
              <thead>
              <tr class="border-b">
                <th class="px-4 py-2">Usuario</th>
                <th class="px-4 py-2">Dispositivo</th>
                <th class="px-4 py-2">Fecha / Hora</th>
                <th class="px-4 py-2">Resultado</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="acc in accesses"
                  :key="acc.id"
                  class="border-t hover:bg-gray-50"
              >
                <td class="px-4 py-2">{{ acc.memberName }}</td>
                <td class="px-4 py-2">{{ acc.deviceName }}</td>
                <td class="px-4 py-2">{{ formatDate(acc.timestamp) }}</td>
                <td class="px-4 py-2">
                    <span
                        :class="acc.success ? 'text-green-600' : 'text-red-600'"
                        class="font-medium"
                    >
                      {{ acc.success ? 'Permitido' : 'Denegado' }}
                    </span>
                </td>
              </tr>
              <tr v-if="accesses.length === 0">
                <td colspan="4" class="px-4 py-2 text-center text-gray-500">
                  No hay accesos registrados.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Solicitar Acceso</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">Miembro</label>
            <select
                v-model="selMember"
                class="w-full border rounded px-3 py-2"
            >
              <option disabled value="">-- Elige miembro --</option>
              <option v-for="m in members" :key="m.id" :value="m.id">{{ m.nombre }}</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Dispositivo</label>
            <select
                v-model="selDevice"
                class="w-full border rounded px-3 py-2"
            >
              <option disabled value="">-- Elige dispositivo --</option>
              <option v-for="d in devices" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
              @click="confirmAccess"
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Solicitar
          </button>
          <button
              @click="closeModal"
              class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Member } from "../interfaces/Member.ts"
import type { Device } from "../interfaces/Device.ts"
import WrapperScreen from "../components/WrapperScreen.vue"

interface Access {
  id: number
  memberId: number
  memberName: string
  deviceId: number
  deviceName: string
  timestamp: string
  success: boolean
}

export default defineComponent({
  name: 'AccessView',
  components: { WrapperScreen },
  setup() {
    const members = ref<Member[]>([])
    const devices = ref<Device[]>([])
    const accesses = ref<Access[]>([])
    const showModal = ref(false)
    const selMember = ref<number | null>(null)
    const selDevice = ref<number | null>(null)

    onMounted(async () => {
      const [mRes, dRes, aRes] = await Promise.all([
        fetch('https://fake-api-smartguard.vercel.app/members'),
        fetch('https://fake-api-smartguard.vercel.app/devices'),
        fetch('https://fake-api-smartguard.vercel.app/accesses')
      ])
      if (mRes.ok) members.value = await mRes.json()
      if (dRes.ok) devices.value = await dRes.json()
      if (aRes.ok) accesses.value = await aRes.json()
    })

    const openModal = () => { showModal.value = true; selMember.value = null; selDevice.value = null }
    const closeModal = () => { showModal.value = false }

    const formatDate = (iso: string) => new Date(iso).toLocaleString()

    const confirmAccess = async () => {
      if (!selMember.value || !selDevice.value) {
        alert('Selecciona miembro y dispositivo')
        return
      }
      const member = members.value.find(m => m.id === selMember.value)!
      const device = devices.value.find(d => d.id === selDevice.value)!
      const success = device.enrolledUsers?.includes(member.nombre) ?? false
      const newAccess: Access = {
        id: accesses.value.length ? Math.max(...accesses.value.map(a => a.id)) + 1 : 1,
        memberId: member.id,
        memberName: member.nombre,
        deviceId: device.id,
        deviceName: device.name,
        timestamp: new Date().toISOString(),
        success
      }
      accesses.value.push(newAccess)
      await fetch('https://fake-api-smartguard.vercel.app/accesses', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAccess)
      })
      alert(success ? 'Acceso permitido' : 'Acceso denegado')
      closeModal()
    }

    return {
      members, devices, accesses,
      showModal, selMember, selDevice,
      openModal, closeModal, confirmAccess, formatDate
    }
  }
})
</script>

<style scoped>
div[role="list"]::-webkit-scrollbar, table::-webkit-scrollbar { width: 6px; height: 6px }
div[role="list"]::-webkit-scrollbar-thumb, table::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 3px }
</style>
