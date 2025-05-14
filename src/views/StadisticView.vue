<template>
    <div class="flex flex-col md:flex-row h-full min-h-screen bg-gray-100">
        <SidebarComponent class="w-full md:w-[15%]" />
        <main class="w-full lg:w-[85%] flex flex-col justify-center items-center gap-10 text-black">
            <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
                <StatisticFilter/>
                <InfoData :accesos="Accesos" :miembros="Miembros" :dispositivos="Dispositivos" :incidentes="Incidentes" />
                <div class="flex flex-col lg:flex-row justify-between gap-10 items-start">
                    <LineChart/>
                    <DonutChart/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Select from 'primevue/dropdown';
import InfoData from '../components/statistics/InfoData.vue';
import StatisticFilter from '../components/statistics/StatisticFilter.vue';
import DonutChart from '../components/statistics/DonutChart.vue';
import LineChart from '../components/statistics/LineChart.vue';

export default {
    components: {
        SidebarComponent,
        DonutChart,
        LineChart,
        InfoData,
        StatisticFilter
    },
    data() {
        return {
            Accesos:2,
            Miembros:20,
            Dispositivos:1,
            Incidentes:2
        }
    }
}
</script>

<style></style>