<template>
    <div class="bg-white rounded-2xl shadow hover:shadow-lg transform hover:scale-[1.02] transition p-6 flex flex-col">
        <img src="https://www.teslaelectronic.com.pe/wp-content/uploads/2022/11/ESP32-CAM-ADAPTADOR.1.png"
            alt="Cámara del dispositivo" class="h-48 w-full object-cover rounded-lg mb-4" />
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Dispositivo {{ device.modelo }}</h2>

        <div class="space-y-2 text-gray-700 mb-4">
            <div class="flex items-center">
                <span class="w-32 font-medium">Modelo:</span>
                <span>{{ device.modelo }}</span>
            </div>

            <div class="flex items-center">
                <span class="w-32 font-medium">Puerta:</span>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    :class="device.puerta ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'">
                    {{ device.puerta ? 'Abierta' : 'Cerrada' }}
                </span>
            </div>

            <div class="flex items-center">
                <span class="w-32 font-medium">Firmware:</span>
                <span>{{ device.firmware }}</span>
            </div>

            <div class="flex items-center">
                <span class="w-32 font-medium">Batería:</span>
                <span>{{ device.porcentajeBateria }}%</span>
            </div>

            <div class="flex items-center">
                <span class="w-32 font-medium">Hogar:</span>
                <span>{{ device.hogarNombre }}</span>
            </div>

            <div v-if="members.length" class="mt-4">
                <span class="font-medium">Miembros habilitados:</span>
                <ul class="list-disc list-inside text-gray-600 mt-1 space-y-1 max-h-[116px] overflow-y-scroll">
                    <li v-for="miembro in members" :key="miembro.id" class="flex items-start space-x-2 pb-4">
                        <img :src="miembro.fotoPerfil" alt="Foto de perfil" class="w-8 h-8 rounded-full object-cover" />
                        <div class="">
                            <div class="font-medium">{{ miembro.nombre }} <span class="text-sm text-gray-500">({{
                                miembro.parentesco }})</span></div>
                            <div class="text-sm text-gray-500">{{ miembro.descripcion }}</div>
                            <div class="flex justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="text-[12px] font-medium">Acceso:</span>
                                    <span class="inline-block px-3 py-1 rounded-full text-xs text-[12px]"
                                        :class="miembro.estatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                        {{ miembro.estatus ? 'habilitado' : 'deshabilitado' }}
                                    </span>
                                </div>
                                <ToggleSwitch v-model="miembro.estatus" @update:modelValue="(value) => onToggleChange(value, miembro.id)" />
                           </div>
                          <img
                              :src="`https://quickchart.io/qr?text=${frontendUrl}/public/${miembro.id}&size=200`"
                              alt="QR Code"
                              class="w-25 h-25"
                          />
                          <button
                              @click="goToPublic(miembro.id)"
                              class="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                          >
                            Ver acceso
                          </button>
                        </div>

                    </li>
                </ul>
            </div>

        </div>


        <!-- Actions -->
      <div class="flex justify-center item-center">
        <button @click="$emit('enroll', device.hogarId)"
            class="flex-1 py-2 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition">
            Inscribir Miembro
        </button>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import type { MemberHome } from '../../interfaces/Member'
import type { Device } from '../../interfaces/Device';
import normalizeKeys from '../../utils/normalizeKeys';
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_API_URL;
const props = defineProps<{
    device: Device
}>()
defineEmits<{
    (e: 'enroll', hogarId: string): void
}>()

const members = ref<MemberHome[]>([])


const onToggleChange = async (value: boolean,miembroId:string) => {
    try {
        const request = {
            estatus: value,
            hogarId: props.device.hogarId,
            mienbroId: miembroId,
        }
        const updateRes = await fetch(`${backendUrl}/api/v1/miembro-hogar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })

        if (!updateRes.ok) throw new Error('Error al actualizar el estado')
        console.log('Estado actualizado:', value)
    } catch (err) {
        console.error('Fallo al cambiar el estado:', err)
    }
}


const loadMembers = async () => {
    try {
        const memRes = await fetch(`${backendUrl}/api/v1/hogares/${props.device.hogarId}/miembros`)
        if (!memRes.ok) throw new Error('Error al obtener miembros')
        const memData = await memRes.json()
        members.value = memData.map(normalizeKeys)
        console.log('Miembros cargados:', memData.map(normalizeKeys))
    } catch (err) {
        console.error('Error cargando miembros habilitados:', err)
    }
}

function goToPublic(memberId: string) {
  window.open(`${frontendUrl}/public/${memberId}`, '_blank')
}

onMounted(loadMembers)
defineExpose({ loadMembers })
</script>
<style>

</style>