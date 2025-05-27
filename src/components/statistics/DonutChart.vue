<template>
    <div class="px-4 py-5 flex flex-col gap-4 bg-white shadow-2xl rounded-lg flex-1/2">
        <h2 class="text-lg font-semibold">Accesos por miembro</h2>
        <Chart type="doughnut" :data="chartData" :options="chartOptions2" class="md:max-w-[300px]" />
    </div>
</template>


<script>

import Chart from 'primevue/chart';
export default {
    components: {
        Chart
    },
    data() {
        return {
            chartData: null,
            chartOptions: null,
        }
    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: ['Fernando', 'Aquino', 'Alexis'],
                datasets: [
                    {
                        data: [70, 20, 10],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-blue-500') || '#3B82F6',
                            documentStyle.getPropertyValue('--p-lightgray-400') || '#BFDBFE',
                            documentStyle.getPropertyValue('--p-orange-500') || '#F97316'
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--p-blue-400') || '#60A5FA',
                            documentStyle.getPropertyValue('--p-lightgray-300') || '#93C5FD',
                            documentStyle.getPropertyValue('--p-orange-400') || '#FB923C'
                        ]
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color') || '#333333';

            return {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: textColor
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            };
        }
    }
}

</script>

<style lang="">

</style>