<template>
    <div class="flex flex-wrap gap-6 justify-between">
        <div class="bg-white rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow border border-gray-300 w-40">
            <h3 class="text-4xl font-bold">{{ accesos }}</h3>
            <span class="text-gray-600">Accesos</span>
        </div>

        <div class="bg-white rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow border border-gray-300 w-40">
            <h3 class="text-4xl font-bold">{{ miembros }}</h3>
            <span class="text-gray-600">Miembros</span>
        </div>

        <div class="bg-white rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow border border-gray-300 w-40">
            <h3 class="text-4xl font-bold">{{ dispositivos }}</h3>
            <span class="text-gray-600">Dispositivos</span>
        </div>

        <div class="bg-white rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow border border-gray-300 w-40">
            <h3 class="text-4xl font-bold">{{ incidentes }}</h3>
            <span class="text-gray-600">Incidentes</span>
        </div>
    </div>

</template>


<script>
export default {
    props: {
        accesos: {
            type: Number,
            required: true
        },
        miembros: {
            type: Number,
            required: true
        },
        dispositivos: {
            type: Number,
            required: true
        },
        incidentes: {
            type: Number,
            required: true
        }
    }
}
</script>
