<template>
    <div class="flex h-screen">
        <SidebarComponent />
        <main class="w-[85%] bg-gray-100 overflow-y-scroll px-8 text-black">
            <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl mx-auto mt-8">
                <StatisticFilter />
                <InfoData :accesos="Accesos" :miembros="Miembros" :dispositivos="Dispositivos"
                    :incidentes="Incidentes" />
                <div class="flex flex-col lg:flex-row justify-between gap-10 items-start overflow-x-scroll lg:overflow-auto">
                    <LineChart />
                    <DonutChart />
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
            Accesos: 15,
            Miembros: 4,
            Dispositivos: 1,
            Incidentes: 0
        }
    }
}
</script>

<style></style>