<template>
    <div class="flex flex-col md:flex-row justify-between items-start gap-10">
        <div class="flex flex-col justify-between gap-10">
            <h1 class="text-4xl font-semibold">Estadísticas</h1>
            <span class=" text-sm text-gray-600 max-w-80">Resumen de actividad y estadísticas del sistema
                asegurador</span>
        </div>

        <div class="flex flex-col gap-4 md:gap-10"> <Select v-model="homeSelected" :options="homes" optionLabel="name"
                placeholder="Selecciona un Hogar" class="w-full md:w-56" />
            <Select v-model="diaSelected" :options="dias" optionLabel="name" placeholder="Selecciona un período"
                class="w-full md:w-56" />
        </div>
    </div>
</template>

<script>
import Select from 'primevue/dropdown';
export default {
    data() {
        return {
            Accesos: 24,
            Miembros: 3,
            Dispositivos: 1,
            Incidentes: 3,

            homeSelected: null,
            homes: [
                { name: 'Bogotá' },
                { name: 'Medellín' },
                { name: 'Cali' },
            ],

            diaSelected: null,
            dias: [
                { name: '30 días' },
                { name: '20 días' },
                { name: '10 días' },
                { name: '7 días' },
                { name: '1 días' },
            ]
        }
    },
}
</script>