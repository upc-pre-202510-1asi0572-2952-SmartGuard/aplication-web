<template>
    <WrapperScreen>
        <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
            <StatisticFilter />
            <InfoData :accesos="Accesos" :miembros="Miembros" :dispositivos="Dispositivos" :incidentes="Incidentes" />
            <div class="flex flex-col lg:flex-row justify-between gap-4">
                <LineChart />
                <DonutChart />
            </div>
        </div>
    </WrapperScreen>
</template>

<script>
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Select from 'primevue/dropdown';
import InfoData from '../components/statistics/InfoData.vue';
import StatisticFilter from '../components/statistics/StatisticFilter.vue';
import DonutChart from '../components/statistics/DonutChart.vue';
import LineChart from '../components/statistics/LineChart.vue';
import WrapperScreen from '../components/WrapperScreen.vue';

export default {
    components: {
        SidebarComponent,
        DonutChart,
        LineChart,
        InfoData,
        StatisticFilter,
        WrapperScreen
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